import React from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import _ from "lodash";
import { Layout, Colors, Screens } from "../../constants";
import {
  Logo,
  Svgicon,
  Headers,
  LoginBackIcon,
  Category,
} from "../../components";
import imgs from "../../assets/images";
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Title,
  Grid,
  Col,
  Card,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Icon,
  Item,
  Spinner, Footer,
  Input, Row
} from "native-base";
import url from "../../config/api";
import { ItemList } from "../data/data";
import { categoryList } from "../data/data";
import { filterList } from "../data/data";
import { productList } from "../data/data";

import { ProductSorting } from '../data/data';
import { FilterDetailCat } from '../data/data';

import { FilterCat } from '../data/data';
//import MasonryList from "react-native-masonry-list";
import { showToast } from '../../utils/common';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as productActions from "../../actions/product";
import * as cartActions from "../../actions/cart";
import appStyles from "../../theme/appStyles";
import styles from "./styles";
import NumericInput from "react-native-numeric-input";
import { ScreenLoader } from '../../components';
import Modal from 'react-native-modal';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { CheckBox } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
class SearchOffer extends React.Component {
  constructor(props) {
    super(props);
    const categoryId = this.props.navigation.getParam("para_categoryId");
    this.state = {
      dataSource: productList,
      value: 1,
      categoryId: this.props.navigation.getParam("para_categoryId"),
      productData: [],
      subCategory: [],
      selectSubCat: null,
      text: "",
      flalistIndex: 0,
      buyOndeSelected: [],
      selctedProduct: '',
      wished: false,
      filterbrand: [],
      filterpriceto: [],
      filterpricefrom: [],
      filterid: [],
      filterload: false,
      Ratings: [{
        name: require('../../assets/stars/stars5.jpg'),
        value: '5'
      }, {
        name: require('../../assets/stars/stars4.jpg'),
        value: '4'
      }, {
        name: require('../../assets/stars/stars3.jpg'),
        value: '3'
      }, {
        name: require('../../assets/stars/stars2.jpg'),
        value: '2'
      }, {
        name: require('../../assets/stars/stars1.jpg'),
        value: '1'
      },],
      Discounts: [{
        name: 'Upto 10%',
        value: '1-10'
      }, {
        name: '10% - 20%',
        value: '10-20'
      }, {
        name: '20% - 30%',
        value: '20-30'
      }, {
        name: '30% - 40%',
        value: '30-40'
      }, {
        name: 'More than 40%',
        value: '40-100'
      },],

      selectedbrand: [],
      selectedid: [],
      selecteddiscount: [],
      selectedpriceto: [],
      selectedpricefrom: [],
      selectedrating: [],
    };
    this.courseFilterArr = [];
    this.currentIndex = 0;
    //console.log('here----->', this.props.navigation.getParam('para_categoryId'));
  }

  componentDidMount() {
    this.productItemList(this.props.navigation.getParam('offer_id'));
  }

  searchProductItemList(text) {
    this.setState({ text: text })

    this.props.navigation.navigate('SearchProduct', { text: text });


    this.props
      .searchItem(text, this.props.user.user.id)
      .then((res) => {
        if (res.status == "success") {
          if (res.data.itemList) {
            this.setState({ productData: res.data.itemList });
            this.courseFilterArr = res.data.itemList;
          }
        } else {
          showToast("Something wrong with Server response", "danger");
        }
      })
      .catch((error) => {
        showToast("Error messages returned from server", "danger");
      });

    //this.refs.flatListRef.scrollToIndex({animated: true,index:5})
  }


  productItemList(offer_id) {
    //this.setState({text: offer_id})
    const comefrom = this.props.navigation.getParam("comefrom");
    const { brandlisting, ethnicitieslisting } = this.props
    comefrom == 'offer' ?
      this.props
        .fetchItemsByOffer(offer_id, this.props.user.user.id)
        .then((res) => {
          if (res.status == "success") {
            if (res.data.itemList) {
              this.setState({ productData: res.data.itemList });
              this.filterdata(res.data.itemList)
              this.courseFilterArr = res.data.itemList;
            }
          } else {
            showToast("Something wrong with Server response", "danger");
          }
        })
        .catch((error) => {
          showToast("Error messages returned from server", "danger");
        }) : comefrom == "Brand" ? (
          this.filterdata(brandlisting),
          this.setState({
            productData: brandlisting
          })
        )

        : (
          this.filterdata(ethnicitieslisting),
          this.setState({
            productData: ethnicitieslisting
          })
        )




    //this.refs.flatListRef.scrollToIndex({animated: true,index:5})
  }
  //func call when click item category
  _itemChoose(item) {
    //  alert(item.title);
  }
  _filterChoose(item) { }
  onPressRecipe(item) {
    alert(this.item);
  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  productDetail(id) {
    this.props.productDetail(id, this.props.user.user.id).then(res => {
      //console.log(res);
      if (res.status == "success") {
        if (res.data.item.length > 0) {
          this.props.navigation.navigate(Screens.ProductDetail.route)
        } else {
          showToast('Product detail not found', 'danger');
        }
      }
    });
  }

  buyOncePressHnadler(productId, value, action) {
    this.setState({ selctedProduct: productId })

    var offer_id = this.props.navigation.getParam('offer_id');
    if (value == 0) {
      this.props.deleteCartItem(productId, this.props.user.user.id).then(res => {
        if (res.status == "success") {
          this.props.fetchItemsByOfferWithoutLoader(offer_id, this.props.user.user.id).then((res) => {
            if (res.status == "success" && res.data.itemList) {
              this.setState({ productData: res.data.itemList });
            } else {
              this.setState({ productData: [] });
            }
          })
          this.props.viewCart(this.props.user.user.id).then(res => {
            //showToast('Cart updated successfully.', "success")
            this.setState({ selctedProduct: '' })
          })
        }
      })
    } else if (value == 1 && action == 'add') {
      this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
        if (res.status == "success") {
          this.props.fetchItemsByOfferWithoutLoader(offer_id, this.props.user.user.id).then((res) => {
            if (res.status == "success" && res.data.itemList) {
              this.setState({ productData: res.data.itemList });
            } else {
              this.setState({ productData: [] });
            }
          })
          this.props.viewCart(this.props.user.user.id).then(res => {
            //showToast('Cart updated successfully.', "success")
            this.setState({ selctedProduct: '' })
          })
        }
      })
    } else if (value >= 1) {
      this.props.updateCartItem(this.props.user.user.id, productId, value).then(res => {
        if (res.status == "success") {
          this.props.fetchItemsByOfferWithoutLoader(offer_id, this.props.user.user.id).then((res) => {
            if (res.status == "success" && res.data.itemList) {
              this.setState({ productData: res.data.itemList });
            } else {
              this.setState({ productData: [] });
            }
          })
          this.props.viewCart(this.props.user.user.id).then(res => {
            //showToast('Cart updated successfully.', "success")
            this.setState({ selctedProduct: '' })
          })
        }
      })
    }


    //this.setState({value: value})
  }
  subscribePressHandlder(item) {

    this.props.checkActiveSubscription(item.id, this.props.user.user.id).then(res => {
      //console.log(res.data);
      if (res.status == 'success') {
        if (res.data.isActiveSubscription == 'Y') {
          showToast('You have already subscribed this product.', "danger")
        } else {
          showToast('Please ensure the quanity, once subscribed its not recommened to change', 'success');
          this.props.navigation.navigate(
            Screens.SubscribeOrder.route,
            { item: item, qty: this.state.value }
          )
        }
      } else {
        showToast('Please try again', "danger")
      }
    })
  }
  SortShowFunction() {
    this.setState({ SortinType: '' })
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  FilterShowFunction() {
    this.setfilterdatanull();
    this.setState({ isFilterVisible: !this.state.isFilterVisible,filterload:false });
  }

  FilterDetailShowFunction() {
    this.setState({ isFilterDetailVisible: !this.state.isFilterDetailVisible });
  }



  goFilterDetail() {
    this.setState({ isFilterVisible: !this.state.isFilterVisible });
    this.setState({ isFilterDetailVisible: !this.state.isFilterDetailVisible });
  }

  async filterdata(val) {

    const Brandname = []
    const Brandnid = []
    const Price = []
    const result = []
    const filterdisplaypriceto = []
    const filterdisplaypricefrom = []
    var size = ''

    val.forEach(element => Brandname.push(element.brandName))
    val.forEach(element => Brandnid.push(element.brandId))

    let uniquebrand = Brandname.filter((item, i, ar) => ar.indexOf(item) === i);
    let uniqueid = Brandnid.filter((item, i, ar) => ar.indexOf(item) === i);

    val.forEach(element => Price.push(element.discountedPrice < element.price ? element.discountedPrice : element.price))
    let uniqueprice = Price.filter((item, i, ar) => ar.indexOf(item) === i);

    uniqueprice.sort(function (a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    if (uniqueprice.length > 12) {
      var size = "6"
    } else {
      var size = "3"
    }

    while (uniqueprice.length > 0)
      result.push(uniqueprice.splice(0, size));
    result.map((item, index) => {
      filterdisplaypricefrom.push(Math.floor(item[0]))
      filterdisplaypriceto.push(Math.floor(item[size - 1]))
    })

    this.setState({
      filterbrand: uniquebrand,
      filterid: uniqueid,
      filterpriceto: filterdisplaypriceto.filter(value => !Number.isNaN(value)),
      filterpricefrom: filterdisplaypricefrom.filter(value => !Number.isNaN(value))
    })
    console.log("Product List Filter DATA", this.state.filterprice, this.state.filterbrand)
  }

  addtobrand(clickIndex) {
    var array = [...this.state.selectedid];
    var index = array.indexOf(clickIndex)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedid: array, });
    }
    else {
      array.push(clickIndex)
      this.setState({ selectedid: array, });
    }
  }
  addtopriceto(clickIndex) {

    this.setState({ selectedpriceto: clickIndex, });
  }

  addtopricefrom(clickIndex) {

    this.setState({ selectedpricefrom: clickIndex, });

  }
  addtodiscount(clickIndex) {
    var array = [...this.state.selecteddiscount];
    var index = array.indexOf(clickIndex)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selecteddiscount: array, });
    }
    else {
      array.push(clickIndex)
      this.setState({ selecteddiscount: array, });
    }
  }
  addtorating(clickIndex) {
    var array = [...this.state.selectedrating];
    var index = array.indexOf(clickIndex)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedrating: array, });
    }
    else {
      array.push(clickIndex)
      this.setState({ selectedrating: array, });
    }
  }

  Filterapply() {
    const brand = this.props.navigation.getParam("brandid");
    const ethenicity = this.props.navigation.getParam("ethenicityid");
    const comefrom = this.props.navigation.getParam("comefrom");
    const offer_id = this.props.navigation.getParam('offer_id');

    this.setState({
      filterload: true
    })
    if (this.state.selectedpricefrom > this.state.selectedpriceto) {
      this.setState({
        Filterapply: false,
        filterload: false
      })
      return showToast("Please Check Price", "danger")
    } else {
      {
        comefrom == "offer" ?
          this.props
            .fetchItemsByOfferfilter(
              offer_id,
              this.props.user.user.id,
              this.state.selectedid,
              this.state.selectedpricefrom,
              this.state.selectedpriceto,
              this.state.selectedrating,
              this.state.selecteddiscount)
            .then((res) => {
              this.setState({
                filterload: false
              })
              if (res.status == "success") {
                if (res.data.itemList) {
                 // this.setfilterdatanull();
                  this.setState({ isFilterVisible: false, productData: res.data.itemList,filterload: false });
                  this.courseFilterArr = res.data.itemList;
                }
              } else {
                showToast("Something wrong with Server response", "danger");
              }
            }
            ) :

          this.props.filtersapply(
            ethenicity,
            brand ? brand : this.state.selectedid,
            this.state.selectedpricefrom,
            this.state.selectedpriceto,
            this.state.selectedrating,
            this.state.selecteddiscount).then(res => {
              this.setState({
                filterload: false
              })
              console.log("ETHENI FILTER", res.status)
              if (res.status == 200) {
                //this.setfilterdatanull();
                this.setState({ isFilterVisible: false, productData: res.data.data.itemList, });
              } else {
                showToast("Something went Wrong", "danger")
              }
            })
      }
    }
  }

  setfilterdatanull() {
    this.setState({
      filterload: true,
      selectedbrand: [],
      selectedid: [],
      selecteddiscount: [],
      selectedpriceto: [],
      selectedpricefrom: [],
      selectedrating: [],
    })
  }

  async resetapply() {
    this.setfilterdatanull();
      const brand = this.props.navigation.getParam("brandid");
      const ethenicity = this.props.navigation.getParam("ethenicityid");
      const comefrom = this.props.navigation.getParam("comefrom");
      const offer_id = this.props.navigation.getParam('offer_id');
  
      this.setState({
        filterload: true
      })
      
        {
          comefrom == "offer" ?
            this.props
              .fetchItemsByOfferfilter(
                offer_id,
                this.props.user.user.id,
                this.state.selectedid,
                this.state.selectedpricefrom,
                this.state.selectedpriceto,
                this.state.selectedrating,
                this.state.selecteddiscount)
              .then((res) => {
                this.setState({
                  filterload: false
                })
                if (res.status == "success") {
                  if (res.data.itemList) {
                   // this.setfilterdatanull();
                    this.setState({ isFilterVisible: false, productData: res.data.itemList,filterload: false });
                    this.courseFilterArr = res.data.itemList;
                  }
                } else {
                  showToast("Something wrong with Server response", "danger");
                }
              }
              ) :
  
            this.props.filtersapply(
              ethenicity,
              brand ? brand : this.state.selectedid,
              this.state.selectedpricefrom,
              this.state.selectedpriceto,
              this.state.selectedrating,
              this.state.selecteddiscount).then(res => {
                this.setState({
                  filterload: false
                })
                console.log("ETHENI FILTER", res.status)
                if (res.status == 200) {
                  //this.setfilterdatanull();
                  this.setState({ isFilterVisible: false, productData: res.data.data.itemList, });
                } else {
                  showToast("Something went Wrong", "danger")
                }
              })
        }
      }
    
  

  sortingapply(val) {

    const brand = this.props.navigation.getParam("brandid");
    const ethenicity = this.props.navigation.getParam("ethenicityid");
    const comefrom = this.props.navigation.getParam("comefrom");
    const offer_id = this.props.navigation.getParam('offer_id');
    this.setState({ SortinType: val })

    {
      comefrom == 'offer' ?
        this.props.fetchItemsByOfferfilter(offer_id,
          this.props.user.user.id,
          this.state.selectedid,
          this.state.selectedpricefrom,
          this.state.selectedpriceto,
          this.state.selectedrating,
          this.state.selecteddiscount, val)
          .then((res) => {
            this.setState({ isModalVisible: false })
            if (res.status == "success") {
              if (res.data.itemList) {
                this.setState({ productData: res.data.itemList });
                this.courseFilterArr = res.data.itemList;
              }
            } else {
              showToast("Something wrong with Server response", "danger");
            }
          }
          ) :


        this.props.filtersapply(ethenicity,
          brand ? brand : this.state.selectedid,
          this.state.selectedpricefrom,
          this.state.selectedpriceto,
          this.state.selectedrating,
          this.state.selecteddiscount, val).then(res => {
            if (res.status == 200) {
              this.setState({ isModalVisible: false, productData: res.data.data.itemList, });
              // this.props.navigation.navigate('SearchProduct', {
              //   Filter: true
              // })
            } else {
              showToast("Something went Wrong", "danger")
            }
          })
    }
  }


  render() {

    console.log('buyOndeSelected', this.state.buyOndeSelected)
    const { navigation, totalItem } = this.props;
    const getTitle = navigation.getParam("item");

    const categoryName = this.props.navigation.getParam("categoryName");
    return (
      <Container style={appStyles.container}>
        <Header searchBar rounded style={appStyles.headerStyle}>

          <Left style={appStyles.headerLeft}>
            <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.navigate(Screens.Home.route)}>
              <Icon style={appStyles.menuBar} type="AntDesign" size={30} color={Colors.white} name="arrowleft" />
            </Button>
          </Left>

          <Item style={[appStyles.searchBar]} >
            <Icon name="search" style={{ color: Colors.primary }} />
            <Input style={appStyles.searchInput} value={this.state.text} onChangeText={text => {
              this.setState({ text: text });
              if (text.length > 2)
                setTimeout(() => { this.searchProductItemList(this.state.text) }, 3000)
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
        <View style={{ height: Layout.doubleIndent, marginTop: Layout.indent - 7 }}><Row style={appStyles.footers}>
          <Col style={{ justifyContent: 'center', alignItems: 'center', borderColor: Colors.primary, borderRightWidth: 1 }}>
            <TouchableOpacity onPress={() => this.FilterShowFunction()} >
              <Item style={{ borderBottomWidth: 0, }} onPress={() => this.FilterShowFunction()} >
                <Text style={appStyles.sortLabel}>FILTER</Text>
                <Icon style={appStyles.sorting} name="filter" type="Feather" />
              </Item>
            </TouchableOpacity>
          </Col>
          <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <Item style={{ borderBottomWidth: 0, }} onPress={() => this.SortShowFunction()} >
                <Text style={appStyles.sortLabel}>SORT</Text>
                <Icon style={appStyles.sorting} name="sort" type="MaterialIcons" />
              </Item>
            </TouchableOpacity>
          </Col>
        </Row></View>
        <Content enableOnAndroid style={appStyles.content}>

          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (



              <View>
                {this.state.productData.map((item, index) => {
                  // productList.map((item, index) => {
                  var foodType = '';
                  if (item.foodType == 'veg')
                    foodType = '#00ff00';
                  if (item.foodType == 'Nonveg')
                    foodType = 'red';
                  if (item.foodType == 'vegan')
                    foodType = 'blue';
                  return (
                    <ListItem style={styles.ListItems} key={index}>


                      <Left style={styles.ListLeft}>

                        <TouchableOpacity
                          style={styles.prodInfo}
                          onPress={() =>
                            this.productDetail(item.id)
                          }
                        >
                          <Image
                            style={styles.proImage}
                            source={{ uri: url.imageURL + item.imagePath }}
                          />
                        </TouchableOpacity>

                      </Left>
                      <Body>
                        <TouchableOpacity
                          style={styles.prodInfo}
                          onPress={() =>
                            this.productDetail(item.id)
                          }
                        >
                          <View style={appStyles.brandAndVeg}>
                            <View style={{ flex: 0 }}>
                              <Text style={styles.proBrand}>{item.brandName}</Text>
                            </View>
                            <View style={{ flex: 0, width: 12 }}>

                              {
                                (item.foodType != "NA" && item.foodType != null) && <Image style={appStyles.vegImage} source={item.foodType == 'veg' ? imgs.smallVeg
                                  :
                                  item.foodType == 'vegan' ? imgs.smallVegan
                                    :
                                    imgs.smallNonVeg} />
                              }
                            </View>
                          </View>

                          <Text style={styles.proTitle}>{item.itemName}</Text>

                          <Text style={styles.proQuanitty} note>
                            {item.weight !== ""
                              ? "(" + item.weight + " " + item.uom + ")"
                              : ""}{" "}
                          </Text>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            {item.discountedPrice > 0 && item.discountedPrice < item.price ? (
                              <View style={{ flexDirection: "row" }}>
                                <Text style={styles.proPriceStrike}>
                                  <Text style={appStyles.currencysmall}>
                                    {Colors.CUR}
                                  </Text>{" "}
                                  <Text
                                    style={appStyles.amountmedium}
                                  >{item.price}</Text>
                                </Text>
                                <Text style={styles.proPrice}>
                                  <Text
                                    style={appStyles.currencysmall}
                                  >
                                    {Colors.CUR}

                                  </Text>{" "}
                                  <Text
                                    style={appStyles.amountmedium}
                                  >{item.discountedPrice}</Text>
                                </Text>
                              </View>
                            ) : (
                                <View>
                                  <Text style={styles.proPrice}>
                                    <Text
                                      style={appStyles.currencysmall}
                                    >
                                      {Colors.CUR}
                                    </Text>{" "}
                                    <Text
                                      style={appStyles.amountmedium}
                                    >{item.price}</Text>
                                  </Text>
                                </View>
                              )}
                          </View>
                        </TouchableOpacity>
                      </Body>
                      <Right style={styles.ListRight}>
                        <View>

                        </View>
                        {item.outOfStock == 'Y' ?
                          <Text style={styles.outofstock}>Out of Stock</Text> :
                          (<View>
                            {item.isSubscribable ? (
                              <ImageBackground source={imgs.AEDpng} style={[styles.subscribeBtn, {}]}>
                                <TouchableOpacity
                                  onPress={() =>
                                    this.subscribePressHandlder(item)
                                  }
                                >
                                  <Text style={styles.subText}>
                                    {item.price}
                                  </Text>
                                </TouchableOpacity>
                              </ImageBackground>
                            ) : (
                                <View style={{ padding: 0, margin: 0 }}></View>
                              )}

                            {this.state.selctedProduct == item.id ? <ActivityIndicator style={{ marginRight: 20 }} /> :
                              (<View>
                                {item.cartQty > 0 ?
                                  (<NumericInput
                                    initValue={item.cartQty}
                                    //value={this.state.buyOndeSelected.indexOf(item.id) != -1 ? 1 : null }
                                    onChange={(value) => this.buyOncePressHnadler(item.id, value, 'update')}
                                    onLimitReached={(isMax, msg) =>
                                      console.log(isMax, msg)
                                    }
                                    minValue={0}
                                    totalWidth={100}
                                    totalHeight={35}
                                    iconSize={30}
                                    borderColor={Colors.primary}
                                    inputStyle={{ fontSize: 15 }}
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
                                        this.buyOncePressHnadler(item.id, 1, 'add')
                                      }
                                    >
                                      <Image source={imgs.addPlus} style={styles.buyButton} />
                                    </TouchableOpacity>
                                  )}
                              </View>)}
                          </View>)}
                      </Right>
                    </ListItem>
                  );
                })}
                {this.state.productData.length == 0 ? <View style={[appStyles.spinner, appStyles.norecordfound]}><Text>No Product Found</Text></View> : null}
              </View>

            )

          }
        </Content>

        <Modal style={appStyles.SortModal} isVisible={this.state.isModalVisible} hasBackdrop={true}
          backdropColor={'#333'} backdropOpacity={0.3}>

          <View
            style={appStyles.bottmSortMain}>



            <View
              style={appStyles.bottomSortInner}>
              <TouchableOpacity onPress={() => this.SortShowFunction()} style={appStyles.closeBtnArea} >
                <Icon name="closecircleo" type="AntDesign" style={appStyles.closeBtn} />
              </TouchableOpacity>
              {ProductSorting.map((data, key) => {
                return (<Grid key={key} style={{ paddingTop: 20 }}>
                  {this.state.SortinType == data.SortinValue ?

                    <Row>
                      <Col style={{ flex: 1, justifyContent: 'center', marginLeft: 25 }}>
                        <Text style={appStyles.SortingText}>{data.SortinType}</Text>
                      </Col>
                      <Col style={[styles.btn, { flex: 0, justifyContent: 'center', width: 50 }]}>
                        <Icon style={styles.imgSorting} name='radio-button-checked' type='MaterialIcons' />
                      </Col>
                    </Row>

                    :

                    <Row>
                      <Col style={{ flex: 1, justifyContent: 'center', marginLeft: 25 }}>
                        <Text style={appStyles.SortingText}>{data.SortinType}</Text>
                      </Col>
                      <Col style={[styles.btn, { flex: 0, justifyContent: 'center', width: 50 }]} onPress={() => this.sortingapply(data.SortinValue)} >
                        <Icon style={appStyles.imgSorting} name='radio-button-unchecked' type='MaterialIcons' />
                      </Col>
                    </Row>


                  }
                </Grid>
                )
              })}




            </View>

          </View>
        </Modal>


        <Modal style={[appStyles.SortModal, { height: '100%' }]} isVisible={this.state.isFilterVisible} hasBackdrop={true}
          backdropColor={'#333'} backdropOpacity={0.3} >
          <View style={appStyles.bottmFilterMain}>

            <View style={appStyles.bottomFilterInner}>
              <TouchableOpacity onPress={() => this.FilterShowFunction()} style={appStyles.closeBtnArea} >
                <Icon name="closecircleo" type="AntDesign" style={appStyles.closeBtn} />
              </TouchableOpacity>

              <ScrollView style={{ marginTop: 25, flexDirection: 'column', marginBottom: 20, height: 350 }}>
                <Collapse>
                  <CollapseHeader style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#dddddd' }}>

                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left', color: '#333333', width: Layout.window.width - Layout.fourIndent }}>Brand</Text>
                    <AntDesign name="rightcircleo" size={24} color="black" />
                  </CollapseHeader>
                  <CollapseBody>
                    {this.state.filterbrand.map((data, index) => {
                      return (
                        <View style={{ marginStart: 10, flexDirection: 'row' }}>
                          <CheckBox
                            title={data}
                            onPress={() => this.addtobrand(this.state.filterid[index])}
                            checked={this.state.selectedid.indexOf(this.state.filterid[index]) !== -1} />

                        </View>
                      )
                    })}
                  </CollapseBody>
                </Collapse>



                <Collapse>
                  <CollapseHeader style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left', color: '#333333', width: Layout.window.width - Layout.fourIndent }}>Prices</Text>
                    <AntDesign name="rightcircleo" size={24} color="black" />
                  </CollapseHeader>
                  <CollapseBody>
                    {/* {this.state.filterpricefrom.map((data, index) => {
                      return (
                        <View style={{ padding: 4, marginStart: 10, flexDirection: 'row' }}>
                          <CheckBox checked={this.state.selectedpricefrom == this.state.filterpricefrom[index]} />
                          <TouchableOpacity
                            onPress={() => this.addtopricefrom(this.state.filterpricefrom[index])}
                            style={{ marginStart: 20 }}>
                            <Text>{data}</Text>
                          </TouchableOpacity>
                        </View>

                      )
                    })} */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                      <TextInput
                        placeholder="From min"
                        style={{ height: 40, borderColor: 'gray', marginBottom: 2, borderWidth: 1, width: 160, borderRadius: 30, padding: 5 }}
                        onChangeText={text => this.addtopricefrom(text)}
                        value={this.state.selectedpricefrom}
                      />
                      <TextInput
                        placeholder="To max"
                        style={{ height: 40, borderColor: 'gray', marginBottom: 2, borderWidth: 1, width: 160, borderRadius: 30, padding: 5 }}
                        onChangeText={text => this.addtopriceto(text)}
                        value={this.state.selectedpriceto}
                      />

                    </View>
                  </CollapseBody>
                </Collapse>


                {/* <Collapse>
                  <CollapseHeader style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left', color: '#333333' }}>Prices To</Text>
                  </CollapseHeader>
                  <CollapseBody>
                    {this.state.filterpriceto.map((data, index) => {
                      return (
                        <View style={{ padding: 4, marginStart: 10, flexDirection: 'row' }}>
                          <CheckBox checked={this.state.selectedpriceto == this.state.filterpriceto[index]} />
                          <TouchableOpacity
                            onPress={() => this.addtopriceto(this.state.filterpriceto[index])}
                            style={{ marginStart: 20 }}>
                            <Text>{data}</Text>
                          </TouchableOpacity>
                        </View>

                      )
                    })}
                  </CollapseBody>
                </Collapse> */}

                <Collapse>
                  <CollapseHeader style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left', color: '#333333', width: Layout.window.width - Layout.fourIndent }}>Discounts in %</Text>
                    <AntDesign name="rightcircleo" size={24} color="black" />
                  </CollapseHeader>
                  <CollapseBody>
                    {this.state.Discounts.map((data, index) => {
                      return (
                        <View style={{ marginStart: 10, flexDirection: 'row' }}>

                          <CheckBox
                            title={data.name}
                            onPress={() => this.addtodiscount(this.state.Discounts[index].value)}
                            checked={this.state.selecteddiscount.indexOf(this.state.Discounts[index].value) !== -1} />

                        </View>
                      )
                    })}
                  </CollapseBody>
                </Collapse>

                <Collapse>
                  <CollapseHeader style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'left', color: '#333333', width: Layout.window.width - Layout.fourIndent }}>Ratings</Text>
                    <AntDesign name="rightcircleo" size={24} color="black" />
                  </CollapseHeader>
                  <CollapseBody>
                    {this.state.Ratings.map((data, index) => {
                      return (

                        <View style={{ marginStart: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                          <CheckBox
                            onPress={() => this.addtorating(this.state.Ratings[index].value)}
                            checked={this.state.selectedrating.indexOf(this.state.Ratings[index].value) !== -1} />
                          <Image source={data.name}
                            style={{ width: 100, height: 17, }}
                          />
                          <Text> {index != 0 ? '& more' : null}</Text>
                        </View>
                      )
                    })}
                  </CollapseBody>
                </Collapse>
              </ScrollView>

              <Grid style={appStyles.ApplyButtonSection}>
                <Row>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.Filterapply()}
                      style={appStyles.applyFilter}>{
                        this.state.filterload ? <View style={{ padding: 12 }}><ActivityIndicator color="#FFF" /></View> : <Text style={appStyles.applyFilterText}>Apply</Text>
                      }</TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.resetapply()}
                      style={appStyles.applyFilter}>
                      {
                        this.state.filterload ?
                          <View style={{ padding: 12 }}><ActivityIndicator color="#FFF" /></View>
                          : <Text style={appStyles.applyFilterText}>Reset</Text>
                      }
                    </TouchableOpacity>
                  </Col>
                </Row>
              </Grid>

            </View>
          </View>
        </Modal>


        <Modal style={appStyles.SortModal} isVisible={this.state.isFilterDetailVisible} hasBackdrop={true}
          backdropColor={'#333'} backdropOpacity={0.3} >
          <View style={appStyles.bottmFilterMain}>

            <View style={appStyles.bottomFilterDetailInner}>
              <TouchableOpacity onPress={() => this.FilterDetailShowFunction()} style={appStyles.closeBtnArea} >
                <Icon name="closecircleo" type="AntDesign" style={appStyles.closeBtn} />
              </TouchableOpacity>
              <ScrollView>
                <List style={[appStyles.filterList, { paddingBottom: 25 }]} >
                  {FilterDetailCat.map((data, key) => {
                    return (
                      <ListItem style={[appStyles.ListItemsFilter, { paddingTop: 10, paddingBottom: 10, overflow: 'scroll' }]} key={key}>

                        <Left style={{ marginLeft: 10 }}>
                          <TouchableOpacity>
                            <Text style={appStyles.SortingText}>{data.FilterType}({data.total})</Text>
                          </TouchableOpacity>
                        </Left>

                      </ListItem>
                    )
                  })}
                </List>

                <Grid style={[appStyles.ApplyButtonSection, { marginTop: 10 }]}>
                  <Row>

                    <Col>
                      <TouchableOpacity onPress={() => this.FilterDetailShowFunction()}
                        style={appStyles.applyFilter}><Text style={appStyles.applyFilterText}>Apply</Text></TouchableOpacity>
                    </Col>
                  </Row>
                </Grid>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/*<Catalog {...this.props} />*/}
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoading: state.common.isLoading,
    totalItem: state.cart.totalItem,
    brandlisting: state.product.brandlisting,
    ethnicitieslisting: state.product.ethnicitieslisting

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    productItemList: (categoryId, subCategoryId) =>
      dispatch(userActions.showProductList({ subCategoryId: subCategoryId, categoryId: categoryId })),
    fetchSubCategory: (categoryId) =>
      dispatch(userActions.fetchSubCategory({ categoryId: categoryId })),

    fetchItemsByOfferfilter: (offerId, userId, brandid, pricefrom, priceto, rating, discount, sort) =>
      dispatch(productActions.fetchItemsByOffer({
        offerId: offerId,
        userId: userId,
        brandId: brandid.toString(),
        priceFrom: pricefrom.toString(),
        priceTo: priceto.toString(),
        ratings: rating.toString(),
        discount: discount.toString(),
        sortBy: sort,
      })),

    fetchItemsByOffer: (offerId, userId) =>
      dispatch(productActions.fetchItemsByOffer({ offerId: offerId, userId: userId })),

    // fetchItemsByOffersorting: (offerId, userId, sort) =>
    //   dispatch(productActions.fetchItemsByOffer({ offerId: offerId, userId: userId,  })),


    fetchItemsByOfferWithoutLoader: (offerId, userId) =>
      dispatch(productActions.fetchItemsByOfferWithoutLoader({ offerId: offerId, userId: userId })),
    productDetail: (id, userId) =>
      dispatch(productActions.productDetail({ itemId: id, userId: userId })),
    viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
    addToCartItem: (userId, itemId, quantity) => dispatch(cartActions.addToCartItem({ userId: userId, itemId: itemId, quantity: quantity })),
    updateCartItem: (userId, itemId, quantity) => dispatch(cartActions.updateCartItem({ userId: userId, itemId: itemId, quantity: quantity })),
    deleteCartItem: (itemId, userId) => dispatch(cartActions.deleteCartItem({ itemId: itemId, userId: userId })),
    checkActiveSubscription: (itemId, userId) => dispatch(userActions.checkActiveSubscription({ itemId: itemId, userId: userId })),
    searchItem: (searchString, userId) => dispatch(productActions.searchItem({ searchString: searchString, userId: userId })),
    filtersapply: (ethenicityid, localbrandid, pricefrom, priceto, rating, discount, sort) => dispatch(productActions.filterapply(
      {
        ethnicity: ethenicityid,
        brandId: localbrandid.toString(),
        priceFrom: pricefrom.toString(),
        priceTo: priceto.toString(),
        ratings: rating.toString(),
        discount: discount.toString(),
        sortBy: sort,

      })),

    // sortingapply: (, brandid, ethenicityid) => dispatch(productActions.filterapply(
    //   {

    //     brandId: brandid,
    //     ethnicity: ethenicityid

    //   })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SearchOffer);
