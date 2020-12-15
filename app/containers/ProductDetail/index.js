import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import _ from 'lodash';
import { Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers, } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text, Tabs, Tab,
  Header, Left, Body, Title, Right, Card, Grid, Col, Row, ListItem, Item, Input, DatePicker, Label, Picker
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as cartActions from "../../actions/cart";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { productList, productImages, SimilarProductDetail } from '../data/data';
import * as productActions from "../../actions/product";
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box';
import { AirbnbRating } from 'react-native-ratings';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImageModal from 'react-native-image-modal';
import { showToast } from '../../utils/common';
import { ProductVariant } from '../data/data';
import url from '../../config/api';


const Qty = [
  {
    key: 1,
    qty: '1'
  },
  {
    key: 2,
    qty: '2'
  },
  {
    key: 3,
    qty: '3'
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
      productImages: '',
      selctedProduct: '',
      variant: '',
      wished: this.props.ProductDetail.item[0].wishListExists == "1" ? true : false,
      likeloder:false,
      isLoading: false,
      load:true,
    };
    setTimeout(() => {
      this.setState({load:false})
    }, 7000);
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  componentDidMount() {
    this.setState({
      productImages: this.props.ProductDetail.itemImages,
    });
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.productDetail(this.props.ProductDetail.item[0].id);
      this.props.similarproduct(this.props.ProductDetail.item[0].subCategoryId)
      this.setState({
        productImages: this.props.ProductDetail.itemImages,
      });
     
    });

  }

  productDetail(id) {
    console.log("HEERE IS PRODUCT ID",id)
    this.props.productDetail(id, this.props.user.user.id).then(res => {
      // this.setState({ selctedProduct: '' })
      this.component._root.scrollToPosition(0, 0)
       this.setState({
      wished: this.props.ProductDetail.item[0].wishListExists == 1 ? true : false
    })
      console.log("RES",res)
    })

  }

  variantProductDetail(id) {
    this.setState({isLoading: true});
    this.props.productDetail(id, this.props.user.user.id).then(res => {
      this.setState({ selctedProduct: '', isLoading: false })
    })

  }

  buyOncePressHnadler(productId, value, action) {
    this.setState({ selctedProduct: productId })
    if (value == 0) {
      this.props.deleteCartItem(productId, this.props.user.user.id).then(res => {
        if (res.status == "success") {
          this.props.viewCart(this.props.user.user.id).then(res => {
            //showToast('Cart updated successfully.', "success")
            this.productDetail(productId, this.props.user.user.id);
          })
        }

      })
    } else if (value == 1 && action == 'add') {
      this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
        if (res.status == "success") {
          this.props.viewCart(this.props.user.user.id).then(res => {
            //console.log('dddd', res);
            //showToast('Cart updated successfully.', "success")
            this.productDetail(productId, this.props.user.user.id);
          })
        }
      })
    } else if (value >= 1) {
      this.props.updateCartItem(this.props.user.user.id, productId, value).then(res => {
        if (res.status == "success") {
          this.props.viewCart(this.props.user.user.id).then(res => {
            //showToast('Cart updated successfully.', "success")
            this.productDetail(productId, this.props.user.user.id);
          })
        }
      })
    }
    //this.setState({value: value})
  }

  addToCart(productId, value) {
    if (this.state.selected == 0) {
      showToast('Please select quantity', "danger")
      return;
    }
    this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
      //console.log(res);
      if (res.status == "success") {
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
  _similarItem = ({ item, index }) => {
    //console.log('item', item)
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddding: 10 }}>
        <TouchableOpacity onPress={() => this.productDetail(item.id)}>
          <Image style={styles.similarImges} source={{ uri: url.imageURL + item.imagePath }} />
          <View style={{paddingLeft:5, paddingRight:5}}>
          <Text style={styles.similarTitle}>{item.itemName}</Text>
           <Text>
            <Text style={appStyles.currencysmall}> {Colors.CUR} </Text>{" "}<Text style={appStyles.amountmedium}>{item.price}</Text>
           </Text>
          </View>
        </TouchableOpacity>


      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <ImageModal resizeMode="contain" source={{ uri: url.imageURL + item.imagePath }} style={styles.amulMoti} />
      </View>
    );
  }
  get pagination() {
    const { productImages, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={productImages.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingTop: 10, paddingBottom: 0 }}
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

  addtowishlist(itemid, userid) {
    {
      this.setState({
        likeloder: true
      });
      !this.state.wished ?
        this.props
          .addtowishlist(itemid, userid)
          .then((res) => {
            //console.log("Add to wishlist here", res.status)
            if (res.status == "success") {
              this.setState({ wished: true, likeloder: false })
            } else {
              this.setState({
                likeloder: false
              })
              showToast("Something wrong with Server response ", "danger");
            }
          })
          .catch((error) => {
            this.setState({ likeloder: false })
            showToast("Error messages returned from server", "danger");
          }) :
         // console.log("Call removed")
        this.props
          .removewishlist(this.props.ProductDetail.item[0].wishListId)
          .then((res) => {
            //console.log("SERVER RES LIKE", error)
            if (res.status == "success") {
              this.setState({ wished: false, likeloder: false })
            } else {
              this.setState({ likeloder: false })
              showToast("Something wrong with Server response ", "danger");
            }
          })
          .catch((error) => {
            //console.log("SERVER ERROR LIKE 1", error)
            this.setState({ likeloder: false })
            showToast(error, "danger");
          });
    }


  }

  render() {

    const { entries, activeSlide } = this.state;
    // const { navigation } = this.props;

    const { navigation, ProductDetail,similarproducts } = this.props;
    const { selectedIndex } = this.state;
    const ProductVariant = ProductDetail.item[0].variations;

    //console.log("PRODUCT",ProductDetail.item[0].wishListId)

    var foodType = '';
    if (ProductDetail.item[0].foodType == 'veg')
      foodType = '#00ff00';
    if (ProductDetail.item[0].foodType == 'Nonveg')
      foodType = 'red';
    if (ProductDetail.item[0].foodType == 'vegan')
      foodType = 'blue';

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
      <Content enableOnAndroid ref={c => (this.component = c)} >
        {this.state.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
        ) : (
          <View>

          <Grid style={styles.paddingBox}>
            <Row style={styles.firstRow}>
              <Col >
                <View>

                  <View style={styles.brandAndVeg}>
                    <View style={{ flex: 0, marginRight: 10 }}>
                      <Text style={styles.AmuText}>{ProductDetail.item[0].brandName}</Text>
                      
                    </View>
                    <View style={{ flex: 0, width: 12 }}>
                      <Image style={{ width: 12, height: 12 }} source={ProductDetail.item[0].foodType == 'veg' ? imgs.smallVeg : imgs.smallNonVeg} />
                    </View>
                  </View>

                  <Text style={[styles.AmuText, styles.AmuTextTitle]}>{ProductDetail.item[0].itemName}</Text>
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
                    style={{ pointerEvents: 'none' }}
                    starContainerStyle={{ alignSelf: 'flex-start', pointerEvents: 'none' }}
                    selectedColor="#FFC106"

                  />
                </View>
              </Col>

            </Row>

            <Row style={styles.secondRow}>

              <Col style={{ justyfyContent: 'center', alignItems: 'center', marginLeft: Layout.indent, marginRight: Layout.indent }}>
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
                  onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {this.pagination}
              </Col>


              {/* <Image source={{uri: url.imageURL+ProductDetail.itemImages[0].imagePath}} style={styles.amulMoti} />*/}

            </Row>


          </Grid>






          <Grid>
            <Row>
              <Col style={{ flex: 0, marginLeft: 20, width: 50 }}>

                <TouchableOpacity
                  onPress={() => this.addtowishlist(ProductDetail.item[0].id, this.props.user.user.id,)}
                  style={styles.heartoSection}  >

                  {
                   this.state.likeloder ?
                   <ActivityIndicator /> :
                  this.state.wished ?
                   
                      (<Icon name='heart' type='AntDesign' style={styles.hearto} />) :
                    (<Icon name='hearto' type='AntDesign' style={styles.hearto} />)
                  }
                </TouchableOpacity>
                
              </Col>

            </Row>
            <Row>
              <Col style={{ flex: 0, width: '40%', marginLeft: 10 }}>
                <View style={styles.pricePart}>
                  <Text style={styles.priceText}>
                    <Text style={appStyles.currencyverybig}>
                    {Colors.CUR}
                  </Text>
                  <Text style={appStyles.amountverybig}> {ProductDetail.item[0].discountedPrice ? ProductDetail.item[0].discountedPrice : ProductDetail.item[0].price}
                    </Text></Text>
                </View>
              </Col>

              {ProductDetail.item[0].outOfStock == 'Y' ?
                (<Col style={{ paddingTop: 10, width: '50%', alignItems: 'flex-end', }}><Text style={styles.outofstock}>Out of Stock</Text></Col>) :
                (<Col style={{ paddingTop: 10, width: '50%', alignItems: 'flex-end', }}>
                  {this.state.selctedProduct == ProductDetail.item[0].id ? <ActivityIndicator style={{ marginRight: 20 }} /> :
                    (<View style={styles.reasonView}>
                      {ProductDetail.item[0].cartQty > 0 ?
                        (<NumericInput
                          initValue={ProductDetail.item[0].cartQty}
                          //value={this.state.buyOndeSelected.indexOf(item.id) != -1 ? 1 : null }
                          onChange={(value) => this.buyOncePressHnadler(ProductDetail.item[0].id, value, 'update')}
                          onLimitReached={(isMax, msg) =>
                            console.log(isMax, msg)
                          }
                          minValue={0}
                          maxValue={ProductDetail.item[0].maxOrderQuantity ? ProductDetail.item[0].maxOrderQuantity : 5}
                          totalWidth={130}
                          totalHeight={40}
                          iconSize={35}
                          borderColor={Colors.primary}
                          inputStyle={{ fontSize: 16 }}
                          step={1}
                          valueType="real"
                          rounded
                          textColor={Colors.primary}
                          iconStyle={{ color: Colors.primary, fontSize: 25 }}
                          rightButtonBackgroundColor="#fff"
                          leftButtonBackgroundColor="#fff"
                        />) :
                        (
                          <TouchableOpacity
                            onPress={() =>
                              this.buyOncePressHnadler(ProductDetail.item[0].id, 1, 'add')
                            }
                          >
                            <Image source={imgs.addPlus} style={styles.buyButton} />
                          </TouchableOpacity>
                        )}
                    </View>)}
                </Col>)}
              <Col style={styles.cartPart}>
                {/*  <Icon name='shopping-cart' type='MaterialIcons' style={styles.bottomCart} /> */}
              </Col>
            </Row>

          </Grid>
          <Grid>
            <Row style={{ flex: 1, marginLeft: Layout.indent, marginRight: 15, flexDirection: 'row' }}>

              {ProductVariant.map((data, key) => {
                return (<View key={key}>

                    {/*<Col style={[styles.variantBtnActive, {}]}>
                      <Text style={styles.variantTextActive}>{data.weight} {data.uom}</Text>
                    </Col>*/}
                    {data.id != ProductDetail.item[0].id ?
                    <Col onPress={() =>  this.variantProductDetail(data.id) } style={[styles.variantBtnDeactive, {}]}>
                      {/*<Icon style={styles.variantImg} name='rectangle-outline' type='MaterialCommunityIcons' />*/}
                      <Text style={styles.variantTextDeactive}>{data.weight} {data.uom}</Text>
                    </Col>
                    : null}
                </View>
                )
              })}
            </Row>
          </Grid>
          {
            ProductDetail.item[0].description1 != null && (
              <View style={{ marginTop: 15 }}>

                <Tabs>
                  <Tab heading="Product Details" tabStyle={{ backgroundColor: '#D7ECDD' }} textStyle={{ color: '#00545F' }} activeTextStyle={{ color: '#00545F', fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: '#D7ECDD' }}>
                    <Card style={[appStyles.addBox, styles.deliveryAddress, { elevation: 1, marginTop: 20 }]}>
                      <View>
                        <Text style={{ fontFamily: 'Font-Regular', color: Colors.gray, fontSize: 14 }}>
                          {ProductDetail.item[0].description1}
                        </Text>
                      </View>
                    </Card>
                  </Tab>
                  <Tab heading="Additional Info" tabStyle={{ backgroundColor: '#D7ECDD' }} textStyle={{ color: '#00545F' }} activeTextStyle={{ color: '#00545F', fontWeight: 'bold' }} activeTabStyle={{ backgroundColor: '#D7ECDD' }}>
                    <Card style={[appStyles.addBox, styles.deliveryAddress, { elevation: 1, marginTop: 20 }]}>
                      <View>
                        <Text style={{ fontFamily: 'Font-Regular', color: Colors.gray, fontSize: 14 }}>
                          {ProductDetail.item[0].description2}
                        </Text>
                      </View>
                    </Card>
                  </Tab>
                </Tabs>


              </View>
            )}

          {/* {
            ProductDetail.item[0].description2 != "" && (
              <View>
                <View>
                  <Text style={styles.title}>Additional information </Text>
                </View>

                <Card style={[appStyles.addBox, styles.deliveryAddress, { elevation: 1 }]}>
                  <View>
                    <Text style={{ fontFamily: 'Font-Regular', color: Colors.gray, fontSize: 14 }}>
                      {ProductDetail.item[0].description2}
                    </Text>
                  </View>
                </Card>
              </View>
            )} */}
          {
            ProductDetail.item[0].description3 != "" && (
              <View>
                <View>
                  <Text style={styles.title}></Text>
                </View>

                <Card style={[appStyles.addBox, styles.deliveryAddress, { elevation: 1 }]}>
                  <View>
                    <Text style={{ fontFamily: 'Font-Regular', color: Colors.gray, fontSize: 14 }}>
                      {ProductDetail.item[0].description3}
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
          <View>
            <Text style={styles.title}>Similar Products  </Text>
          </View>


          <Row style={styles.secondRow}>
          
          {
            this.state.load ? <ActivityIndicator/> :  
            <Col style={{ justyfyContent: 'center', alignItems: 'center', marginLeft: Layout.indent, marginRight: Layout.indent }}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              loop={true}
              autoplay={true}
              data={similarproducts}
              renderItem={this._similarItem}
              sliderWidth={Layout.window.width}
              itemWidth={120}
              autoplayInterval={2000}
              autoplayDelay={2000}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
              slideStyle={{ paddding: 0, margin: 0, borderWidth: 0, borderColor: 0 }}
              contentContainerCustomStyle={{ paddding: 0, margin: 0, borderWidth: 0 }}

            />
            {this.pagination}
          </Col>
          }
           


            {/* <Image source={{uri: url.imageURL+ProductDetail.itemImages[0].imagePath}} style={styles.amulMoti} />*/}

          </Row>
          <View>
            <Button priamary full style={[styles.doneBtn, { marginBottom: 20 }]} onPress={() => this.props.navigation.navigate(Screens.Home.route)}>
              <Text style={styles.btnTextDone}>Continue Shopping</Text>
            </Button>
          </View>
          </View>)}
        </Content>
        
      </Container>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    //isLoading: state.common.isLoading,
    user: state.auth.user,
    ProductDetail: state.product.productDetail,
    similarproducts:state.product.similarproduct
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
    addToCartItem: (userId, itemId, quantity) => dispatch(cartActions.addToCartItem({ userId: userId, itemId: itemId, quantity: quantity })),
    updateCartItem: (userId, itemId, quantity) => dispatch(cartActions.updateCartItem({ userId: userId, itemId: itemId, quantity: quantity })),
    deleteCartItem: (itemId, userId) => dispatch(cartActions.deleteCartItem({ itemId: itemId, userId: userId })),
    productDetail: (id, userId) =>
      dispatch(productActions.productDetail({ itemId: id, userId: userId })),

    similarproduct: (id) =>
      dispatch(productActions.similarproduct({ subCategoryId: id, })),

    addtowishlist: (itemid, userId) =>
      dispatch(productActions.addtowishlist({ userId: userId, itemId: itemid })),

      removewishlist: (itemid) =>
      dispatch(productActions.deltowishlist({id: itemid })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);