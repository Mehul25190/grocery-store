import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, ScrollView,FlatList, Alert, ActivityIndicator} from 'react-native'
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
//import { WebView } from 'react-native-webview';


class MyPayments extends React.Component {

  constructor(props) {
    super(props);
    //console.log(props.user.user);
      this.state = {
      //default value of the date time
      date: '',
      time: '',
      value: null ,
      switch1Value: (props.user.user.useWallet == "Y" && props.user.user.walletAmount > 0) ? true : false,
      showMyCard:false,
      showAddCard:false,
      paywithcard: false,
      paywithcash: false,
      CardChecked:null,
      CardCheckedId: "",
      radioBtnsData: ['Pay with Card', 'Pay with Cash'],
      cardList: [],  
      cvv:"",
      cardOption: true,
      promo: '',
      offerValue: 0,
      offerId: '',
      placeOrderLoading: false,
      isAutoDebit: '',
      applyPromoLoader: false,
    };
  }
    componentDidMount() {
      this.setState({
      //  checked:true
      });
    }
   openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }
     onValueChange(value: string) {
    this.setState({
      switch1Value: value
    });
  }
   toggleSwitch1= (value) =>{
      const orderTotal = (this.props.totalAmount + this.props.deliveryCharges).toFixed(2)
      let cardOption = false;
      if(value && this.props.walletAmount > orderTotal){
        cardOption = false;
        this.setState({paywithcard: false})
      }else if(value && this.props.walletAmount < orderTotal){
        cardOption = true;
      }else{
        cardOption = true;

      }

      if(!value){
        this.setState({paywithcard: true});
      }
      
      this.setState({
           switch1Value: value,
           showMyCard:cardOption,
           //paywithcard:cardOption,
           cardOption: cardOption, 
           //paywithcash:false
      });
  }

  getCardDetail(){
    this.props.fetchCardDetails(this.props.user.user.id).then(res => {
      //console.log('card', res.data.cardList);
      this.setState({cardList: res.data.cardList});
    });
  }
  ShowCardList(){
    this.getCardDetail();
    if(!this.state.paywithcard){
      showToast('Please select the payment method', "danger");
      return;
    }
    this.setState({
      showMyCard:true,
      showAddCard:false
    });
  }
  ShowAddCard(){
    if(!this.state.paywithcard){
      showToast('Please select the payment method', "danger");
      return;
    }

    const {navigation} = this.props;
    const selectedTimeSlot = navigation.getParam('timeslot');
    const dateslot = navigation.getParam('dateslot');
    const useWallet = this.state.switch1Value ? 'Y' : 'N';
    const paymentMode = this.state.paywithcash ? 'COD' : this.state.paywithcard ? 'CARD' : '' ;
    let amount = this.state.switch1Value ? (this.props.totalAmount + this.props.deliveryCharges - this.state.offerValue).toFixed(2) - this.props.walletAmount : (this.props.totalAmount + this.props.deliveryCharges -this.state.offerValue).toFixed(2)  ;
    const offerId = this.state.offerId;
    const offerValue = this.state.offerValue.toFixed(2);
    
    this.props.navigation.navigate(Screens.OrderPayment.route, {userId:this.props.user.user.id, userAddressDtlsId:this.props.deliveryAddress.id, deliverySlot:selectedTimeSlot, deliveryDate:moment(dateslot).format('YYYY/MM/DD'), amount: amount ,paymentMode:paymentMode, useWallet:useWallet, saveCard:'Y', autoDebit:'Y', offerId: offerId, offerValue: offerValue});

     this.setState({
      showMyCard:false,
      showAddCard:true
    });
  }

  placeOrder() {
  
    if(!this.state.switch1Value && !this.state.paywithcard && !this.state.paywithcash){
      showToast('Please select the payment method', "danger");
      return;
    }

    if(this.state.paywithcard && !this.state.showMyCard && !this.state.showAddCard){
      showToast('Please select the card option', "danger");
      return;
    }

    if(this.state.paywithcard && this.state.showMyCard && this.state.CardCheckedId == ""){
      showToast('Please select the card', "danger");
      return;
    }

    if(this.state.paywithcard && this.state.showMyCard && this.state.CardCheckedId != "" && this.state.isAutoDebit == "N" && this.state.cvv == ""){
      showToast('Please enter CVV', "danger");
      return;
    }

    if(this.props.walletAmount < (this.props.totalAmount + this.props.deliveryCharges) && !this.state.paywithcard && !this.state.paywithcash){
      showToast('Your wallet amount is not sufficent to place the order, please select card or cash option.', "danger");
      return;
    }
    this.setState({placeOrderLoading: true})
    const {navigation} = this.props;
    const selectedTimeSlot = navigation.getParam('timeslot');
    const dateslot = navigation.getParam('dateslot');
    const useWallet = this.state.switch1Value ? 'Y' : 'N';
    const paymentMode = this.state.paywithcash ? 'COD' : this.state.paywithcard ? 'CARD' : 'WALLET' ;
    let amount =     this.state.switch1Value ? (this.props.totalAmount + this.props.deliveryCharges).toFixed(2) - this.props.walletAmount : (this.props.totalAmount + this.props.deliveryCharges).toFixed(2)  ;
    amount = amount * 100;
    const offerId = this.state.offerId;
    const offerValue = this.state.offerValue.toFixed(2);
    //this.props.navigation.navigate(Screens.OrderPayment.route, {userId:this.props.user.user.id, userAddressDtlsId:this.props.deliveryAddress.id, deliverySlot:selectedTimeSlot, deliveryDate:moment(dateslot).format('YYYY/MM/DD'), paymentMode:paymentMode, useWallet:useWallet, deliveryCharges:'', subscriptionFees:''});
    //this.state.CardCheckedId
    if(this.state.paywithcard && this.state.showMyCard){
      this.props.placeOrderWithCard(this.props.user.user.id, this.props.deliveryAddress.id, selectedTimeSlot, moment(dateslot).format('YYYY-MM-DD'), paymentMode, useWallet, this.state.CardCheckedId, amount, this.state.cvv, offerId, offerValue).then(res => {
        if(res.status == 'success'){  
          console.log('response', res);
          if(res.data.isAutoDebit == 'N'){
            const temp_html = res.data.html;
            const temp = temp_html.replace(/\\/g, "");
            console.log("------------");
            //console.log(temp);
            this.props.navigation.navigate(Screens.CardOrderPayment.route, {html:temp});
          }else{
            this.props.navigation.navigate(Screens.OrderSuccess.route, {orderNumber: res.data.orderNumber});
          }
        }else{
          if(res.message)
            showToast(res.message, "danger");
          else
            showToast("Some technical issue found, please contact to support.", "danger");
        }
        this.setState({placeOrderLoading: false})
      })
    }else{
      this.props.placeholder(this.props.user.user.id, this.props.deliveryAddress.id, selectedTimeSlot, moment(dateslot).format('YYYY/MM/DD'), paymentMode, useWallet, offerId, offerValue).then(res => {
        if(res.status == 'success'){
          this.props.navigation.navigate(Screens.OrderSuccess.route, {orderNumber: res.data.orderNumber});
        }else{
          if(res.message)
            showToast(res.message, "danger");
          else
            showToast("Some technical issue found, please contact to support.", "danger");
        }
        this.setState({placeOrderLoading: false})
      })
    }
    //this.setState({placeOrderLoading: false})
  }

  processDeleteCard(id){
    this.props.deleteCard(this.props.user.user.id, id).then(res => {
      //console.log(res);
      if(res.status == 'success'){
        this.getCardDetail();
        showToast("Card deleted successfully", "success");
      }
    });
  }

  deleteCard(id){
    Alert.alert(
      "Delete Card",
      "Are you sure you want to delete the card?",
      [
        
        {
          text: "No",
        },
        { text: "Yes", onPress: () => this.processDeleteCard(id)}
      ],
      { cancelable: false }
    );
  

  }

  selectCard(index, id, autoDebit){
    this.setState({CardChecked:index, CardCheckedId: id, cvv: "", isAutoDebit: autoDebit})
  }

  applyPromo(){
    this.setState({offerId: '' , offerValue: 0})
    if(this.state.promo == ''){
      showToast('Please enter promo code', 'danger');
      return;
    }else{
      this.setState({applyPromoLoader: true})
      this.props.applyUserOffer(this.state.promo, this.props.user.user.id).then(res => {
        //console.log(res);
        if(res.status == 'success'){
          showToast(res.message, 'success');
          this.setState({offerId: res.data.offerId , offerValue: res.data.offerValue})

        }else if(res.status == 'failure'){
          showToast(res.message, 'danger');
        }else{
          showToast(res.message, 'danger');
        }
        this.setState({applyPromoLoader: false})

      })

    }
  }

  render(){
    const {navigation, user, totalAmount, deliveryCharges, actualTotal, viewCartDetail, walletAmount} = this.props;
    const getTab = navigation.getParam('item')
    const applyDeliveryCharge = navigation.getParam('applyDeliveryCharge')
    
    return (
      <Container style={appStyles.container}>
            <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={false}
              bgColor='transparent'
              Title='Payment'
            />
          <Content enableOnAndroid>
         
{/* ---------------------------------Credit / Debit Card----------------------------------*/}

         <ScrollView style={{marginLeft:Layout.indent, marginRight:Layout.indent}}>
            <Grid style={{borderBottomWidth:1,marginTop:15, paddingBottom:15, borderColor:'#ddd'}}>
              <Row>
                <Col>
                  <Text style={styles.testStyles}>Total Order Value</Text>
                </Col>
               <Col style={{flex:0, width:100, justifyContent:'flex-end',alignItems:'flex-end'}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currencysmall}>{Colors.CUR}</Text> <Text style={appStyles.amountsmall}>{totalAmount.toFixed(2)}</Text></Text>
               </Col>
              </Row>
               <Row>
                <Col style={{}}>
                    <Text style={styles.testStyles}>{applyDeliveryCharge ? 'Delivery Charges' : 'Subscription Fees' }</Text>
                </Col>
                <Col style={{flex:0, width:100, justifyContent:'flex-end',alignItems:'flex-end'}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currencysmall}>{Colors.CUR}</Text> <Text style={appStyles.amountsmall}>{deliveryCharges.toFixed(2)}</Text></Text>
               </Col>
              </Row>
              {this.state.offerValue > 0 ?
               (<Row>
                <Col style={{}}>
                    <Text style={styles.testStyles}>Discount</Text>
                </Col>
                <Col style={{flex:0, width:100, justifyContent:'flex-end',alignItems:'flex-end'}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currencysmall}>{Colors.CUR}</Text> <Text style={appStyles.amountsmall}>{this.state.offerValue.toFixed(2)}</Text></Text>
               </Col>
              </Row>) : null }
            </Grid>
            <Grid style={{paddingTop:15,marginBottom:5}}>
              <Row>
                <Col>
                  <Text style={styles.testStyles}>Total Amount Payable </Text>
                </Col>
               <Col style={{flex:0, width:100, justifyContent:'flex-end',alignItems:'flex-end'}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currencysmall}>{Colors.CUR}</Text> <Text style={appStyles.amountsmall}>{(totalAmount + deliveryCharges - this.state.offerValue).toFixed(2)}</Text></Text>
               </Col>
              </Row>
               <Row>
                <Col>
                  <Text style={[styles.testStyles,{color:Colors.primary}]}>Your Savings with this order</Text>
                </Col>
                <Col style={{flex:0, width:100, justifyContent:'flex-end',alignItems:'flex-end'}}>
                 <Text style={[styles.testStyles,{color:Colors.primary}]}><Text style={[appStyles.currencysmall,{color:Colors.primary}]}>{Colors.CUR}</Text> <Text style={appStyles.amountsmall}>{(actualTotal - totalAmount).toFixed(2)}</Text></Text>
               </Col>
              </Row>
            </Grid>

            <View style={{ marginTop:10, marginBottom:10, borderTopWidth:1, borderBottomWidth:1, borderColor:Colors.secondary, paddingBottom:20,}}>
              <View style={{marginTop:10}}>
                <Text style={styles.titleText}>Have a promo code? </Text>
             </View>
             <Row>
                <Col>
                  <Input style={{height:35, borderColor:'#cccccc', borderWidth:1}} onChangeText={(value) => {this.setState({promo:value})}} />
                </Col>
               <Col style={{flex:0, width:120, justifyContent:'center',alignItems:'center'}}>
                  <TouchableOpacity style={styles.promoBtnArea} >
                    <Button primary full style={styles.promoBtn} onPress={()=> this.applyPromo()}>
                    {this.state.applyPromoLoader ? 
                      <View style={{width:80}}><ActivityIndicator/></View> 
                      :
                      <Text style={styles.promoText}> Apply</Text>
                    }
                    </Button>
                  </TouchableOpacity>
               </Col>
              </Row>
            </View>
          {/* ------------PAYMENT OPTIONS-----------*/}
             <View style={{marginTop:10}}>
                <Text style={styles.titleText}>Payment Option(s) </Text>
             </View>
                 <ListItem style={styles.PayMethod} icon>
                    <Left style={{flex:0,}}>
                      <Switch
                       style={{color:Colors.primary,}}
                       onValueChange = {this.toggleSwitch1}
                       value = {this.state.switch1Value}/>
                    </Left>
                    <View style={{borderBottomWidth:0}}>
                      <Text style={styles.payOptionswalletb}>Use My Wallet Balance <Text style={appStyles.currencysmall}>{Colors.CUR} </Text> 
                      <Text style={appStyles.amountsmall}>{walletAmount ? walletAmount.toFixed(2) : 0 }</Text></Text>
                      <Text style={[styles.payCashText,{color:Colors.gray, fontSize:8}]}>(Turn wallet off to use other payment options)</Text>
                    </View>

                    <TouchableOpacity style={styles.walletBtn} onPress={()=>this.props.navigation.navigate(Screens.TopupWallet.route)}>
                      <Text style={styles.walletBtnText}>Topup </Text>
                      
                      <Image source={imgs.walletIcon2} style={styles.walletIcon} />
                    </TouchableOpacity>
                </ListItem> 
                {this.state.cardOption == true && (this.props.walletAmount < (totalAmount + deliveryCharges).toFixed(2) || !this.state.switch1Value) ?    
                  (<ListItem style={styles.PayMethodOther} icon>
                  
                      {/* <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />*/}
                        <TouchableOpacity style={[styles.btn,{}]} onPress={()=>{this.setState({paywithcard:true,paywithcash:false})}}>
                        {this.state.paywithcard == true && this.state.paywithcash==false ?
                          (<Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />):
                          (<Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />)
                          
                        }
                        
                      </TouchableOpacity>
             
                     
                  <Body style={{flex:0,borderBottomWidth:0, justifyContent:'center',alignItems:'flex-start'}}>
                    <Text style={styles.payOptionscard}>Pay with Card {this.state.paywithcard}   </Text>
                   
                  </Body>

                   <TouchableOpacity style={styles.cardAdd} onPress={()=>this.ShowCardList()}>
                      <Text style={styles.cardAddText}>My card </Text>
                     
                       <Image source={imgs.cardIcon} style={styles.cardIcon} />
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.cardAdd} onPress={()=>this.ShowAddCard()}>
                      <Text style={styles.cardAddText}>Add card </Text>
                      
                       <Image source={imgs.addCardIcon} style={styles.addCardIcon} />
                    </TouchableOpacity>
                </ListItem>)
                  : null } 
                {viewCartDetail.codEligibiltyAmt <= totalAmount?
                  <ListItem style={[styles.PayMethodOther,{marginTop:10}]} icon>
                    <TouchableOpacity style={styles.btn} onPress={()=>{this.setState({paywithcard: false,paywithcash:true, showMyCard:false})}}>
                      {/* <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />*/}
                     
                      {this.state.paywithcash == true && this.state.paywithcard==false?
                          (<Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />):
                          (<Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />)
                        }
                    
                    </TouchableOpacity>
                 

                    <Body style={{borderBottomWidth:0}}>
                      <Text style={styles.payOptionscard}>Pay with Cash</Text>
                      <Text style={[styles.payCashText,{color:Colors.gray}]}>(Eligible with amount above {Colors.CUR} {viewCartDetail.codEligibiltyAmt})</Text>
                    </Body>

                    <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
                      <Text style={[styles.walletBtnText,{lineHeight:15,paddingBottom:0}]}>Cash</Text>
                      
                          <Image source={imgs.CachIcon} style={styles.CachIcon} />
                    </View>
                </ListItem> 
                : null } 
          {/* ------------PAYMENT OPTIONS-----------*/}

              
              { (this.state.showMyCard==true)  && (
                    <Grid style={{marginTop:20}}>
                      <Row>
                        <Col>
                          <Text style={[styles.testStyles,{color:Colors.primary}]}>Total Amount Payable by Card </Text>
                        </Col>
                       <Col style={{flex:0, width:80}}>
                         <Text style={[styles.testStyles,{color:Colors.primary}]}>
                         <Text style={[appStyles.currency,{color:Colors.primary}]}>{Colors.CUR} </Text> 
                         {this.state.switch1Value ? ((totalAmount + deliveryCharges - this.state.offerValue) - walletAmount).toFixed(2) : (totalAmount + deliveryCharges - this.state.offerValue).toFixed(2)}</Text>
                       </Col>
                      </Row>
                      
                    </Grid>
                      )}
                { this.state.showMyCard==true && (
               <FlatList
                data={this.state.cardList}
                renderItem={({ item, index }) => 
                <Grid style={item.id==2 ? (styles.greenback):(styles.whiteBack)}>
                 <Row>
                     <Col style={{flex:0,justifyContent:'flex-start',width:35}}>
                      <TouchableOpacity style={{}} onPress={()=> this.selectCard(index, item.id, item.isAutoDebit)}>
                     {/*    <Radio type="radio" selected={item.id==2 && this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />*/}
                     {
                      this.state.CardChecked==index ?
                      (<Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />):
                      (<Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />)
                     }
                       
                        </TouchableOpacity>
                      </Col>
                      <Col style={{flex:0,justifyContent:'flex-start'}}>
                        <Text style={styles.savedCardText}>{item.cardNumber} ({item.expiry})</Text> 
                        {(item.isAutoDebit == "N" && item.id == this.state.CardCheckedId) && (<Input placeholderTextColor={Colors.primary} onChangeText={(value) => {this.setState({cvv: value })} }  style={{backgroundColor:'#fff',width:60,height:35,marginTop:5}} placeholder='CVV' />) }

                      </Col>
                      <Col style={{justifyContent:'flex-start',alignItems:'center'}}>
                        <Text style={styles.autoDebitText}>{item.isAutoDebit == "Y" ? 'Auto Debit':''}</Text>
                      </Col>
                      <Col style={{width:40,justifyContent:'flex-start',alignItems:'center'}}>
                        <TouchableOpacity style={{padding:10}} onPress={() => this.deleteCard(item.id)}>
                          <Icon style={styles.trashIcon} name='trashcan' type='Octicons' />
                        </TouchableOpacity>
                      </Col>
                    </Row>
                 </Grid>
                }
               keyExtractor={(item, index) => item.cardNo}
                />
                 
                )}
          

         {/* ---------------------------------Wallet----------------------------------*/}

          <Row>
            <Col>
              <TouchableOpacity style={styles.checkOutBtnArea} >
                <Button primary full style={styles.checkOutBtn} onPress={() => this.openControlPanel()}>
                  <Text style={styles.checkOutText}> View Cart</Text>
                </Button>
              </TouchableOpacity>
            </Col>
            <Col>
               <TouchableOpacity style={styles.checkOutBtnArea} >
              <Button primary full style={styles.checkOutBtn} onPress={()=> this.placeOrder()}>
                  {this.state.placeOrderLoading ? 
                    <ActivityIndicator/>
                  : 
                    <Text style={styles.checkOutText}> Pay Now</Text>
                  }
                  
               </Button>
          </TouchableOpacity>
            </Col>
          </Row>
         
         
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
    deliveryAddress: state.subscription.deviveryAddress,
    totalItem: state.cart.totalItem,
    cartDetail: state.cart.cartDetail,
    viewCartDetail: state.cart.viewCartDetail,
    totalAmount: state.cart.totalAmount,
    actualTotal: state.cart.actualTotal,
    deliveryCharges: state.cart.deliveryCharges,
    walletAmount: state.cart.walletAmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      placeholder: (user_id, addressId, slotId, deliveryDate, paymentMode, useWallet, offerId, offerValue) => dispatch(cartActions.placeOrder({ userId:user_id, userAddressDtlsId:addressId, deliverySlot:slotId, deliveryDate:deliveryDate, paymentMode:paymentMode, useWallet:useWallet, offerId: offerId, offerValue: offerValue })),
      placeOrderWithCard: (user_id, addressId, slotId, deliveryDate, paymentMode, useWallet, cardId, amount, cvv, offerId, offerValue) => dispatch(cartActions.placeOrder({ userId:user_id, userAddressDtlsId:addressId, deliverySlot:slotId, deliveryDate:deliveryDate, paymentMode:paymentMode, useWallet:useWallet, cardId: cardId, amount: amount, cvv: cvv, offerId: offerId, offerValue: offerValue })),
      fetchCardDetails: (userId) => dispatch(cartActions.fetchCardDetails({userId: userId})),
      deleteCard: (userId, id) => dispatch(cartActions.deleteCard({userId: userId, id: id})),
      applyUserOffer: (promoCode, userId) => dispatch(userActions.applyUserOffer({promoCode: promoCode, userId: userId})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyPayments);