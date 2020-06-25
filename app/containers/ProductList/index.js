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
  Spinner,
} from "native-base";
import url from "../../config/api";
import { ItemList } from "../data/data";
import { categoryList } from "../data/data";
import { filterList } from "../data/data";
import { productList } from "../data/data";
//import MasonryList from "react-native-masonry-list";
import { showToast } from '../../utils/common';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as productActions from "../../actions/product";
import * as cartActions from "../../actions/cart";
import appStyles from "../../theme/appStyles";
import styles from "./styles";
import NumericInput from "react-native-numeric-input";


class ProductList extends React.Component {
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
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({ selectSubCat: null, text: '' });
      this.subCategoryList();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  SearchFilterFunction(text) {
    console.log(this.courseFilterArr)
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
          if(res.data.subCategory.length > 0){
            this.setState({ subCategory: res.data.subCategory, selectSubCat: res.data.subCategory[0].id });
            this.productItemList(res.data.subCategory[0].categoryId, res.data.subCategory[0].id, 0);
          }else{
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

  subBySubCategoryList(catId, catName, index) {
    this.props
      .searchItem(catName)
      .then((res) => {
        if (res.status == "success") {
          if(res.data.itemList.length > 0){
            this.setState({ productData: res.data.itemList, selectSubCat: catId });
            this.courseFilterArr = res.data.itemList;         
          }else{
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
    this.currentIndex = index-1;
    //catId = this.props.navigation.getParam("para_categoryId") ? this.props.navigation.getParam("para_categoryId") : this.state.selectSubCat;
    this.setState({flalistIndex: index})
    this.props
      .productItemList(catId, subCatId)
      .then((res) => {
        console.log('sucess return', res.data.itemList);
        if (res.status == "success") {
          if(res.data.itemList.length > 0){
            this.setState({ productData: res.data.itemList, selectSubCat: subCatId });
            this.courseFilterArr = res.data.itemList;   

          }else{
            this.courseFilterArr = [];
            this.setState({ productData: [], selectSubCat: subCatId });
          }
        } else {
          showToast("Something wrong with Server response", "danger");
        }
      })
      .catch((error) => {
        showToast("Error messages returned from server", "danger");
      });

      //this.refs.flatListRef.scrollToIndex({animated: true,index:5})

    console.log(catId);
  }
  //func call when click item category
  _itemChoose(item) {
    //  alert(item.title);
  }
  _filterChoose(item) {}
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

  productDetail(id){
    this.props.productDetail(id).then(res => {
      console.log(res);
      if(res.status == "success"){
        if(res.data.item.length > 0){
          this.props.navigation.navigate(Screens.ProductDetail.route)
        }else{
          showToast('Product detail not found', 'danger');
        }
      }
    });
  }

  buyOncePressHnadler(productId, value){

   
  if(value == 0){
    
  }else if(value == 1){
    this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
      console.log(res);
      if(res.status == "success"){
        this.props.viewCart(this.props.user.user.id);
        showToast('Cart updated successfully.', "success")
      }
    })
  }else if(value > 1){
    this.props.addToCartItem(this.props.user.user.id, productId, value).then(res => {
      console.log(res);
      if(res.status == "success"){
        this.props.viewCart(this.props.user.user.id);
        showToast('Cart updated successfully.', "success")
      }
    })
  }

    console.log(productId, value)
      var array = [...this.state.buyOndeSelected]; // make a separate copy of the array
      var index = array.indexOf(productId)
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({buyOndeSelected: array});
      }else{
        array.push(productId)
        this.setState({buyOndeSelected: array});
      }

    //this.setState({value: value})
  }


  render() {

    console.log(this.state.buyOndeSelected)
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
          Title={categoryName}
        />
        <Content enableOnAndroid style={appStyles.content}>
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (
            <View>
              <ScrollView>
                <FlatList
                  horizontal
                  initialScrollIndex={this.state.flalistIndex}
                  onScrollToIndexFailed={()=>{}}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.subCategory}
                  renderItem={this.renderItems}
                  keyExtractor={(item) => `${item.id}`}
                />
              </ScrollView>

              {this.state.productData.map((item, index) => {
                // productList.map((item, index) => {
                return (
                  <ListItem style={styles.ListItems} noBorder key={index}>
                    <Left style={styles.ListLeft}>
                      <Image
                        style={styles.proImage}
                        source={{ uri: url.imageURL + item.imagePath }}
                      />
                    </Left>
                    <Body>
                      <TouchableOpacity
                        style={styles.prodInfo}
                        onPress={() =>
                          this.productDetail(item.id)
                        }
                      >
                        <Text style={styles.proTitle}>{item.brandName} - {item.itemName}</Text>

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
                          {item.discountedPrice > 0 && item.discountedPrice < item.price  ? (
                            <View style={{ flexDirection: "row" }}>
                              <Text style={styles.proPriceStrike}>
                                <Text style={(appStyles.currency, { fontSize: 18 })}>
                                  {"\u20B9"}
                                </Text>{" "}
                                {item.price}
                              </Text>
                              <Text style={styles.proPrice}>
                                <Text
                                  style={(appStyles.currency, { fontSize: 18 })}
                                >
                                  {"\u20B9"}
                                 </Text>{" "}
                                {item.discountedPrice}
                              </Text>
                            </View>
                          ) : (
                            <View>
                              <Text style={styles.proPrice}>
                                <Text
                                  style={(appStyles.currency, { fontSize: 18 })}
                                >
                                  {"\u20B9"}
                                </Text>{" "}
                                {item.price}
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </Body>
                    <Right style={styles.ListRight}>
                      <View>
                        {this.state.buyOndeSelected.indexOf(item.id) != -1 ?
                          (<NumericInput
                            initValue={1}
                            //value={this.state.buyOndeSelected.indexOf(item.id) != -1 ? 1 : null }
                            onChange={(value) => value == 0 ? this.buyOncePressHnadler(item.id, value) : ''}
                            onLimitReached={(isMax, msg) =>
                              console.log(isMax, msg)
                            }
                            minValue={0}
                            totalWidth={90}
                            totalHeight={20}
                            iconSize={30}
                            borderColor="#F8BB1B"
                            inputStyle={{ fontSize: 13 }}
                            step={1}
                            valueType="real"
                            rounded
                            textColor="#F8BB1B"
                            iconStyle={{ color: "#F8BB1B", fontSize: 14 }}
                            rightButtonBackgroundColor="#fff"
                            leftButtonBackgroundColor="#fff"
                          />)
                          : null }
                      </View>
                      <View>
                        {item.isSubscribable ? (
                          <Button style={styles.subscribeBtn}>
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate(
                                  Screens.SubscribeOrder.route,
                                  { item: item , qty: this.state.value}
                                )
                              }
                            >
                              <Text style={styles.subText}>
                                Subscribe@{"\u20B9"}{item.discountedPrice > 0 && item.discountedPrice < item.price ? item.discountedPrice : item.price}
                              </Text>
                            </TouchableOpacity>
                          </Button>
                        ) : (
                          <View style={{ padding: 0, margin: 0 }}></View>
                        )}
                         {this.state.buyOndeSelected.indexOf(item.id) != -1 ?
                          null : 
                          (<Button style={styles.buyButton}>
                          <TouchableOpacity
                            onPress={() =>
                              this.buyOncePressHnadler(item.id, 1)
                            }
                          >
                           
                         <Text style={styles.buyText}>Buy Once</Text>
                            
                          </TouchableOpacity>
                        </Button>)}
                      </View>
                    </Right>
                  </ListItem>
                );
              })}
              {this.state.productData.length == 0 ? <View style={[appStyles.spinner, appStyles.norecordfound]}><Text>No Product Found</Text></View> : null }
            </View>
          )}
        </Content>

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
    productItemList: (categoryId, subCategoryId) =>
      dispatch(userActions.showProductList({ subCategoryId: subCategoryId, categoryId: categoryId })),
    fetchSubCategory: (categoryId) =>
      dispatch(userActions.fetchSubCategory({ categoryId: categoryId })),
    searchItem: (searchString) =>
      dispatch(productActions.searchItem({ searchString: searchString })),
    productDetail: (id) => 
      dispatch(productActions.productDetail({ itemId: id })),
    viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
    addToCartItem: (userId, itemId, quantity) => dispatch(cartActions.updateCartItem({ userId:userId, itemId:itemId, quantity:quantity  })),
    updateCartItem: (id, qty) => dispatch(cartActions.updateCartItem({ id:id, quantity:qty  })),
    deleteCartItem: (id) => dispatch(cartActions.deleteCartItem({ id:id })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
