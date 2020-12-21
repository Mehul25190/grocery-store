import React from 'react'
import {
  StyleSheet, View, TouchableHighlight, Image, FlatList, ScrollView, ImageBackground,
  StatusBar, TouchableOpacity, RefreshControl
} from 'react-native'
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
  Text, Row, Header, Item, Left, Input, Body, Title, Right, Grid, Col, Card, Thumbnail

} from 'native-base';
import { showToast } from '../../utils/common';
import url from '../../config/api';
import { ItemList, entries } from '../data/data';
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
import { Mybrands } from './Data.js';
import moment from "moment";
import { Alert } from 'react-native';
const cartCount = 1;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      categoryData: [],
      text: '',
      onRefreshLoading: false,
      nextOrderCount: 0,
    };
    this.courseFilterArr = [];
    console.log('Math', Math.floor(100000 + Math.random() * 900000));

    //this.props.resetState();
  }


  componentDidMount() {
    //check delivery address that user entered or not
    //check points
    this.getDeliveryAddress();
    this.props.Brand();
    this.props.Ethnicities();
    this.setState({
      //entries:{},  
    });

    //this.props.logout();

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.props.viewCart(this.props.user.user.id);
      this.getOfferList();
      this.getNextOrderCount(this.props.user.user.id);

    });

    //set array from category list from api to get category list
    //this.props.viewCart(this.props.user.user.id);
    //this.getOfferList(); 
    //this.getNextOrderCount(this.props.user.user.id);
    this.props.getDeviveryAddress(this.props.user.user.id);
    this.getCategoryList();

  }

  //get Next order count
  getNextOrderCount() {
    //console.log(">>>>>>>>>>>");

    this.props.nextOrderCount(this.props.user.user.id).then(res => {
      console.log(res);

      if (res.status == "success") {
        this.setState({ nextOrderCount: res.data.itemCount });

      } else {
        //console.log("something wrong with varification call");
        showToast("Something wrong with Server response", "danger");
      }

    })
      .catch(error => {
        console.log('Error messages returned from server', error);
        showToast("Error messages returned (Next Order) from server" + error, "danger");
      });

  }

  //get Delivery address
  getDeliveryAddress() {

    //console.log(this.props.user);
    //alert(this.props.user.user.id);  
    this.props.showDeliveryAddress(this.props.user.user.id).then(res => {

      if (res.status == "success") {
        //console.log(res.data.userAddressDtls);
        if (res.data.userAddressDtls == null) {
          //console.log("inside");
          //redirect to address screen
          showToast("Please enter your delivery address so we serve better experience and products offer", "danger");
          this.props.navigation.navigate('MyAddress');
        }

      } else {
        //console.log("something wrong with varification call");
        showToast("Something wrong with Server response", "danger");
      }

    })
      .catch(error => {
        //console.log('Error messages returned from server', error);
        showToast("Error messages returned from server", "danger");
      });

  }

  getOfferList() {
    this.setState({ onRefreshLoading: true });
    this.props.fetchOffersOnLandingPage().then(res => {
      // console.log(res);
      if (res.status == "success") {
        //this.setState({entries: res.data.offerList})
        // console.log(res.data.offerList.length)
      }
    });
    this.setState({ onRefreshLoading: false });
  }

  //get pull to refressh 


  getCategoryList() {

    this.setState({ onRefreshLoading: true });

    this.props.showCategoryList().then(res => {

      if (res.status == "success") {
        //this.setState({ categoryData:res.data.category });
        this.courseFilterArr = res.data.category;
      } else {
        //console.log("something wrong with varification call");
        showToast("Something wrong with Server response", "danger");
      }

    })
      .catch(error => {
        //console.log('Error messages returned from server', error);
        showToast("Error messages returned from server", "danger");
      });
    this.setState({ onRefreshLoading: false });
  }

  onPressRecipe = item => {
    //alert(item.id);
    //alert(item.categoryName);
    this.props.navigation.navigate('ProductList', { para_categoryId: item.id, categoryName: item.categoryName });
  };

  renderItems = ({ item, index }) => (

    <TouchableOpacity onPress={() => this.onPressRecipe(item)}>
      <View style={[index == 0 ? styles.ItemContainer : styles.ItemContainer, { backgroundColor: '#' + Math.floor(100000 + Math.random() * 400000) + '30' }]}>
        <Image style={styles.photo} source={{ uri: url.imageURL + item.imagePath }} />
        <Text style={styles.productTitle}>{item.categoryName}</Text>

      </View>
    </TouchableOpacity>
  );
  openControlPanel = () => {
    this.props.navigation.openDrawer(); // open drawer
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchOffer', {
        offer_id: item.id,
        comefrom: 'offer'
      })}>
        <Grid style={styles.slide}>
          <Col style={{}}>
            <View style={styles.discountBlock}>
              <Text style={styles.addsSubTitle}>
                {item.offerName}
              </Text>
              <Text style={styles.addsBigTitle}>
                {item.value}{item.valueType == 'rs' ? <Text style={[appStyles.currency, { color: '#F8BB1B', fontSize: 32, }]}>{Colors.CUR}</Text> : item.offerTypeValue}{item.offerTypeCode} OFF
                   </Text>
              <Text numberOfLines={4} style={styles.addsText}>
                {item.description}
              </Text>
            </View>
          </Col>
          <Col style={{ marginLef: 2, width: 120, }}>
            <Image source={{ uri: url.imageURL + item.offerImage }} style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }} />
          </Col>
        </Grid>
      </TouchableOpacity>
    );
  }


  SearchFilterFunction(text) {
    this.props.navigation.navigate('SearchProduct', { text: text });
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
    this.props.getOrderList(this.props.user.user.id).then(res => {

      if (res.status == "success") {
        this.para_orderId = res.data.orderList[0].id;
        if (res.data.orderList[0].id != "") {
          this.props.navigation.navigate('OrderDetail', { orderId: this.para_orderId });
        }
      } else {
        console.log("something wrong with varification call");
        showToast("Something wrong with Server response", "danger");
      }

    })
      .catch(error => {
        console.log('Error messages returned from server', error);
        showToast("Error messages returned from server", "danger");
      });

  };

  refreshContent = () => {
    //alert("ADFA");
    this.getCategoryList;
    this.getOfferList;
  }

  brandNavigation(val) {
    this.props.Branddetails(val).then(res => {
      if (res.status == 200) {
        console.log("SUCCESS FOR", val, res.status)
        this.props.navigation.navigate('SearchOffer',
          {

            comefrom: 'Brand',
            brandid: val

          })
      }
      console.log("SUCCESS FOR 00", res.status)
    });
  }
  ethnicitiesNavigation(val) {
    console.log("SUCCESS FOR 0011", val)
    this.props.Ethnicitiesdetails(val).then(res => {
      if (res.status == 200) {
        console.log("SUCCESS FOR Ethnicitiesdetails", val, res.status)
        this.props.navigation.navigate('SearchOffer',
          {
            comefrom: 'Ethnicities',
            ethenicityid: val
          })
      }

    });
  }

  openFreeDeliveryPopup() {

    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }
  render() {
    //console.log("first render");
    //console.log(this.state.categoryData);
    //console.log("after render");
    const { totalItem, categoryData, brand, ethnicities } = this.props;
    var BrandName = []
    var Ethnicitieslist = []
    var sixcat = []
    var othercat = []
    if (categoryData.length > 0) {

      categoryData.map((item, i) => {
        if (i < 6) {
          sixcat.push(item);
        } else {
          othercat.push(item);
        }

      })
    }
    if (brand != undefined || '' || null) {
      if (brand.length > 0) {
        brand.map((item, i) => {
          BrandName.push(item)
        })
      }
    }
    if (ethnicities != undefined || '' || null) {
      if (ethnicities.length > 0) {
        ethnicities.map((item, i) => {
          Ethnicitieslist.push(item)
        })
      }
    }


    if (this.props.user) {
      var dateofvisit = moment(this.props.user.user.subscriptionEndDate).add(1, 'days');
      var today = moment();
      var subscriptionRemainingDays = dateofvisit.diff(today, 'days');
    }
    if (subscriptionRemainingDays <= 0)
      subscriptionRemainingDays = 0

    return (
      <Container style={[appStyles.container, { width: Layout.window.width, height: Layout.window.height }]}>
        <Header searchBar rounded style={appStyles.headerStyle}>

          <Left style={appStyles.headerLeft}>
            <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={appStyles.menuBar} size={30} color={Colors.primary} name="menu" />
            </Button>
          </Left>

          <Item style={[appStyles.searchBar]} >
            <Icon name="search" style={{ color: Colors.primary }} />
            <Input style={appStyles.searchInput} value={this.state.text} onChangeText={text => {
              this.setState({ text: text });
              setTimeout(() => { this.SearchFilterFunction(this.state.text) }, 2000)
            }
            } placeholder='Search Product' />
          </Item>

          <Right style={appStyles.headerRight}>
            <Button transparent>
              <TouchableOpacity style={appStyles.cartIconArea} onPress={() => totalItem > 0 ? this.props.navigation.navigate(Screens.MyCart.route) : ''}>
                <Icon style={appStyles.cartIcon} name="cart" />
                {totalItem > 0 && (<Text style={appStyles.cartCount}>{totalItem}</Text>)}
              </TouchableOpacity>


            </Button>
          </Right>


        </Header>
        <View style={{
          flexDirection: 'row', justifyContent: 'flex-start', marginLeft: Layout.indent - 5,
          marginRight: Layout.indent - 5, marginTop: 10, marginBottom: 0, backgroundColor: '#D7ECDD', paddingTop: 5, paddingBottom: 5, paddingLeft: 10,
        }}>
          <TouchableOpacity style={styles.prodInfo} onPress={() => this.onDetailPage()}>


            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={[styles.shopSubTitleText, { fontWeight: 'bold', fontSize: 15 }]}> {this.state.nextOrderCount != '' ? this.state.nextOrderCount : this.state.nextOrderCount}</Text><Text style={styles.shopSubTitleText}> item (s) to be delivered tomorrow.</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          coverScreen={false}
          backdropColor={'#fff'}
          backdropOpacity={0.6}
          animationIn={'slideInDown'}
          style={{ flex: 1 }}
        >
          <View style={{ backgroundColor: '#fff', padding: 10, borderWidth: 1, borderColor: Colors.gray, borderRadius: 5 }}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => this.setState({ isModalVisible: false })}>
              <Icon type="AntDesign" name="closecircleo" />
            </TouchableOpacity>
            <Text style={[styles.Modeltext, { fontSize: 16, alignSelf: 'center' }]}>Dear Customer,</Text>

            <Icon type="SimpleLineIcons" name="emotsmile" style={styles.smileIcon} />

            <Text style={{ marginTop: 10 }}>We welcome you in MyAllaadin family..!</Text>
            <Text style={{ marginTop: 10 }}>As a reward of your trust we give you free delivery services at your door with "NO MINIMUM ORDER" for limited period. </Text>
            <Text style={{ marginTop: 10 }}>Post this , Pay small subscription amount monthly and enjoy free Morning delivery for the month. </Text>
            <Text style={{ marginTop: 10 }}>However we also  serve in evening slots with nominal delivery charges.</Text>
            <TouchableOpacity style={styles.closeOk} onPress={() => this.setState({ isModalVisible: false })}>
              <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Font-Medium' }}>OK</Text>
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
              <Card style={[appStyles.addBox, { height: 'auto' }]}>
                <Carousel
                  ref={(c) => { this._carousel = c; }}
                  loop={true}
                  autoplay={true}
                  data={this.props.offerData}
                  renderItem={this._renderItem}
                  sliderWidth={Layout.window.width}
                  itemWidth={Layout.window.width}
                  autoplayInterval={3000}
                  autoplayDelay={3000}
                />
              </Card>
              : null}

            <View style={styles.ItemLayout}>
              <Grid style={styles.shopSubTitle}>

                <View style={{ flex: 1, paddingLeft: 10, flexDirection: 'row', backgroundColor: '#D7ECDD', paddingTop: 5, paddingBottom: 5, paddingRight: 10, justifyContent: 'flex-end' }}>

                  <Text style={styles.pendingDays}>Your free delivery offer ends in {subscriptionRemainingDays} days..!</Text>
                  <TouchableOpacity style={{ textAlign: 'right' }} onPress={() => { this.openFreeDeliveryPopup() }} >
                    <Icon type="AntDesign" name="exclamationcircle" style={styles.infoCircle} />
                  </TouchableOpacity>
                </View>
              </Grid>





              {
                <View>
                  <View style={styles.shopbybrandbg}>
                    <View style={styles.shopbybrandtitle}>
                      <Text style={styles.shopbybrandtitletext}>Featured Brands</Text>
                    </View>


                    <FlatList
                      data={BrandName.filter(brand => brand.isFeatured == 1)}
                      contentContainerStyle={styles.scrollViewStyle}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      automaticallyAdjustContentInsets={true}
                      removeClippedSubviews={true}
                      enableEmptySections={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.contentsection}
                      legacyImplementation={false}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) =>


                        <TouchableOpacity onPress={() => this.brandNavigation(item.id)} style={styles.brandimagearea}>
                          <View style={{borderRadius:200, backgroundColor:'#ffffff', marginBottom:5}}>
                            <Image source={{ uri: url.imageURL + item.imagePath }} style={{ flex: 1, borderRadius:200, height: 110, width: 110, resizeMode: 'contain'}} />
                          </View>
                          <View>
                            <Text style={styles.brandnametitle}>{item.brandName}</Text>
                          </View>
                        </TouchableOpacity>


                      }
                      keyExtractor={item => item.id}
                    />
                  </View>
                  <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={sixcat}
                    renderItem={this.renderItems}
                    keyExtractor={item => `${item.id}`}
                  />



                  <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={othercat}
                    renderItem={this.renderItems}
                    keyExtractor={item => `${item.id}`}
                  />
                  <View style={styles.shopbyethnibg}>
                    <View style={styles.shopbyethnititle}>
                      <Text style={styles.shopbybrandtitletext}>World Food Available</Text>
                    </View>


                    <FlatList
                      data={Ethnicitieslist}
                      contentContainerStyle={styles.scrollViewStyle}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      automaticallyAdjustContentInsets={true}
                      removeClippedSubviews={true}
                      enableEmptySections={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.contentsection}
                      legacyImplementation={false}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => this.ethnicitiesNavigation(item.id)} style={styles.brandimagearea}>
                          <View style={{borderRadius:200, backgroundColor:'#ffffff', marginBottom:5}}>
                            <Image source={{ uri: url.imageURL + item.imagePath }} style={{ flex: 1,borderRadius:200, height: 110, width: 110, resizeMode: 'contain' }} />
                          </View>
                          <View>
                            <Text style={styles.brandnametitle}>{item.ethnicity}</Text>
                          </View>
                        </TouchableOpacity>
                      }
                      keyExtractor={item => item.id}
                    />
                  </View>
                </View>
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
          </View>)}
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
    categoryData: state.common.categoryData,
    offerData: state.common.categoryOfferData,
    brand: state.product.brand,
    ethnicities: state.product.ethnicities

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    showCategoryList: () => dispatch(userActions.showCategoryList()),
    getDeviveryAddress: (useId) => dispatch(userActions.getDeviveryAddress({ userId: useId })),
    fetchOffersOnLandingPage: () => dispatch(productActions.fetchOffers()),
    viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
    getOrderList: (useId) => dispatch(userActions.getUserOrderList({ userId: useId })),
    resetState: () => dispatch({ type: ActionTypes.RESETSTATE }),
    showDeliveryAddress: (userid) => dispatch(userActions.getDeviveryAddress({ userId: userid })),
    nextOrderCount: (userid) => dispatch(userActions.nextOrderCount({ userId: userid })),
    Brand: () => dispatch(productActions.fetchBrand()),
    Branddetails: (val) => dispatch(productActions.fetchBranddetails({
      brandId: val
    })),
    Ethnicities: () => dispatch(productActions.fetchEthnicities()),
    Ethnicitiesdetails: (val) => dispatch(productActions.fetchEthnicitiesdetails({
      ethnicity: val
    })),

  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Home);