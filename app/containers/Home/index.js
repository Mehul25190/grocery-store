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
import * as productActions from "../../actions/product";
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
      text: '',    
    };
    this.courseFilterArr = [];
    console.log('Math', Math.floor(100000 + Math.random() * 900000));
  }


  componentDidMount(){
    this.setState({
      entries:{},  
    });

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getOfferList(); 
    });
  
    //set array from category list from api to get category list
      this.getOfferList(); 
    this.props.getDeviveryAddress(this.props.user.user.id);
    this.getCategoryList();   
  }

  getOfferList(){
    this.props.fetchOffersOnLandingPage().then (res =>{
      // console.log(res);
      if(res.status == "success"){
        this.setState({entries: res.data.offerList})
        // console.log(res.data.offerList.length)
      }
    });
  }

  getCategoryList() {
    
    this.props.showCategoryList().then (res =>{
      
        if(res.status == "success"){
              this.setState({ categoryData:res.data.category });
              this.courseFilterArr = res.data.category;
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
       <View style={[index == 0 ? styles.ItemContainer : styles.ItemContainer, {backgroundColor:'#'+ Math.floor(100000 + Math.random() * 400000)+'30'}]}>
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
                       {item.offerName}
                   </Text>
                   <Text style={styles.addsBigTitle}>
                     {item.value}{item.valueType=='rs' ? <Text style={[appStyles.currency,{  color:'#F8BB1B',fontSize:32,}]}>{'\u20B9'}</Text> : item.valueType} OFF
                   </Text>
                   <Text numberOfLines={2} style={styles.addsText}>
                    {item.description}               
                   </Text>
                    <TouchableOpacity style={styles.btnBlock}>
                    
                      <Text style={styles.discountBtn}>Get Discount</Text>
                  
                  
                   </TouchableOpacity>
                 </View>
               </Col>
             <Col style={{ marginLef:2,width: 120,}}>
                <Image source={{uri: url.imageURL+item.offerImage}} style={{flex: 1, height: null, width: null,resizeMode:'contain'}} />
             </Col>
             
            </Grid>
        );
    }


  SearchFilterFunction(text) {
        //passing the inserted text in textinput
      const newData = this.courseFilterArr.filter(function (item) {
        const itemData = item.categoryName ? item.categoryName.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        categoryData: newData,
        text: text,
      });
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
             <Input style={appStyles.searchInput} onChangeText={text => this.SearchFilterFunction(text)} placeholder='Search Product'/>
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
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (<View>
            {this.state.entries ?
              <Card style={[appStyles.addBox,{height:'auto'}]}>
                 <Carousel
                    ref={(c) => { this._carousel = c; }}
                    loop={true}
                    autoplay={false}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={Layout.window.width}
                    itemWidth={Layout.window.width}
                    autoplayInterval={3000}
                    autoplayDelay={3000}
                  />
                </Card>
          : null }

          <View style={styles.ItemLayout}>
            <View style={styles.shopSubTitle}>
              <Text style={styles.shopSubTitleText}>Upcoming Orders</Text>
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
          </View> )}
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
    isLoading: state.common.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      showCategoryList: () => dispatch(userActions.showCategoryList()),
      getDeviveryAddress: (useId) => dispatch(userActions.getDeviveryAddress({userId: useId})),
      fetchOffersOnLandingPage: () => dispatch(productActions.fetchOffers()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);