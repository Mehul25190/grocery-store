import React from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
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
  Spinner, Item,
  Icon, Row, Footer
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
import { Fontisto } from '@expo/vector-icons';
import { ScreenLoader } from '../../components';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';

class MyWishlist extends React.Component {
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
      isModalVisible: false,
      isFilterVisible: false,
      type: '',
      filterbrand: [],
      filterprice: []
    };
    this.courseFilterArr = [];
    this.currentIndex = 0;
    //console.log('here----->', this.props.navigation.getParam('para_categoryId'));
  }

  componentDidMount() {
    this.setState({
      dataSource: productList,
      //categoryId:this.props.navigation.getParam('para_categoryId'),
    });
    //alert(this.state.categoryId);
    //get product list default base on category selected
    this.subCategoryList();
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({ selectSubCat: null, text: '', buyOndeSelected: [] });
      this.subCategoryList();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  SearchFilterFunction(text) {
    //console.log(this.courseFilterArr)
    //passing the inserted text in textinput
    const newData = this.courseFilterArr.filter(function (item) {
      const itemData = item.itemName ? item.itemName.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      const itemData1 = item.itemTag ? item.itemTag.toUpperCase() : "".toUpperCase();
      const textData1 = text.toUpperCase();
      return itemData.indexOf(textData) > -1 || itemData1.indexOf(textData1) > -1;
    });
    this.setState({
      productData: newData,
      text: text,
    });
  }

  subCategoryList() {
    //console.log('sub category call');
    this.props
      .fetchSubCategory(this.props.navigation.getParam("para_categoryId"))
      .then((res) => {
        //console.log("sucess return", res.data.subCategory);
        if (res.status == "success") {
          if (res.data.subCategory.length > 0) {
            this.setState({ subCategory: res.data.subCategory, selectSubCat: res.data.subCategory[0].id });
            this.productItemList(res.data.subCategory[0].categoryId, res.data.subCategory[0].id, 0);

          } else {
            showToast("No product found", "danger");
            this.props.navigation.navigate(Screens.Home.route)
          }
          //console.log('set return');
          //console.log(res.data.itemList);
        } else {
          console.log("something wrong with varification call");
          showToast("Something wrong with Server response", "danger");
        }
      });
  }

  async filterdata(val) {
    const Brandname = []
    const Price = []
    const result = []
    const filterdisplayprice = []
    var size = ''

    val.forEach(element => Brandname.push(element.brandName))
    let unique = Brandname.filter((item, i, ar) => ar.indexOf(item) === i);

    val.forEach(element => Price.push(element.item.discountedPrice < element.item.price ? element.item.discountedPrice : element.item.price))

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
      filterdisplayprice.push(Math.floor(item[size - 1]))
    })

    this.setState({
      filterbrand: unique,
      filterprice: filterdisplayprice.filter(value => !Number.isNaN(value))
    })
    console.log("Wishlist Filter DATA",this.state.filterprice,this.state.filterbrand)
  }

  subBySubCategoryList(catId, catName, index) {
    this.props
      .searchItem(catName)
      .then((res) => {
        if (res.status == "success") {
          if (res.data.itemList.length > 0) {
            //this.setState({ productData: res.data.itemList, selectSubCat: catId });
            this.courseFilterArr = res.data.itemList;
          } else {
            this.courseFilterArr = [];
            this.setState({ productData: [], selectSubCat: catId });
          }
        } else {
          showToast("Something wrong with Server response", "danger");
        }
      })
      .catch((error) => {
        showToast("Error messages returned from server", "danger");
      });
  }

  productItemList(catId, subCatId, index) {
    this.currentIndex = index - 1;
    //catId = this.props.navigation.getParam("para_categoryId") ? this.props.navigation.getParam("para_categoryId") : this.state.selectSubCat;
    this.setState({ flalistIndex: index })
    this.props
      .fetchwishlist(this.props.user.user.id)
      // .productItemList(catId, subCatId, this.props.user.user.id)

      .then((res) => {

        if (res.data.status == "success") {

          const data = res.data.data.wishlist;
          // data.map((item, index) => {
          this.setState({
            productData: data
          })
          // })
          this.filterdata(data)

        } else {
          showToast("Something wrong with Server response", "danger");
        }
      })
      .catch((error) => {
        showToast("Error messages returned from server", "danger");
      });

    //this.refs.flatListRef.scrollToIndex({animated: true,index:5})

    //console.log(catId);
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

  renderItems = ({ item, index }) => (
    <TouchableOpacity onPress={() => this.productItemList(item.categoryId, item.id, index)}>
      <View style={styles.cateContainer}>
        <Text
          style={
            this.state.selectSubCat == item.id
              ? styles.titleBackground
              : styles.whiteBackground
          }
        >
          {item.subCategoryName}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
    if (value == 0) {
      this.props.deleteCartItem(productId, this.props.user.user.id).then(res => {
        if (res.status == "success") {
          this.props.viewCart(this.props.user.user.id).then(res => {
            //showToast('Cart updated successfully.', "success");
            this.updateProductList(productId, value)
          })
        }

      })
    } else if (value == 1 && action == 'add') {
      this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
        if (res.status == "success") {
          this.props.viewCart(this.props.user.user.id).then(res => {
            //console.log('dddd', res);
            //showToast('Cart updated successfully.', "success")
            this.updateProductList(productId, value)
          })
        }
      })
    } else if (value >= 1) {
      this.props.updateCartItem(this.props.user.user.id, productId, value).then(res => {
        if (res.status == "success") {
          this.props.viewCart(this.props.user.user.id).then(res => {
            //showToast('Cart updated successfully.', "success")
            this.updateProductList(productId, value)
          })
        }
      })
    }


    //this.setState({selctedProduct: ''})

    //this.setState({value: value})
  }

  removedwishlist(itemid) {

    this.props
      .removewishlist(itemid)
      .then((res) => {
        console.log("CALL removedwishlist", res)
        if (res.status == "success") {
          this.props
            .fetchwishlist(this.props.user.user.id)
            .then((res) => {
              if (res.data.status == "success") {
                const data = res.data.data.wishlist;
                this.setState({
                  productData: data
                })
              } else {
                showToast("Something wrong with Server response", "danger");
              }
            })
            .catch((error) => {
              showToast("Error messages returned from server", "danger");
            });
        } else {
          showToast("Something wrong with Server response", "danger");
        }
      })
      .catch((error) => {
        console.log("ERROR", error)
        showToast("Error messages returned from server", "danger");
      });
  }

  updateProductList(productId, value) {
    var array = [...this.state.buyOndeSelected]; // make a separate copy of the array
    var index = array.indexOf(productId)
    if (index !== -1 && value == 0) {
      array.splice(index, 1);
      this.setState({ buyOndeSelected: array });
    } else {
      array.push(productId)
      this.setState({ buyOndeSelected: array });
    }

    this.props.getproductItemList(this.state.categoryId, this.state.selectSubCat, this.props.user.user.id)
      .then((res) => {
        //console.log('sucess return', res.data.itemList);
        this.setState({ selctedProduct: '' })
        if (res.status == "success") {
          if (res.data.itemList.length > 0) {
            this.setState({ productData: res.data.itemList, selectSubCat: this.state.selectSubCat });
          } else {
            this.setState({ productData: [], selectSubCat: this.state.selectSubCat });
          }
        } else {
          showToast("Something wrong with Server response", "danger");
        }
      }).catch(error => {
        this.setState({ selctedProduct: '' })
      })
  }

  subscribePressHandlder(item) {

    this.props.checkActiveSubscription(item.id, this.props.user.user.id).then(res => {
      //console.log(res.data);
      if (res.status == 'success') {
        if (res.data.isActiveSubscription == 'Y') {
          showToast('You have already subscribed this product.', "danger")
        } else {
          showToast('Please ensure the quantity, once subscribed its not recommended to change', 'success');
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
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  FilterShowFunction() {
    this.setState({ isFilterVisible: !this.state.isFilterVisible });
  }

  FilterDetailShowFunction() {
    this.setState({ isFilterDetailVisible: !this.state.isFilterDetailVisible });
  }



  goFilterDetail() {
    this.setState({ isFilterVisible: !this.state.isFilterVisible });
    this.setState({ isFilterDetailVisible: !this.state.isFilterDetailVisible });
  }
  render() {

    //console.log('product', this.state.productData)
    const { navigation } = this.props;
    const getTitle = navigation.getParam("item");
    const categoryName = this.props.navigation.getParam("categoryName");
    return (
      <Container style={appStyles.container}>
        <Headers
          IconLeft="arrowleft"
          //onPress={() => this.openControlPanel()}
          onChangeSearchText={this.SearchFilterFunction.bind(this)}
          textValue={this.state.text}
          IconRightF="search"
          setCart={true}
          bgColor="transparent"
          //  setProFilter={true}
          // SortShow={this.SortShowFunction.bind(this)}
          // setSort={true}
          // FilterShow={this.FilterShowFunction.bind(this)}
          Title="My Wishlist"
          headersRight={{ width: 120 }}
        />
        <Content enableOnAndroid style={appStyles.content}>
          <Row style={appStyles.footers}>
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
          </Row>
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (<View>
            <ScrollView>
              <FlatList
              // horizontal
              // initialScrollIndex={this.state.flalistIndex}
              // onScrollToIndexFailed={()=>{}}
              // showsHorizontalScrollIndicator={false}
              // data={this.state.subCategory}
              //  renderItem={this.renderItems}
              //  keyExtractor={(item) => `${item.id}`}
              />
            </ScrollView>

            {this.state.productData.map((wishlist, index) => {
              // productList.map((item, index) => {
              var item = wishlist.item
              console.log("PRODUCT IS HERE", item)
              var foodType = '';
              // if(item.foodType == 'veg')
              //   foodType = '#00ff00';
              // if(item.foodType == 'Nonveg')
              //   foodType = 'red';
              // if(item.foodType == 'vegan')
              //   foodType = 'blue';

              return (
                <ListItem style={styles.ListItems} key={index}>


                  <Left style={styles.ListLeft}>

                    <TouchableOpacity
                      style={styles.prodInfo}
                      onPress={() =>
                        this.productDetail(item.id)
                      }
                    >
                      <Text>{ }</Text>
                      <Image
                        style={styles.proImage}
                        source={{ uri: url.imageURL + item.itemImage }}
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
                          <Image style={[appStyles.vegImage, { marginTop: 2 }]}
                            source={item.foodType == 'veg' ? imgs.smallVeg : imgs.smallNonVeg} />
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
                          <TouchableOpacity
                            onPress={() =>
                              this.subscribePressHandlder(item)
                            }
                          >
                            <ImageBackground source={imgs.AEDpng} style={[styles.subscribeBtn, {}]}>

                              <Text style={styles.subText}>
                                {item.price}
                              </Text>
                            </ImageBackground>
                          </TouchableOpacity>
                        ) : (
                            <View style={{ padding: 0, margin: 0 }}></View>
                          )}

                        {this.state.selctedProduct == item.id ? <ActivityIndicator style={{ marginRight: 20 }} /> :
                          (<View>

                            <TouchableOpacity
                              onPress={() => this.removedwishlist(wishlist.id)}
                              style={{ flexDirection: 'row' }}>
                              <Fontisto name="shopping-basket-remove" size={24} color="red" />
                              <Text style={styles.outofstock}>Remove</Text>


                            </TouchableOpacity>
                          </View>)}
                      </View>)}
                  </Right>
                </ListItem>
              );
            })}
            {this.state.productData.length == 0 ? <View style={[appStyles.spinner, appStyles.norecordfound]}><Text>No Product Found</Text></View> : null}
          </View>
            )}


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
                  {this.state.SortinType == data.SortinType ?

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
                      <Col style={[styles.btn, { flex: 0, justifyContent: 'center', width: 50 }]} onPress={() => { this.setState({ SortinType: data.SortinType }) }} >
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
        <Modal style={appStyles.SortModal} isVisible={this.state.isFilterVisible} hasBackdrop={true}
          backdropColor={'#333'} backdropOpacity={0.3} >
          <View style={appStyles.bottmFilterMain}>

            <View style={appStyles.bottomFilterInner}>
              <TouchableOpacity onPress={() => this.FilterShowFunction()} style={appStyles.closeBtnArea} >
                <Icon name="closecircleo" type="AntDesign" style={appStyles.closeBtn} />
              </TouchableOpacity>
              <List style={appStyles.filterList} >
                {FilterCat.map((data, key) => {
                  return (<ListItem style={appStyles.ListItemsFilter} key={key}>


                    <Left style={{ marginLeft: 10 }}>
                      <TouchableOpacity onPress={() => this.goFilterDetail()}>
                        <Text style={appStyles.SortingText}>{data.FilterType}</Text>
                      </TouchableOpacity>
                    </Left>
                    <Right style={{ marginRight: 10 }}>
                      <TouchableOpacity>
                        <Icon style={styles.img} name='angle-right' type='FontAwesome' />
                      </TouchableOpacity>
                    </Right>




                  </ListItem>
                  )
                })}
              </List>
              <Grid style={appStyles.ApplyButtonSection}>
                <Row>
                  <Col>
                    <TouchableOpacity style={appStyles.applyFilter}><Text style={appStyles.applyFilterText}>Apply</Text></TouchableOpacity>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    productItemList: (categoryId, subCategoryId, userId) =>
      dispatch(userActions.showProductList({ subCategoryId: subCategoryId, categoryId: categoryId, userId: userId })),
    getproductItemList: (categoryId, subCategoryId, userId) =>
      dispatch(userActions.getProductList({ subCategoryId: subCategoryId, categoryId: categoryId, userId: userId })),
    fetchSubCategory: (categoryId) =>
      dispatch(userActions.fetchSubCategory({ categoryId: categoryId })),
    searchItem: (searchString) =>
      dispatch(productActions.searchItem({ searchString: searchString })),
    productDetail: (id, userId) =>
      dispatch(productActions.productDetail({ itemId: id, userId: userId })),
    viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
    addToCartItem: (userId, itemId, quantity) => dispatch(cartActions.addToCartItem({ userId: userId, itemId: itemId, quantity: quantity })),
    updateCartItem: (userId, itemId, quantity) => dispatch(cartActions.updateCartItem({ userId: userId, itemId: itemId, quantity: quantity })),
    deleteCartItem: (itemId, userId) => dispatch(cartActions.deleteCartItem({ itemId: itemId, userId: userId })),
    checkActiveSubscription: (itemId, userId) => dispatch(userActions.checkActiveSubscription({ itemId: itemId, userId: userId })),

    fetchwishlist: (userId) =>
      dispatch(productActions.fetchwishlist({ userId: userId })),

    removewishlist: (itemid) =>
      dispatch(productActions.deltowishlist({ id: itemid })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyWishlist);
