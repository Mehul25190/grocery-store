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
//import { WebView } from 'react-native-webview';


class MyPayments extends React.Component {

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
   openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }
     onValueChange(value: string) {
    this.setState({
      switch1Value: value
    });
  }
   toggleSwitch1= (value) =>{
      this.setState({
           switch1Value: value,
           //paywithcard:false,
           //paywithcash:false
      });
  }
  ShowCardList(){
    this.setState({
      showMyCard:true,
      showAddCard:false
    });
  }
  ShowAddCard(){
     this.setState({
      showMyCard:false,
      showAddCard:true
    });
  }

  placeOrder() {
    if(!this.state.switch1Value && !this.state.paywithcard && !this.state.paywithcard){
      showToast('Please select the payment method', "danger");
      return;
    }

    if(this.props.walletAmount < (this.props.totalAmount + this.props.deliveryCharges)){
      showToast('Your wallet amount is not sufficent to place the order, please select card or cash option.', "danger");
      return;
    }

    const {navigation} = this.props;
    const selectedTimeSlot = navigation.getParam('timeslot');
    const dateslot = navigation.getParam('dateslot');
    const useWallet = this.state.switch1Value ? 'Y' : 'N';
    const paymentMode = this.state.paywithcash ? 'COD' : this.state.paywithcard ? 'CARD' : '' ;

    //this.props.navigation.navigate(Screens.OrderPayment.route, {userId:this.props.user.user.id, userAddressDtlsId:this.props.deliveryAddress.id, deliverySlot:selectedTimeSlot, deliveryDate:moment(dateslot).format('YYYY/MM/DD'), paymentMode:paymentMode, useWallet:useWallet, deliveryCharges:'', subscriptionFees:''});
    
    this.props.placeholder(this.props.user.user.id, this.props.deliveryAddress.id, selectedTimeSlot, moment(dateslot).format('YYYY/MM/DD'), paymentMode, useWallet ,'', '').then(res => {
      //console.log('resrersr', res.data.orderNumber)
      if(res.status == 'success'){
        this.props.navigation.navigate(Screens.OrderSuccess.route, {orderNumber: res.data.orderNumber});
      }else{
        if(res.message)
          showToast(res.message, "danger");
        else
          showToast("Some technical issue found, please contact to support.", "danger");

      }
    })
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
              setCart={true}
              bgColor='transparent'
              Title='Payment'
            />
          <Content enableOnAndroid>
         
{/* ---------------------------------Credit / Debit Card----------------------------------*/}

         <ScrollView style={{marginLeft:Layout.indent, marginRight:Layout.indent}}>
            <Grid style={{borderBottomWidth:1,marginTop:15, paddingBottom:5, borderColor:'#ddd'}}>
              <Row>
                <Col>
                  <Text style={styles.testStyles}>Total Order Value</Text>
                </Col>
               <Col style={{flex:0, width:78, justifyContent:'center',alignItems:'center'}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currency}>{'\u20B9'}</Text> {totalAmount.toFixed(2)}</Text>
               </Col>
              </Row>
               <Row>
                <Col style={{}}>
                    <Text style={styles.testStyles}>{applyDeliveryCharge ? 'Delivery Charges' : 'Subscription Fees' }</Text>
                </Col>
                <Col style={{flex:0, width:78, justifyContent:'center',alignItems:'center'}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currency}>{'\u20B9'}</Text> {deliveryCharges.toFixed(2)}</Text>
               </Col>
              </Row>
            </Grid>
            <Grid style={{paddingTop:5,marginBottom:10}}>
              <Row>
                <Col>
                  <Text style={styles.testStyles}>Total Amount Payable </Text>
                </Col>
               <Col style={{flex:0, width:75, justifyContent:'center',alignItems:'center'}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currency}>{'\u20B9'}</Text> {(totalAmount + deliveryCharges).toFixed(2)}</Text>
               </Col>
              </Row>
               <Row>
                <Col>
                  <Text style={[styles.testStyles,{color:Colors.primary}]}>Your Savings with this order</Text>
                </Col>
                <Col style={{flex:0, width:75, justifyContent:'center',alignItems:'center'}}>
                 <Text style={[styles.testStyles,{color:Colors.primary}]}><Text style={[appStyles.currency,{color:Colors.primary}]}>{'\u20B9'}</Text> {(actualTotal - totalAmount).toFixed(2)}</Text>
               </Col>
              </Row>
            </Grid>

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
                      <Text style={styles.payOptions}>Use My Wallet Balance</Text>
                      <Text style={styles.payOptions}>Current Balance: <Text style={[appStyles.currency,{fontSize:12}]}>{'\u20B9'}</Text>{walletAmount ? walletAmount.toFixed(2) : 0 }</Text>
                    </View>

                    <TouchableOpacity style={styles.walletBtn} onPress={()=>this.props.navigation.navigate(Screens.TopupWallet.route)}>
                      <Text style={styles.walletBtnText}>Topup </Text>
                      
                      <Image source={imgs.walletIcon2} style={styles.walletIcon} />
                    </TouchableOpacity>
                </ListItem>   
                 <ListItem style={styles.PayMethodOther} icon>
                  
                      {/* <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />*/}
                        <TouchableOpacity style={[styles.btn,{}]} onPress={()=>{this.setState({paywithcard:true,paywithcash:false})}}>
                        {this.state.paywithcard == true && this.state.paywithcash==false ?
                          (<Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />):
                          (<Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />)
                          
                        }
                        
                      </TouchableOpacity>
             
              
                  <Body style={{flex:0,borderBottomWidth:0, justifyContent:'center',alignItems:'flex-start'}}>
                    <Text style={styles.payOptionscard}>Pay with Card    </Text>
                   
                  </Body>

                   <TouchableOpacity style={styles.cardAdd} onPress={()=>this.ShowCardList()}>
                      <Text style={styles.cardAddText}>My card </Text>
                     
                       <Image source={imgs.cardIcon} style={styles.cardIcon} />
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.cardAdd} onPress={()=>this.ShowAddCard()}>
                      <Text style={styles.cardAddText}>Add card </Text>
                      
                       <Image source={imgs.addCardIcon} style={styles.addCardIcon} />
                    </TouchableOpacity>
                </ListItem>  
                {viewCartDetail.codEligibiltyAmt <= totalAmount?
                  <ListItem style={[styles.PayMethodOther,{marginTop:10}]} icon>
                    <TouchableOpacity style={styles.btn} onPress={()=>{this.setState({paywithcard: false,paywithcash:true})}}>
                      {/* <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />*/}
                     
                      {this.state.paywithcash == true && this.state.paywithcard==false?
                          (<Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />):
                          (<Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />)
                          
                        }
                    
                    </TouchableOpacity>
                 

                    <Body style={{borderBottomWidth:0}}>
                      <Text style={styles.payOptionscard}>Pay with Cash</Text>
                      <Text style={[styles.payCashText,{color:Colors.gray}]}>(Eligible with amount above {'\u20B9'}{viewCartDetail.codEligibiltyAmt})</Text>
                    </Body>

                    <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
                      <Text style={[styles.walletBtnText,{lineHeight:15,paddingBottom:0}]}>Cash</Text>
                      
                          <Image source={imgs.CachIcon} style={styles.CachIcon} />
                    </View>
                </ListItem> 
                : null } 
          {/* ------------PAYMENT OPTIONS-----------*/}

              
              { (this.state.showMyCard==true || this.state.showAddCard==true)  && (
                    <Grid style={{marginTop:20}}>
                      <Row>
                        <Col>
                          <Text style={[styles.testStyles,{color:Colors.primary}]}>Total Amount Payable by Card </Text>
                        </Col>
                       <Col style={{flex:0, width:60}}>
                         <Text style={[styles.testStyles,{color:Colors.primary}]}>
                         <Text style={[appStyles.currency,{color:Colors.primary}]}>{'\u20B9'}</Text> 74.00</Text>
                       </Col>
                      </Row>
                      
                    </Grid>
                      )}
                { this.state.showMyCard==true && (
               <FlatList
                data={CardDetails}
                renderItem={({ item, index }) => 
                <Grid style={item.id==2 ? (styles.greenback):(styles.whiteBack)}>
                 <Row>
                     <Col style={{flex:0,justifyContent:'flex-start',width:35}}>
                        <TouchableOpacity style={{}} onPress={()=>this.setState({CardChecked:index})}>
                     {/*    <Radio type="radio" selected={item.id==2 && this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />*/}
                     {
                      this.state.CardChecked==index ?
                      (<Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />):
                      (<Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />)
                     }
                       
                        </TouchableOpacity>
                      </Col>
                      <Col style={{flex:0,justifyContent:'flex-start'}}>
                        <Text style={styles.savedCardText}>xxxx-{item.cardNo} ({item.ExpiredM}/{item.ExpiredY})</Text> 
                        {index==1 && (<Input placeholderTextColor={Colors.primary} style={{backgroundColor:'#fff',width:60,height:35,marginTop:5}} placeholder='CVV' />) }
                      </Col>
                      <Col style={{justifyContent:'flex-start',alignItems:'center'}}>
                        <Text style={styles.autoDebitText}>{item.autoDebit=='yes'? 'Auto Debit':''}</Text>
                      </Col>
                      <Col style={{width:40,justifyContent:'flex-start',alignItems:'center'}}>
                        <TouchableOpacity style={{padding:10}}>
                          <Icon style={styles.trashIcon} name='trashcan' type='Octicons' />
                        </TouchableOpacity>
                      </Col>
                    </Row>
                 </Grid>
                }
               keyExtractor={(item, index) => item.cardNo}
                />
                 
                )}
           
      
              
             { (this.state.showAddCard==true) && (
              <View>
              
               <Grid style={styles.cardBox}>
                  <Row style={styles.CardRow}>
                    <Col >
                      <Input placeholderTextColor="#B9B9B9"  style={styles.inputStyleCard} placeholder="xxxx-xxxx-xxxx-xxxx" />
                    </Col>
                    <Col style={{width:100, justifyContent:'center',alignItems:'flex-end'}}>
                     <Icon style={styles.CardIcon} name='credit-card' type='EvilIcons' />
                    </Col>
                  </Row>
                 <Row style={styles.CardRow}>
                    <Col style={styles.ExpiresTitleCol}>
                     <Text style={{fontSize:16,fontFamily:'Font-Medium', alignItems:'center'}}>Expires:</Text>
                    </Col>
                    <Col style={styles.ExpiresCol}>
                       <Input placeholderTextColor="#B9B9B9" style={styles.ExpiresStyle} placeholder="MM YYYY " />
                    </Col>
                    <Col>
                    <Item style={{borderBottomWidth:0,paddingLeft:10,alignItems:'center'}}>
                      <Input  placeholderTextColor="#B9B9B9" style={{fontFamily:'Font-Medium',color:'#B9B9B9',fontSize:16}} placeholder="CVV" />
                      <Icon style={styles.lockStyle} name='lock' type='EvilIcons' />
                    </Item>
                      
                    </Col>
                  </Row>
                   <Row style={{ paddingBottom:5, paddingTop:1,height:53.33,justifyContent:'center'}}>
                    <Input placeholderTextColor="#B9B9B9" style={styles.CardNameStyle} placeholder="Name On Card" />
                   </Row>
               </Grid>

           <ListItem noBorder icon style={{marginTop:5,marginLeft:5}}>
            <Left>  
               <CheckBox
               style={styles.checkboxStyle}
               onClick={()=>{
                  this.setState({
                      isChecked:!this.state.isChecked
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.isChecked}
              />

             </Left>
             <Body>
                <Text style={{color:Colors.gray,fontFamily:'Font-Medium',fontSize:13}}>Save card for Faster Checkouts.</Text>
             </Body>
           </ListItem>
            <ListItem noBorder icon style={{marginTop:5,marginLeft:5}}>
            <Left>  
               <CheckBox
               style={styles.checkboxStyle}
               onClick={()=>{
                  this.setState({
                      isChecked2:!this.state.isChecked2
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.isChecked2}
              />

             </Left>
             <Body style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                <Text style={{color:Colors.gray,fontFamily:'Font-Medium',fontSize:13}}>You hearbuy authorise to change you automatically every month untill you cancel subscription.</Text>
             </Body>
           </ListItem>
            </View>
         )}

         {/* ---------------------------------Wallet----------------------------------*/}

          <TouchableOpacity style={styles.checkOutBtnArea} >
              <Button primary full style={styles.checkOutBtn} onPress={()=> this.placeOrder()}>
                  <Text style={styles.checkOutText}> Pay Now</Text>
               </Button>
          </TouchableOpacity>
         
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
      placeholder: (user_id, addressId, slotId, deliveryDate, paymentMode, useWallet, deliveryCharges, subscriptionFees) => dispatch(cartActions.placeOrder({ userId:user_id, userAddressDtlsId:addressId, deliverySlot:slotId, deliveryDate:deliveryDate, paymentMode:paymentMode, useWallet:useWallet, deliveryCharges:deliveryCharges, subscriptionFees:subscriptionFees })),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyPayments);