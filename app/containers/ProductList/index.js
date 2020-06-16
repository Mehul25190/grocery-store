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
import appStyles from "../../theme/appStyles";
import styles from "./styles";
import NumericInput from "react-native-numeric-input";

let gm = "gm";
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
    };
    this.courseFilterArr = [];
    this.currentIndex = 0;
    //console.log('here----->', this.props.navigation.getParam('para_categoryId'));
  }

  componentDidMount() {
    this.setState({
      dataSource: productList,
      value: 1,
      //categoryId:this.props.navigation.getParam('para_categoryId'),
    });
    //alert(this.state.categoryId);
    //get product list default base on category selected
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.setState({ selectSubCat: null, text: '' });
      this.productItemList();
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
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      productData: newData,
      text: text,
    });
  }

  subCategoryList() {
    console.log(this.categoryId);
    this.props
      .fetchSubCategory(this.props.navigation.getParam("para_categoryId"))
      .then((res) => {
        console.log("sucess return", res.data.subCategory);
        if (res.status == "success") {
          this.setState({ subCategory: res.data.subCategory });
          //console.log('set return');
          //console.log(res.data.itemList);
        } else {
          console.log("something wrong with varification call");
          showToast("Something wrong with Server response", "danger");
        }
      });
  }

  subBySubCategoryList(catId, catName, index) {
    console.log(index)
    console.log(this.state.subCategory.length)
    //this.setState({flalistIndex: index});
    //this.currentIndex = this.state.subCategory.length - 3 > index ? index : '';
    this.props
      .searchItem(catName)
      .then((res) => {
        //console.log('sucess return');
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

  productItemList() {
    this.props
      .productItemList(this.props.navigation.getParam("para_categoryId"))
      .then((res) => {
        //console.log('sucess return');
        if (res.status == "success") {
          this.setState({ productData: res.data.itemList });
          this.courseFilterArr= res.data.itemList;
        } else {
          showToast("Something wrong with Server response", "danger");
        }
      })
      .catch((error) => {
        showToast("Error messages returned from server", "danger");
      });
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
    <TouchableOpacity onPress={() => this.subBySubCategoryList(item.id,item.subCategoryName, index)}>
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

  render() {
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
                  initialScrollIndex={this.currentIndex}
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
                        <Text style={styles.proTitle}>{item.itemName}</Text>

                        <Text style={styles.proQuanitty} note>
                          {item.quantity} pc &nbsp;
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
                          {item.discountedPrice > 0 ? (
                            <View style={{ flexDirection: "row" }}>
                              <Text style={styles.proPriceStrike}>
                                <Text
                                  style={(appStyles.currency, { fontSize: 18 })}
                                >
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
                        <NumericInput
                          value={this.state.value}
                          onChange={(value) => this.setState({ value })}
                          onLimitReached={(isMax, msg) =>
                            console.log(isMax, msg)
                          }
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
                        />
                      </View>
                      <View>
                        {item.isSubscribable ? (
                          <Button style={styles.subscribeBtn}>
                            <TouchableOpacity
                              onPress={() =>
                                this.props.navigation.navigate(
                                  Screens.SubscribeOrder.route,
                                  { item: item , mode: 'save'}
                                )
                              }
                            >
                              <Text style={styles.subText}>
                                Subscribe@{"\u20B9"}{item.price}
                              </Text>
                            </TouchableOpacity>
                          </Button>
                        ) : (
                          <View style={{ padding: 0, margin: 0 }}></View>
                        )}
                        <Button style={styles.buyButton}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                Screens.MyCart.route
                              )
                            }
                          >
                            {index == 0 || index == 2 ? (
                              <Text style={styles.buyText}>Buy Once</Text>
                            ) : (
                              <Text style={styles.buyText}>Buy</Text>
                            )}
                          </TouchableOpacity>
                        </Button>
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
    productItemList: (categoryId) =>
      dispatch(userActions.showProductList({ categoryId: categoryId })),
    fetchSubCategory: (categoryId) =>
      dispatch(userActions.fetchSubCategory({ categoryId: categoryId })),
    searchItem: (searchString) =>
      dispatch(productActions.searchItem({ searchString: searchString })),
    productDetail: (id) => 
      dispatch(productActions.productDetail({ itemId: id })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
