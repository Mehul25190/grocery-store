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
import url from '../../config/api';


class AddedCardPayment extends React.Component {

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

    continueShopping(){
      this.props.viewCart(this.props.user.user.id);
      this.props.navigation.navigate(Screens.Home.route)
    }
  render(){
    const {navigation, totalItem} = this.props;
    const cardId = navigation.getParam('cardId')
    const cvv = navigation.getParam('cvv')
    const userId = navigation.getParam('userId')
    const userAddressDtlsId = navigation.getParam('userAddressDtlsId')
    const deliverySlot = navigation.getParam('deliverySlot')
    const deliveryDate = navigation.getParam('deliveryDate')
    const amount = navigation.getParam('amount')
    const paymentMode = navigation.getParam('paymentMode')
    const useWallet = navigation.getParam('useWallet')
    console.log(url.paymentURL + '/placeOrder.php?cardId=cardId&cvv=cvv&userId='+userId+'&userAddressDtlsId='+userAddressDtlsId+'&deliverySlot='+deliverySlot+'&deliveryDate=%27'+deliveryDate+'%27&amount='+amount+'&paymentMode=%27'+paymentMode+'%27&useWallet=%27'+useWallet)
    return (
      <Container style={appStyles.container}>
           <Header searchBar rounded style={appStyles.headerStyle}>
      

   
      <Item style={{ width: 60, backgroundColor: "transparent", left:15 }}>
        <Text style={appStyles.headerTitle}>Order Payment</Text>
      </Item>
     
      <Right style={appStyles.headerRight}>
         {/*<Button transparent>
         <TouchableOpacity style={appStyles.cartIconArea} onPress={()=> totalItem > 0 ? this.props.navigation.navigate(Screens.MyCart.route) : ''}>
           <Icon style={appStyles.cartIcon} name="cart" />
           { totalItem >0 && (<Text style={appStyles.cartCount}>{totalItem}</Text>) }
          </TouchableOpacity>
        </Button>*/}
      </Right>
   
     
   </Header>
          <Content enableOnAndroid>

{/* ---------------------------------Credit / Debit Card----------------------------------*/}

         <ScrollView style={{marginLeft:Layout.indent, marginRight:Layout.indent}}>
                  <WebView
                    source={{
                      uri: url.paymentURL + '/placeOrder.php?cardId='+cardId+'&cvv='+cvv+'&userId='+userId+'&userAddressDtlsId='+userAddressDtlsId+'&deliverySlot='+deliverySlot+'&deliveryDate=%27'+deliveryDate+'%27&amount='+amount+'&paymentMode=%27'+paymentMode+'%27&useWallet=%27'+useWallet+'%27'
                    }}
                    style={{ marginTop: 0, width:Layout.window.width-30, height: Layout.window.height*0.9 }}
                  />
         
             </ScrollView>
             <TouchableOpacity style={[styles.continueShoppingBtnArea, {top:40, paddingBottom:50}]} >
            <Button primary full style={styles.checkOutBtn} onPress={()=> this.continueShopping()}>
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
      //resetCart: () => dispatch({ type: ActionTypes.RESETCARTSTATE }),
      viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(AddedCardPayment);