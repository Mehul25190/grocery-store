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
  Icon,
  Item,
  Spinner, 
  Input,
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
import { ScreenLoader } from '../../components';

class SearchProduct extends React.Component {
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
    this.productItemList( this.props.navigation.getParam('text'));
  }




  productItemList(text) {
    this.setState({text: text})
    this.props
      .searchItem(text)
      .then((res) => {
        if (res.status == "success") {
            this.setState({ productData: res.data.itemList });
            this.courseFilterArr = res.data.itemList;   
        } else {
          showToast("Something wrong with Server response", "danger");
        }
      })
      .catch((error) => {
        showToast("Error messages returned from server", "danger");
      });

      //this.refs.flatListRef.scrollToIndex({animated: true,index:5})
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

  var array = [...this.state.buyOndeSelected]; // make a separate copy of the array
  var index = array.indexOf(productId)
  if (index !== -1 && value == 0) {
    array.splice(index, 1);
    this.setState({buyOndeSelected: array});
  }else{
    array.push(productId)
    this.setState({buyOndeSelected: array});
  }

    //this.setState({value: value})
  }
  subscribePressHandlder(item){
    showToast('Please ensure the quanity, once subscribed its not recommened to change', 'success');
    this.props.navigation.navigate(
      Screens.SubscribeOrder.route,
      { item: item , qty: this.state.value}
    )
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
        <Button transparent style={appStyles.menuBtn}  onPress={() => this.props.navigation.navigate(Screens.Home.route)}>
          <Icon style={appStyles.menuBar}  type="AntDesign" size={30} color={Colors.white} name="arrowleft" />
        </Button>
      </Left>
   
      <Item style={[appStyles.searchBar]} >
        <Icon name="search" style={{color:Colors.primary}} />
         <Input style={appStyles.searchInput}  value={this.state.text} onChangeText={text => 
            {
              this.setState({text:text});
              setTimeout(() => { this.productItemList(this.state.text) }, 3000)
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
        <Content enableOnAndroid style={appStyles.content}>
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (<View>
              {this.state.productData.map((item, index) => {
                // productList.map((item, index) => {
                return (
                  <ListItem style={styles.ListItems}  key={index}>
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
                        
                      </View>
                      <View>
                        {item.isSubscribable ? (
                          <ImageBackground source={imgs.AEDpng}  style={[styles.subscribeBtn,{}]}>
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
                         {this.state.buyOndeSelected.indexOf(item.id) != -1 ?
                          null : 
                          ( <TouchableOpacity
                            onPress={() =>
                              this.buyOncePressHnadler(item.id, 1)
                            }
                          >
                           <Image source={imgs.addPlus} style={styles.buyButton} />
                          </TouchableOpacity>)}
                        {this.state.buyOndeSelected.indexOf(item.id) != -1 ?
                          (<NumericInput
                            initValue={1}
                            //value={this.state.buyOndeSelected.indexOf(item.id) != -1 ? 1 : null }
                            onChange={(value) => this.buyOncePressHnadler(item.id, value)}
                            onLimitReached={(isMax, msg) =>
                              console.log(isMax, msg)
                            }
                            minValue={0}
                            totalWidth={90}
                            totalHeight={20}
                            iconSize={30}
                            borderColor={Colors.primary}
                            inputStyle={{ fontSize: 13 }}
                            step={1}
                            valueType="real"
                            rounded
                            textColor={Colors.primary}
                            iconStyle={{ color: Colors.primary, fontSize: 14 }}
                            rightButtonBackgroundColor="#fff"
                            leftButtonBackgroundColor="#fff"
                          />)
                          : null }
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
    totalItem: state.cart.totalItem,

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
    addToCartItem: (userId, itemId, quantity) => dispatch(cartActions.addToCartItem({ userId:userId, itemId:itemId, quantity:quantity  })),
    updateCartItem: (userId, itemId, quantity) => dispatch(cartActions.updateCartItem({ userId:userId, itemId:itemId, quantity:quantity  })),
    deleteCartItem: (itemId, userId) => dispatch(cartActions.deleteCartItem({ itemId: itemId, userId:userId })),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
