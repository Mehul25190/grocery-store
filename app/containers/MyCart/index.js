import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, ScrollView, FlatList, ActivityIndicator, Modal} from 'react-native'
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Footer, Title, Right,Card,Grid,Col,Row,ListItem,FooterTab
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as cartActions from "../../actions/cart";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import NumericInput from 'react-native-numeric-input';
import url from "../../config/api";
import { showToast } from '../../utils/common';
import { ScreenLoader } from '../../components';


class MyCart extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
      time: '',
      cartItem: [],
      userAddressDtls: {},
      loading: false,
    };

  }
   componentDidMount() {
    this.getCartDetail();

    var that = this;
    var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date().getDate(); //Current Date
      var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
   var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    that.setState({
      //Setting the value of the date time
      date:   date + ' ' + month + ' ' + year ,
      time:   hours + ':' + min 
    });
  }

  getCartDetail(){
    this.props.viewCart(this.props.user.user.id).then(res => {
      console.log(res.data)
      if(res.status == 'success'){
          this.setState({userAddressDtls: res.data.userAddressDtls})
      }else{
        showToast("No cart detail found", "danger");
        this.props.navigation.navigate(Screens.Home.route)
      }
    })

  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

updateCartPress(id, itemId, value){

  //this.setState({loading: true}); 
  if(value == 0){
    this.props.deleteCartItem(id).then(res => {
      if(res.status == "success"){
        this.props.viewCart(this.props.user.user.id).then(res => {
            showToast('Cart updated successfully.', "success")
            //this.setState({loading: false});
        }) 
      }
      
    })
  }else if(value > 0){
    this.props.updateCartItem(this.props.user.user.id, itemId, value).then(res => {
      if(res.status == "success"){
        this.props.viewCart(this.props.user.user.id).then(res => {
          showToast('Cart updated successfully.', "success");
          //this.setState({loading: false});
        })
      }
      
    })
  }
}

  renderItems = ({ item, index }) => {
    if(item.isSubscribedItem == 1) return;
    return (
    <Row style={styles.secondRow}>
                    <Col style={styles.amulCol}>
                      <Image
                        style={styles.amulMoti}
                        source={{ uri: url.imageURL + item.imagePath }}
                      />
                    </Col>
                    <Col style={styles.amulInfo}>
                      <View>
                       <Text style={styles.AmuText}>{item.brandName}</Text>
                       <Text style={[styles.AmuText,styles.AmuTextTitle]}>{item.itemName}</Text>
                       <Text style={styles.AmuText}>{item.weight} {item.uom}</Text>
                       <Text style={styles.AmuText}></Text>   
                       {item.discountedPrice > 0 && item.discountedPrice < item.itemPrice  ? (
                            <Text style={styles.AmuText}>MRP: 
                              <Text style={[styles.proPriceStrike, styles.AmuText]}>
                                <Text style={{color:Colors.gray}}>{'\u20B9'}</Text>{" "}
                                {item.itemPrice}
                              </Text>
                              <Text style={styles.AmuText}>
                                {" "}<Text style={{color:Colors.gray}}>{'\u20B9'}</Text>{" "}
                                {item.discountedPrice}
                              </Text>
                            </Text>
                          ) : (
                            <Text style={styles.AmuText}>MRP: 
                              <Text style={styles.AmuText}>
                                <Text style={{color:Colors.gray}}>{'\u20B9'}</Text>{" "}
                                {item.itemPrice}
                              </Text>
                            </Text>
                          )}
                      </View>

                    </Col>
                   <Col style={styles.QtyBox}>
                      <View>
                        <NumericInput 
                         inputStyle={{fontSize:13}}
                            initValue={item.quantity}
                            //value={item.quantity} 
                            onChange={(value) => this.updateCartPress(item.id, item.itemId, value)}
                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                            totalWidth={90} 
                            totalHeight={20} 
                            iconSize={10}
                            borderColor={Colors.primary}
                            step={1}
                            valueType='real'
                            rounded 
                            textColor={Colors.primary}
                            iconStyle={{ color: Colors.primary,fontSize:13 }} 
                            rightButtonBackgroundColor='#fff' 
                            leftButtonBackgroundColor='#fff'
                          />
                      </View> 
                    </Col>
                  </Row>);
  }

  render(){
    const { navigation, totalItem, cartDetail, totalAmount } = this.props;
    const getItem = navigation.getParam('item');
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='My Cart'
            />
    
       <ScrollView> 
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (<View>  
                <TouchableOpacity style={styles.clickBtn} onPress={()=>this.props.navigation.navigate(Screens.MyPayments.route)}>
                  <Text style={styles.textPayMode}>Kindly add payment mode <Icon style={styles.pointer} name='hand-pointer-o' type='FontAwesome' /> CLICK HERE</Text>
                </TouchableOpacity>
             
               <Card style={[appStyles.addBox,styles.deliveryAddress]}>
             
                <ListItem  noBorder icon style={{ marginLeft: Layout.indent,}}>
                      <Left >
                        <Icon name="location-on" 
                         type="MaterialIcons"
                         
                          style={[appStyles.IconStyle,styles.addressIcon]}
                          />
                      </Left>
                      <Body>
                        <Text style={[appStyles.userArea,styles.addressText]} >{this.state.userAddressDtls.aptNo}, {this.state.userAddressDtls.buildingName},</Text>
                        <Text style={[appStyles.userCity,styles.addressText]} >{this.state.userAddressDtls.city} - {this.state.userAddressDtls.state},</Text>
                       
                      </Body>

                      <Right>
                       <TouchableOpacity  onPress={()=>this.props.navigation.navigate(Screens.MyAddress.route)}>
                        <Icon name="edit" type="MaterialIcons"
                       
                          style={[appStyles.IconStyle,styles.addressIcon]}
                          />
                      </TouchableOpacity>
                      </Right>
                    </ListItem>
                
            
                </Card>
               <Grid style={{marginRight:Layout.indent}}>
                <Row style={{marginVertical:10}}>
                  {/*<Col style={{justifyContent:'center',alignItems:'flex-start',}}>
                   <Text style={styles.title}>Delivery Date </Text>
                  </Col>
                  <Col style={{justifyContent:'center',alignItems:'flex-end'}}>
                   <Text style={styles.txtDate}>{this.state.date}, Friday </Text>
                  </Col>*/}
                </Row>
                <Row>
                  <Col>
                  <Text style={styles.title}>{totalItem} Cart Items </Text>
                  </Col>
                  <Col style={{justifyContent:'center',alignItems:'flex-end'}}>
                    <View style={styles.totalAmount}>
                      <Text style={styles.totalText}>Total Amount <Text style={{fontFamily:'Roboto',color:Colors.white}}>{'\u20B9'}</Text><Text style={styles.Amount}>{totalAmount}</Text></Text>
                     </View> 
                  </Col>
                </Row>
               </Grid>
               
              
                
                {cartDetail.length > 0 ?
                  (
                  <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
                  <Grid >
                  <FlatList
                       vertical
                       showsHorizontalScrollIndicator={false}
                       data={cartDetail}
                       renderItem={this.renderItems}
                       keyExtractor={(item) => `${item.id}`}
                     />
                   
                  </Grid>
                </Card>) : null }
            </View>)}
        </ScrollView> 
         <ScreenLoader loading={this.state.loading}/>
        <Footer style={styles.BottomView}>
           <Grid>
              <Col style={styles.footerCol}>
                 <View><Text style={styles.footerTitle}>Wallet</Text></View>
                 <View style={{textAlign:'center'}}><Text style={styles.footerAmount}>
                 <Text style={{fontFamily:'Roboto',color:Colors.primary}}>{'\u20B9'}</Text> 100</Text></View>
              </Col>
            <Col style={styles.footerCol}>
                <View><Text style={styles.footerTitle}>Savings</Text></View>
                 <View><Text style={styles.footerAmount}>
                 <Text style={{fontFamily:'Roboto',color:Colors.primary}}>{'\u20B9'}</Text> 10</Text></View>
              </Col>
            <Col style={[styles.footerCol,{borderRightWidth:0}]}>
                <TouchableOpacity style={styles.orderSummary} onPress={()=>this.props.navigation.navigate(Screens.Checkout.route)}>
                     <Text style={styles.textSummary}>Order Summary</Text>
                </TouchableOpacity>
              </Col>
           </Grid>
       </Footer>

    
        
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    //isLoading: state.common.isLoading,
    user: state.auth.user,
    totalItem: state.cart.totalItem,
    cartDetail: state.cart.cartDetail,
    totalAmount: state.cart.totalAmount,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()), 
      viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
      addToCartItem: (userId, itemId, quantity) => dispatch(cartActions.addToCartItem({ userId:userId, itemId:itemId, quantity:quantity  })),
      updateCartItem: (userId, itemId, quantity) => dispatch(cartActions.updateCartItem({ userId:userId, itemId:itemId, quantity:quantity  })),
      deleteCartItem: (id) => dispatch(cartActions.deleteCartItem({ id:id })),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyCart);