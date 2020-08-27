import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, ScrollView} from 'react-native'
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers, } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,DatePicker,Label, Picker
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as cartActions from "../../actions/cart";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList,productImages} from '../data/data';
import * as productActions from "../../actions/product";
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box';
import { AirbnbRating } from 'react-native-ratings';
import Carousel,{Pagination } from 'react-native-snap-carousel';
import { showToast } from '../../utils/common';

import url from '../../config/api';


const Qty =[
  {
    key:1,
    qty:'1'
  },
  {
    key:2,
    qty:'2'
  },
  {
    key:3,
    qty:'3'
  }
];
class ProductDetail extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
      time: '',
      selected: "1",
       selectedIndex: 0,
       productImages:''
    };
    
  }
   onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

   componentDidMount() {
    this.setState({
      productImages:this.props.ProductDetail.itemImages,
    });
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({
        productImages:this.props.ProductDetail.itemImages,
      });
    });
   
  }

  productDetail(id){
    this.props.productDetail(id, this.props.user.user.id);
  }

  buyOncePressHnadler(productId, value){
  
    if(value == 0){ 
      this.props.deleteCartItem(productId, this.props.user.user.id).then(res => {
        if(res.status == "success"){
          this.props.viewCart(this.props.user.user.id).then(res => {
              showToast('Cart updated successfully.', "success")
          }) 
        }
        
      })
    }else if(value == 1){
      this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
        if(res.status == "success"){
          this.props.viewCart(this.props.user.user.id).then(res => {
            console.log('dddd', res);
              showToast('Cart updated successfully.', "success")
          }) 
        }
      })
    }else if(value > 1){
      this.props.updateCartItem(this.props.user.user.id, productId, value).then(res => {
        if(res.status == "success"){
          this.props.viewCart(this.props.user.user.id).then(res => {
              showToast('Cart updated successfully.', "success")
          }) 
        }
      })
    }


    this.productDetail(productId, this.props.user.user.id);
      //this.setState({value: value})
    }

  addToCart(productId, value){
    if(this.state.selected == 0){
      showToast('Please select quantity', "danger")
      return;
    }
    this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
      console.log(res);
      if(res.status == "success"){
        this.props.viewCart(this.props.user.user.id);
        showToast('Product added successfully.', "success")
        this.props.navigation.navigate(Screens.MyCart.route)
      }
    })
    
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  openControlPanel = () => {

    this.props.navigation.goBack(); // open drawer
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };   
  _renderItem = ({item, index}) => {
    //console.log('item', item)
        return (
           <View>
            <Image source={{ uri: url.imageURL + item.imagePath }} style={styles.amulMoti} />
          </View>
          
        );
    }
     get pagination () {
        const { productImages, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={productImages.length}
              activeDotIndex={activeSlide}
              containerStyle={{paddingTop:10,paddingBottom:0}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: Colors.primary
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

  render(){

    const { entries, activeSlide } = this.state;
   // const { navigation } = this.props;

    const { navigation, ProductDetail } = this.props;
    console.log('ProductDetail', ProductDetail);
    const { selectedIndex } = this.state;
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              setCart={true}
              bgColor='transparent'
              Title='Product Detail'
              IconRightF="search"
             />
      
          <Content enableOnAndroid>
       
        
          <Grid style={styles.paddingBox}>

            <Row style={styles.firstRow}>
              <Col >
                <View>
                 <Text style={styles.AmuText}>{ProductDetail.item[0].brandName}</Text>
                 <Text style={[styles.AmuText,styles.AmuTextTitle]}>{ProductDetail.item[0].itemName}</Text>
                 <Text style={styles.AmuText}>{ProductDetail.item[0].weight} {ProductDetail.item[0].uom}</Text>
                
                </View>
              </Col>
              <Col style={styles.QtyBox}>
                <View>
                   <AirbnbRating
                      count={5}
                      reviews={[]}
                      isDisabled={true}
                      defaultRating={ProductDetail.item[0].rating}
                      size={15}
                      showRating={false}
                      style={{pointerEvents:'none'}}
                      starContainerStyle={{alignSelf:'flex-start',pointerEvents:'none'}}
                      selectedColor="#FFC106"

                      />
                </View> 
              </Col>

             </Row>

            <Row style={styles.secondRow}>

            <Col style={{justyfyContent:'center',alignItems:'center',marginLeft:Layout.indent,marginRight:Layout.indent}}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              loop={true}
              autoplay={true}
              data={ProductDetail.itemImages}
              renderItem={this._renderItem}
              sliderWidth={Layout.window.width}
              itemWidth={Layout.window.width}
              autoplayInterval={3000}
              autoplayDelay={3000}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            { this.pagination }
             </Col>   
              

               {/* <Image source={{uri: url.imageURL+ProductDetail.itemImages[0].imagePath}} style={styles.amulMoti} />*/}

            </Row>

            
          </Grid>

         
        
    
       

        <Grid>
         <Row>
         <Col style={{flex:0}}>

          <View style={styles.pricePart}>

          <View style={{ backgroundColor:'#00ff00', height:15, width:15, borderRadius:10, marginLeft: 8,}}></View>
          <Text style={styles.priceText}><Text style={appStyles.currency,{fontSize:23,color:Colors.gray}}> {Colors.CUR}</Text> {ProductDetail.item[0].discountedPrice ? ProductDetail.item[0].discountedPrice : ProductDetail.item[0].price}</Text>
        </View>
         </Col>
            <Col style={{paddingTop:10, width:200, alignItems:'flex-end'}}>
               <View  style={styles.reasonView}>
                {ProductDetail.item[0].cartQty > 0 ?
                  (<NumericInput
                    initValue={ProductDetail.item[0].cartQty}
                    //value={this.state.buyOndeSelected.indexOf(item.id) != -1 ? 1 : null }
                    onChange={(value) => this.buyOncePressHnadler(ProductDetail.item[0].id, value)}
                    onLimitReached={(isMax, msg) =>
                      console.log(isMax, msg)
                    }
                    minValue={0}
                    maxValue={ProductDetail.item[0].maxOrderQuantity ? ProductDetail.item[0].maxOrderQuantity : 5}
                    totalWidth={120}
                    totalHeight={35}
                    iconSize={30}
                    borderColor={Colors.primary}
                    inputStyle={{ fontSize: 15 }}
                    step={1}
                    valueType="real"
                    rounded
                    textColor={Colors.primary}
                    iconStyle={{ color: Colors.primary, fontSize: 20 }}
                    rightButtonBackgroundColor="#fff"
                    leftButtonBackgroundColor="#fff"
                  />) : 
                  (
                  <TouchableOpacity
                    onPress={() =>
                      this.buyOncePressHnadler(ProductDetail.item[0].id, 1)
                    }
                  >
                    <Image source={imgs.addPlus} style={styles.buyButton} />
                  </TouchableOpacity>
                )}
              </View>
            </Col>
          <Col style={styles.cartPart}>
          {/*  <Icon name='shopping-cart' type='MaterialIcons' style={styles.bottomCart} /> */}
          </Col>
         </Row>
         
        </Grid>
        
     {
      ProductDetail.item[0].description1!=null && (
        <View>
        <View>
          <Text style={styles.title}>Product Description </Text>
        </View>

        <Card style={[appStyles.addBox,styles.deliveryAddress,{elevation:1}]}>
          <View>
            <Text style={{fontFamily:'Font-Regular',color:Colors.gray,fontSize:14}}>
              {ProductDetail.item[0].description1}
             </Text>
           </View>
        </Card>
    </View>
        )}  
    
        {/*<TouchableOpacity>     
          <Button style={styles.payBtn} primary full onPress={()=> this.addToCart(ProductDetail.item[0].id, this.state.selected)}>
            <Text style={styles.payTextNow}>Add to cart</Text>
          </Button>
        </TouchableOpacity>*/}

        <View style={styles.okayBtnArea}>
          <Button priamary full style={styles.doneBtn} onPress={()=> this.props.navigation.navigate(Screens.Home.route)}>
             <Text style={styles.btnTextDone}>Continue Shopping</Text>
          </Button>
        </View>
           
        </Content>
      
    </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    ProductDetail: state.product.productDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
      addToCartItem: (userId, itemId, quantity) => dispatch(cartActions.addToCartItem({ userId:userId, itemId:itemId, quantity:quantity  })),
      updateCartItem: (userId, itemId, quantity) => dispatch(cartActions.updateCartItem({ userId:userId, itemId:itemId, quantity:quantity  })),
      deleteCartItem: (itemId, userId) => dispatch(cartActions.deleteCartItem({ itemId: itemId, userId:userId })),
      productDetail: (id, userId) => 
      dispatch(productActions.productDetail({ itemId: id, userId: userId })),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);