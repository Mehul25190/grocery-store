import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, ScrollView,FlatList, } from 'react-native'
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
  Header, Left, Body, Title, Right,Card,Grid,Row,Col,Tabs,Tab,ScrollableTab,Input,Item,ListItem,Picker,Switch,Radio
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import * as cartActions from "../../actions/cart";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CheckBox from 'react-native-check-box';
import {BankList,CardDetails,BankOptions} from '../data/data';
import { showToast } from '../../utils/common';
import moment from "moment";
import { WebView } from 'react-native-webview';


class OrderPayment extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
      //default value of the date time
      date: '',
      time: '',
      value: null ,
       switch1Value: props.user.user.useWallet == "Y" ? true : false,
       showMyCard:false,
       showAddCard:false,
        paywithcard: false,
        paywithcash: false,
        CardChecked:null,
         radioBtnsData: ['Pay with Card', 'Pay with Cash'],
    };
  }
    componentDidMount() {
      this.setState({
      //  checked:true
      });
    }
   
    openControlPanel(){
      alert('test');
    }
  render(){
    const {navigation, totalItem} = this.props;
    const userId = navigation.getParam('userId')
    const userAddressDtlsId = navigation.getParam('userAddressDtlsId')
    const deliverySlot = navigation.getParam('deliverySlot')
    const deliveryDate = navigation.getParam('deliveryDate')
    const paymentMode = navigation.getParam('paymentMode')
    const useWallet = navigation.getParam('useWallet')

    return (
      <Container style={appStyles.container}>
           <Header searchBar rounded style={appStyles.headerStyle}>
      
      <Left style={appStyles.headerLeft}>
        <Button transparent style={appStyles.menuBtn}  onPress={() => this.props.navigation.navigate(Screens.Home.route)}>
          <Icon style={appStyles.menuBar}  type="AntDesign" size={30} color={Colors.white} name="arrowleft" />
        </Button>
      </Left>
   
      <Item style={{ width: 60, backgroundColor: "transparent" }}>
        <Text style={appStyles.headerTitle}>Order Payment</Text>
      </Item>
     
      <Right style={appStyles.headerRight}>
         <Button transparent>
         <TouchableOpacity style={appStyles.cartIconArea} onPress={()=> totalItem > 0 ? this.props.navigation.navigate(Screens.MyCart.route) : ''}>
           <Icon style={appStyles.cartIcon} name="cart" />
           { totalItem >0 && (<Text style={appStyles.cartCount}>{totalItem}</Text>) }
          </TouchableOpacity>
        </Button>
      </Right>
   
     
   </Header>
          <Content enableOnAndroid>
         
{/* ---------------------------------Credit / Debit Card----------------------------------*/}

         <ScrollView style={{marginLeft:Layout.indent, marginRight:Layout.indent}}>
                  <WebView
                    source={{
                      uri: 'http://dev.tieskills.com/payment/payment.php?userId=userId&userAddressDtlsId=userAddressDtlsId&deliverySlot=deliverySlot&deliveryDate=deliveryDate&paymentMode=paymentMode&useWallet=useWallet'
                    }}
                    style={{ marginTop: 20, width:Layout.window.width, height: Layout.window.height * 0.5 }}
                  />
         
             </ScrollView>
            
          </Content>
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  //console.log(state.auth.user);
  return {
    user: state.auth.user,
    totalItem: state.cart.totalItem,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      placeholder: (user_id, addressId, slotId, deliveryDate, paymentMode, useWallet, deliveryCharges, subscriptionFees) => dispatch(cartActions.placeOrder({ userId:user_id, userAddressDtlsId:addressId, deliverySlot:slotId, deliveryDate:deliveryDate, paymentMode:paymentMode, useWallet:useWallet, deliveryCharges:deliveryCharges, subscriptionFees:subscriptionFees })),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(OrderPayment);