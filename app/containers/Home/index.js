import React from 'react'
import { StyleSheet, View,TouchableHighlight,Image,FlatList,ScrollView, ImageBackground, StatusBar,TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import { Layout, Colors, Screens } from '../../constants';
import { Logo, Svgicon, Headers, Catalog, List } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header,Item, Left,Input, Body, Title, Right,Grid,Col,Card, Thumbnail

} from 'native-base';
import url from '../../config/api';
import {ItemList,entries} from '../data/data';
//import MasonryList from "react-native-masonry-list";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as subscriptionAction from "../../actions/subscription";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { array } from 'prop-types';
import Carousel from 'react-native-snap-carousel';

const cartCount = 1;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],     
      entries:'' 
    };
  }


  componentDidMount(){
    this.setState({
      entries:entries,  
    });
    console.log("WIDTH="+Layout.window.width);
    //set array from category list from api to get category list
    this.props.getDeviveryAddress(this.props.user.userId);
    this.getCategoryList();    
  }

  getCategoryList() {
    
    this.props.showCategoryList().then (res =>{
      
        if(res.status == "success"){
              this.setState({ categoryData:res.data.category });
        } else {
              console.log("something wrong with varification call");
              showToast("Something wrong with Server response","danger");
        }
         
      })
      .catch(error => {
          console.log('Error messages returned from server', error);
          showToast("Error messages returned from server","danger");
      });
  }

  onPressRecipe = item => {
    //alert(item.id);
    //alert(item.categoryName);
    this.props.navigation.navigate('ProductList', { para_categoryId:item.id, categoryName: item.categoryName});
  };

   renderItems = ({ item, index}) => (
    
    <TouchableOpacity onPress={() => this.onPressRecipe(item)}>
       <View style={index == 0 ? styles.ItemContainer : styles.ItemContainer}>
        <Image style={styles.photo} source={{uri: url.imageURL+item.imagePath} } />
        <Text style={styles.productTitle}>{item.categoryName}</Text>
       
      </View>
    </TouchableOpacity>
  );
   openControlPanel = () => {
      this.props.navigation.openDrawer(); // open drawer
    };
    _renderItem = ({item, index}) => {
        return (
          
           <Grid style={styles.slide}>
           <Col style={{}}>
               <View style={styles.discountBlock}>
                 <Text style={styles.addsSubTitle}>
                     {item.small_title}
                 </Text>
                 <Text style={styles.addsBigTitle}>
                   {item.big_title}
                 </Text>
                 <Text style={styles.addsText}>
                {item.add_text}               
                 </Text>
                 <View style={styles.btnBlock}>
                  <Button transparent tyle={{textAlign:'Left'}}>
                   <TouchableOpacity>
                    <Text style={styles.discountBtn}>{item.button_text}</Text>
                    </TouchableOpacity>
                   </Button>
                 </View>
               </View>
             </Col>
             <Col style={{ marginLef:2,width: 120,}}>
                <Image source={item.image} style={{flex: 1, height: null, width: null,resizeMode:'contain'}} />
             </Col>
             
            </Grid>
        );
    }
  render(){
    //console.log("first render");
    //console.log(this.state.categoryData);
    //console.log("after render");
    return (
      <Container style={[appStyles.container,{ width: Layout.window.width, height: Layout.window.height}]}>
           <Header searchBar rounded style={appStyles.headerStyle}>
      
          <Left style={appStyles.headerLeft}>
            <Button transparent style={appStyles.menuBtn}  onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={appStyles.menuBar} size={30} color={Colors.white} name="menu" />
            </Button>
          </Left>
       
          <Item style={[appStyles.searchBar]} >
            <Icon name="search" style={{color:Colors.primary}} />
             <Input style={appStyles.searchInput} placeholder='Search Product'/>
          </Item>
         
          <Right style={appStyles.headerRight}>
             <Button transparent>
             <TouchableOpacity style={appStyles.cartIconArea} onPress={()=>this.props.navigation.navigate(Screens.MyCart.route)}>
               <Icon style={appStyles.cartIcon} name="cart" />
               { cartCount >0 && (<Text style={appStyles.cartCount}>{cartCount}</Text>) }
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.Profile.route)}>
               <Icon style={appStyles.userIcon} name="user-circle"  type="FontAwesome" />      
              </TouchableOpacity> 
              
            </Button>
          </Right>
       
         
       </Header>
         
            
          <Content enableOnAndroid style={appStyles.content}>
        <Card style={[appStyles.addBox,{height:'auto'}]}>
           <Carousel
              ref={(c) => { this._carousel = c; }}
              loop={true}
              autoplay={true}

              data={entries}
              renderItem={this._renderItem}
              sliderWidth={Layout.window.width}
              itemWidth={Layout.window.width}
              autoplayInterval={3000}
              autoplayDelay={3000}
            />
          </Card>
          

          <View style={styles.ItemLayout}>
            <View style={styles.shopSubTitle}>
              <Text style={styles.shopSubTitleText}>Shop by Categories</Text>
            </View>
           { <FlatList 
                     vertical
                     showsVerticalScrollIndicator={false}
                     numColumns={2}
                     data={this.state.categoryData}
                     renderItem={this.renderItems}
                     keyExtractor={item => `${item.id}`}
                   />
                 }

                   <View>
                    {
                    
                     // ItemList.map((item, index) => {
                     //    return (
                     //     <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
                     //       <View style={index == 0 ? styles.FirstItem : styles.ItemContainer}>
                     //        <Image style={styles.photo} source={ item.photo_url } />
                     //        <Text style={styles.productTitle}>{item.title}</Text>
                     //      </View>
                     //    </TouchableHighlight>
                     //    );
                     //  })
                    }

                   </View>
                   
          </View>
            {/* <MasonryList sorted onPressImage={this.onPressImage} images={data}  />*/}

          </Content>

       
         { /*<Catalog {...this.props} />*/}
      </Container>
    
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      showCategoryList: () => dispatch(userActions.showCategoryList()),
      getDeviveryAddress: (useId) => dispatch(userActions.getDeviveryAddress({userId: useId})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);