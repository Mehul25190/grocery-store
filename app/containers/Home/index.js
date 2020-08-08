import React from 'react'
import { StyleSheet, View,TouchableHighlight,Image,FlatList,ScrollView, ImageBackground, 
  StatusBar,TouchableOpacity,RefreshControl} from 'react-native'
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
import { showToast } from '../../utils/common';
import url from '../../config/api';
import {ItemList,entries} from '../data/data';
import Modal from 'react-native-modal';
//import MasonryList from "react-native-masonry-list";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as productActions from "../../actions/product";
import * as subscriptionAction from "../../actions/subscription";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { array } from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import * as cartActions from "../../actions/cart";
import ActionTypes from "../../constants/ActionTypes";
const cartCount = 1;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      categoryData: [],  
      text: '',
      onRefreshLoading:false,    
    };
    this.courseFilterArr = [];
    console.log('Math', Math.floor(100000 + Math.random() * 900000));
   
    //this.props.resetState();
  }


  componentDidMount(){
    //check delivery address that user entered or not
    //check points
    this.getDeliveryAddress();  

    this.setState({
      //entries:{},  
    });

    //this.props.logout();

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getOfferList(); 
    });
  
    //set array from category list from api to get category list
    this.props.viewCart(this.props.user.user.id);
    //this.getOfferList(); 
    this.props.getDeviveryAddress(this.props.user.user.id);
    this.getCategoryList();  
     
  }

  //get Delivery address
  getDeliveryAddress(){

    //console.log(this.props.user);
    //alert(this.props.user.user.id);  
    this.props.showDeliveryAddress(this.props.user.user.id).then (res => {
      
      if(res.status == "success"){
        console.log(res.data.userAddressDtls);
            if(res.data.userAddressDtls ==null) {
              //console.log("inside");
              //redirect to address screen
              showToast("Please enter your delivery address so we serve better experience and products offer","danger");
              this.props.navigation.navigate('MyAddress');  
            }

        } else {
              //console.log("something wrong with varification call");
              showToast("Something wrong with Server response","danger");
        }

    })
    .catch(error => {
      console.log('Error messages returned from server', error);
      showToast("Error messages returned from server","danger");
    });

  }

  getOfferList(){
    this.setState({onRefreshLoading:true});
    this.props.fetchOffersOnLandingPage().then (res =>{
      // console.log(res);
      if(res.status == "success"){
        //this.setState({entries: res.data.offerList})
        // console.log(res.data.offerList.length)
      }
    });
    this.setState({onRefreshLoading:false});
  }

  //get pull to refressh 
  

  getCategoryList() {
   
    this.setState({onRefreshLoading:true});

    this.props.showCategoryList().then (res =>{
      
        if(res.status == "success"){
              //this.setState({ categoryData:res.data.category });
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
      this.setState({onRefreshLoading:false});  
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
                     {item.value}{item.valueType=='rs' ? <Text style={[appStyles.currency,{  color:'#F8BB1B',fontSize:32,}]}>{Colors.CUR}</Text> : item.valueType} OFF
                   </Text>
                   <Text numberOfLines={4} style={styles.addsText}>
                    {item.description}               
                   </Text>
                  </View>
               </Col>
             <Col style={{ marginLef:2,width: 120,}}>
                <Image source={{uri: url.imageURL+item.offerImage}} style={{flex: 1, height: null, width: null,resizeMode:'contain'}} />
             </Col>
             
            </Grid>
        );
    }


  SearchFilterFunction(text) {
    this.props.navigation.navigate('SearchProduct', {text: text});
        //passing the inserted text in textinput
      const newData = this.courseFilterArr.filter(function (item) {
        const itemData = item.categoryName ? item.categoryName.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        categoryData: newData,
        text: "",
      });
  }

  onDetailPage = () => {
    
    //get Order list & get first order ID
    this.props.getOrderList(this.props.user.user.id).then (res =>{
     
        if(res.status == "success"){
          this.para_orderId = res.data.orderList[0].id;
          if(res.data.orderList[0].id!="") {
            this.props.navigation.navigate('OrderDetail', { orderId:this.para_orderId });    
          }
        } else {
              console.log("something wrong with varification call");
              showToast("Something wrong with Server response","danger");
        }
         
      })
      .catch(error => {
          console.log('Error messages returned from server', error);
          showToast("Error messages returned from server","danger");
      });

  };
  
  refreshContent = () => {
    //alert("ADFA");
    this.getCategoryList;
    this.getOfferList;
  }

   openFreeDeliveryPopup(){
    
    this.setState({
       isModalVisible: !this.state.isModalVisible
     })
  }
  render(){
    //console.log("first render");
    //console.log(this.state.categoryData);
    //console.log("after render");
    const { totalItem } = this.props;
    return (
      <Container style={[appStyles.container,{ width: Layout.window.width, height: Layout.window.height}]}>
           <Header searchBar rounded style={appStyles.headerStyle}>
      
          <Left style={appStyles.headerLeft}>
            <Button transparent style={appStyles.menuBtn}  onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={appStyles.menuBar} size={30} color={Colors.primary} name="menu" />
            </Button>
          </Left>
       
          <Item style={[appStyles.searchBar]} >
            <Icon name="search" style={{color:Colors.primary}} />
             <Input style={appStyles.searchInput} value={this.state.text} onChangeText={text => 
                {
                    this.setState({text:text});
                setTimeout(() => { this.SearchFilterFunction(this.state.text) }, 2000)
                }
              } placeholder='Search Product'/>
          </Item>
         
          <Right style={appStyles.headerRight}>
             <Button transparent>
             <TouchableOpacity style={appStyles.cartIconArea} onPress={()=> totalItem > 0 ? this.props.navigation.navigate(Screens.MyCart.route) : ''}>
               <Icon style={appStyles.cartIcon} name="cart" />
               { totalItem >0 && (<Text style={appStyles.cartCount}>{totalItem}</Text>) }
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.Profile.route)}>
               <Icon style={appStyles.userIcon} name="user-circle"  type="FontAwesome" />      
              </TouchableOpacity> 
              
            </Button>
          </Right>
       
         
       </Header>
         
              <Modal 
              isVisible={this.state.isModalVisible}
              coverScreen={false}
              backdropColor={'#fff'}
              backdropOpacity={0.6}
              animationIn={'slideInDown'}
              style={{flex:1}}
              >
                  <View style={{backgroundColor:'#fff',padding:10,borderWidth:1, borderColor:Colors.gray, borderRadius:5}}>
                    <TouchableOpacity style={styles.closeIcon} onPress = {() => this.setState({isModalVisible:false}) }>
                      <Icon type="AntDesign" name="closecircleo" />
                    </TouchableOpacity>
                    <Text style = {[styles.Modeltext,{fontSize:16,alignSelf:'center'}]}>Valuable Customer..!</Text>
                    
                    <Icon type="SimpleLineIcons" name="emotsmile"  style={styles.smileIcon} />
                    <Text  style = {styles.Modeltext}>
                    Seems your free subscription period is over, 
                    Now have your morning deliveries free by paying a small subscription amount <Text style={appStyles.currency}>{Colors.CUR}</Text> 123.</Text>
                    <Text style={styles.Modeltext}>You can still enjoy our evening slots with nominal delviery charge</Text>
                    <TouchableOpacity style={styles.closeOk} onPress = {() => this.setState({isModalVisible:false}) }>
                    <Text style={{color:'#fff',fontSize:16,fontFamily:'Font-Medium'}}>OK</Text>
                    </TouchableOpacity>
                  
                  </View>
                  
              </Modal> 
          <Content enableOnAndroid style={appStyles.content} 
          
          refreshControl={
            <RefreshControl
            refreshing={this.state.onRefreshLoading}
            onRefresh={this.getCategoryList.bind(this)}
            progressBackgroundColor="#ffff00"
            />} >
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (<View>
            {this.props.offerData ?
              <Card style={[appStyles.addBox,{height:'auto'}]}>
                 <Carousel
                    ref={(c) => { this._carousel = c; }}
                    loop={true}
                    autoplay={false}
                    data={this.props.offerData}
                    renderItem={this._renderItem}
                    sliderWidth={Layout.window.width}
                    itemWidth={Layout.window.width}
                    autoplayInterval={3000}
                    autoplayDelay={3000}
                  />
                </Card>
          : null }

        <View style={styles.ItemLayout}>
            <Grid style={styles.shopSubTitle}>
              <TouchableOpacity style={styles.prodInfo} onPress={() => this.onDetailPage()}>
                <Text style={styles.shopSubTitleText}>My Next Order</Text>
              </TouchableOpacity>  
              <View style={{flex:1,paddingLeft:10, flexDirection:'row', justifyContent:'flex-end'}}>
                  <Text style={styles.pendingDays}>Your free delivery offer ends in 20 days..!</Text>
                  <TouchableOpacity style={{textAlign:'right'}}  onPress={()=>{ this.openFreeDeliveryPopup() }} >
                  <Icon type="AntDesign" name="exclamationcircle" style={styles.infoCircle} />
              </TouchableOpacity>
              </View>
               
            </Grid>
           { <FlatList 
                     vertical
                     showsVerticalScrollIndicator={false}
                     numColumns={2}
                     data={this.props.categoryData}
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
    totalItem: state.cart.totalItem,
    categoryData:state.common.categoryData,
    offerData:state.common.categoryOfferData,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      showCategoryList: () => dispatch(userActions.showCategoryList()),
      getDeviveryAddress: (useId) => dispatch(userActions.getDeviveryAddress({userId: useId})),
      fetchOffersOnLandingPage: () => dispatch(productActions.fetchOffers()),
      viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
      getOrderList: (useId) => dispatch(userActions.getUserOrderList({userId: useId})),
      resetState: () => dispatch({ type: ActionTypes.RESETSTATE }),
      showDeliveryAddress: (userid) => dispatch(userActions.getDeviveryAddress({userId:userid})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);