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
      paymentIframe: '', 
    };
  }
    componentDidMount() {

      this.focusListener = this.props.navigation.addListener("willFocus", () => {
        console.log('willl focus')
        const {navigation, totalItem} = this.props;
        const html = navigation.getParam('html')
        console.log('html', html);
        this.setState({ paymentIframe:html });
      });
      
    }

    componentWillUnmount(){
      this.focusListener.remove();
    }
   
  render(){
    const {navigation, totalItem} = this.props;
    console.log('this.state.paymentIframe', this.state.paymentIframe)
    //console.log('http://dev.tieskills.com/foodapp/payment.php?userId='+userId+'&userAddressDtlsId='+userAddressDtlsId+'&deliverySlot='+deliverySlot+'&deliveryDate='+deliveryDate+'&amount='+100+'&paymentMode='+paymentMode+'&useWallet='+useWallet+'&saveCard='+saveCard+'&autoDebit='+autoDebit)
    //console.log('http://dev.tieskills.com/foodapp/payment.php?userId='+userId+'&userAddressDtlsId='+userAddressDtlsId+'&deliverySlot='+deliverySlot+'&deliveryDate=%27'+deliveryDate+'%27&amount='+amount+'&paymentMode=%27'+paymentMode+'%27&useWallet=%27'+useWallet+'%27&saveCard=%27'+saveCard+'%27&autoDebit=%27'+autoDebit)
    return (
      <Container style={appStyles.container}>
           <Header searchBar rounded style={appStyles.headerStyle}>
      
      <Left style={appStyles.headerLeft}>
        
      </Left>
   
      <Item style={{ width: 60, backgroundColor: "transparent" }}>
        <Text style={appStyles.headerTitle}>Wallet 111 Payment</Text>
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
                            originWhitelist={['*']}

                    source={{ html: this.state.paymentIframe}}
                    style={{ marginTop: 0, width:Layout.window.width-30, height: Layout.window.height*0.9 }}
                  />
         
             </ScrollView>
             <TouchableOpacity style={styles.continueShoppingBtnArea} >
            <Button primary full style={styles.checkOutBtn} onPress={()=>this.props.navigation.navigate(Screens.Home.route)}>
                <Text style={styles.checkOutText}>Continue shopping</Text>
             </Button>
          </TouchableOpacity>
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