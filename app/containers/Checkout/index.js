import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, ScrollView, FlatList,TouchableHighlight} from 'react-native'
import _ from 'lodash'; 
import {Screens, Layout, Colors, ActionTypes } from '../../constants';
import { Logo, Statusbar, Headers, DeliveryAddress } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Footer, Title, Right,Card,Grid,Col,Row,ListItem,List,Switch,Radio
} from 'native-base';
import Modal from 'react-native-modal';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as cartActions from "../../actions/cart";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import moment from "moment";
import {orderList} from '../data/data';
import NumericInput from 'react-native-numeric-input';
import { showToast } from '../../utils/common';



class Checkout extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      isModalVisible: false,
      isEveningModalVisible: false,
      date: '',
      time: '',
      dayName:'',
      tomorrow:'',
      afterTmr:'',
      dayTmr:'',
      dayAfterTmr:'',
      selected: false,
      switch1Value: false,
      activedate:0,
      deactive:true,
      radioBtnsData: ['4PM-5PM', '5PM-7PM'],
      availTimeSlot: [],
      itemData: [],
      selectedDate: '',
      selectedTimeSlot: '',

    };

  }

  getCartDetail(){
    /*if(this.props.user.user.isFreeSubscription == 1){
      this.props.freeDeliveryCharge();
    }else{
      this.props.fetchDeliveryCharges(this.props.totalAmount);
    }*/
    this.props.getAvailableTimeSlots(this.props.deliveryAddress.areaId).then(res => {
      //console.log(JSON.stringify(res.data.availableTimeSlots))     
      const newArr = Object.keys(res.data.availableTimeSlots).map((key) => res.data.availableTimeSlots[key])
      const newArr1 = Object.keys(res.data.availableTimeSlots).map((key) => key)
      newArr.map((data, key) => {
          data.date = newArr1[key];
      });
      

      this.setState({availTimeSlot: Object.values(res.data.availableTimeSlots), selectedDate: newArr1[0]})
      
    })
  }

   componentDidMount() {
     this.getCartDetail();
    


    var that = this;
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  


    var date = new Date().getDate();
    var tomorrow = new Date().getDate()+1;
    var afterTmr = new Date().getDate()+2; //Current Date
    var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
//
  var dayName = days[new Date().getDay()];
  var dayTmr = days[new Date().getDay()+1];
  var dayAfterTmr = days[new Date().getDay()+ 2];
   var tomorrowDay = (dayTmr==undefined) ? 'SUN': dayTmr;
   var afterTomorrow = (dayAfterTmr==undefined) ? 'MON': dayAfterTmr;
   
    that.setState({
      //Setting the value of the date time
      date:   date + ' ' + month ,
      time:   hours + ':' + min,
      dayName: dayName,
       dayTmr:tomorrowDay,
       dayAfterTmr:afterTomorrow,
       tomorrow: tomorrow + ' ' + month ,
       afterTmr: afterTmr + ' ' + month ,
    });
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

  onPressSubmit = item => {
    if(this.state.selectedTimeSlot == ''){
      showToast("Please select time slot", "danger");
      return;
    }
    this.props.navigation.navigate('MyPayments', { timeslot:this.state.selectedTimeSlot, dateslot:this.state.selectedDate });
  };

  toggleSwitch1= (value) =>{
      this.setState({
           switch1Value: value
      });
  }

  renderItems = ({ item, index }) => {
    return (
      <Col style={[styles.dateCol,]}>
        <TouchableOpacity style={styles.dateWithDay}>
           <Text style={styles.txtDate}>{item.day.substring(0, 3)}</Text>
           <Text style={styles.txtDay}>{moment(item.date).format('DD MMM')}</Text>
        </TouchableOpacity>
      </Col>
    );
  }

  renderCartItems = ({ item , index }) => {
    return (
      <ListItem style={styles.ItemList}>
        <Left>
          <Text style={styles.orderName}>{item.itemName}</Text>
        </Left>
        <Body style={{flexDirection: 'row',flex:0,justifyContent:'center',alignItems:'center'}}>
         
           <Text style={styles.orderQty}>{item.quantity}<Text style={{fontSize: 10, lineHeight: 20}}> X</Text></Text>
         
        
       
        </Body>

        <View>
          <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> {item.discountedPrice > 0 && item.discountedPrice < item.itemPrice ? item.discountedPrice.toFixed(2) : item.itemPrice.toFixed(2)}</Text>
        </View>
      </ListItem>   
    );
  }
  selectDateTimeSlot(key, data) {
    this.setState({activedate:key, selectedDate:data.date, selectedTimeSlot:''  })
  }
  selectTimeSlot(slotId, subscriptionFees, time){
    
    if(this.props.user.user.isFreeSubscription == 0 || this.props.user.user.isFreeSubscription == null)
    {  
      if(subscriptionFees == 'Y'){
        if(this.props.user.user.subscriptionEndDate < moment(new Date()).format('YYYY-MM-DD')){
          this.props.fetchSubscriptionCharges(this.props.user.user.id).then(res => {
              this.openModal(time);
          })
        }else{
          this.props.freeDeliveryCharge();
        }
      }else{
        this.props.fetchDeliveryCharges(this.props.totalAmount).then(res => {
          this.openModal(time);
        });
      }
    }
   
    // if(this.props.user.user.isFreeSubscription == 1){
    //   this.props.freeDeliveryCharge();
    // }else{
    //   this.props.fetchDeliveryCharges(this.props.totalAmount);
    // }
    this.setState({selectedTimeSlot:slotId})
  }

  openModal(time){
    if(time.search("AM")){
      this.setState({ isModalVisible: !this.state.isModalVisible})
    }else{
      this.setState({ isEveningModalVisible: !this.state.isEveningModalVisible})
    }
  }

 
  render(){
    const { navigation, cartDetail, totalItem, totalAmount, deliveryCharges } = this.props;
    const getItem = navigation.getParam('item');
    return (
      <Container style={appStyles.container}>
     
           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='Checkout'
             />
   
              <Modal 
              isVisible={this.state.isModalVisible}
              coverScreen={false}
              backdropColor={'#fff'}
              backdropOpacity={0.6}
              animationIn={'slideInDown'}
              style={{flex:1}}
              >
                  <View style={{backgroundColor:'#fff',padding:10,borderWidth:1, borderColor:Colors.gray, borderRadius:5}}>
                    <TouchableOpacity style={styles.closeIcon} onPress = {() => this.setState({isModalVisible:false}) }>
                      <Icon type="AntDesign" name="closecircleo" />
                    </TouchableOpacity>
                    <Text style = {[styles.Modeltext,{fontSize:16,alignSelf:'center'}]}>Valuable Customer..!</Text>
                       <Icon type="SimpleLineIcons" name="emotsmile"  style={styles.smileIcon} />
                    <Text  style = {styles.Modeltext}>
                    Seems your free subscription period is over, 
                    Now have your morning deliveries free by paying a small subscription amount <Text style={appStyles.currency}>{'\u20B9'}</Text> 123.</Text>
                    <Text style={styles.Modeltext}>You can still enjoy our evening slots with nominal delviery charge</Text>
                    <TouchableOpacity style={styles.closeOk} onPress = {() => this.setState({isModalVisible:false}) }>
                    <Text style={{color:'#fff',fontSize:16,fontFamily:'Font-Medium'}}>OK</Text>
                    </TouchableOpacity>
                  
                  </View>
                  
              </Modal>

              <Modal 
              isVisible={this.state.isEveningModalVisible}
              coverScreen={false}
              backdropColor={'#fff'}
              backdropOpacity={0.6}
              animationIn={'slideInDown'}
              style={{flex:1}}
              >
                  <View style={{backgroundColor:'#fff',padding:10,borderWidth:1, borderColor:Colors.gray, borderRadius:5}}>
                    <TouchableOpacity style={styles.closeIcon} onPress = {() => this.setState({isEveningModalVisible:false}) }>
                      <Icon type="AntDesign" name="closecircleo" />
                    </TouchableOpacity>
                    <Text style = {[styles.Modeltext,{fontSize:16,alignSelf:'center'}]}>Valuable Customer..!</Text>
                     <Icon type="SimpleLineIcons" name="emotsmile" style={styles.smileIcon} />
                    <Text  style = {styles.Modeltext}>
                    Seems your free delivery period is over , 
                    You can still enjoy our evening slots with nominal delviery charge"
                    Now have your morning deliveries free by paying a small subscription amount (Just <Text style={appStyles.currency}>{'\u20B9'}</Text> 123)
                   </Text>
                    <TouchableOpacity style={styles.closeOk} onPress = {() => this.setState({isEveningModalVisible:false}) }>
                    <Text style={{color:'#fff',fontSize:16,fontFamily:'Font-Medium'}}>OK</Text>
                    </TouchableOpacity>
                  
                  </View>
                  
              </Modal>
       <ScrollView>   
                 
   
               <View style={styles.clickBtn} onPress={()=>this.props.navigation.navigate(Screens.MyPayments.route)}>
                  <Text style={styles.textPayMode}>Choose delivery slots for this order</Text>
                </View>
                  <Grid>
                  <Row>
                    {this.state.availTimeSlot.map((data, key) => {
                        return (
                          <Col style={[styles.dateCol, this.state.activedate==key?styles.activeDateCol:'']}>
                      <TouchableOpacity style={styles.dateWithDay} onPress={()=> this.selectDateTimeSlot(key,data)}>
                         <Text style={[styles.txtDate,this.state.activedate==key?styles.activetxtDate:'']}>{data.day.substring(0, 3)}</Text>
                         <Text style={[styles.txtDay,this.state.activedate==true?styles.activetxtDay:'']}>{moment(data.date).format('DD MMM')}</Text>
                         {
                          this.state.activedate==key?
                          <Icon  name="triangle-down" type="Entypo" 
                           style={{
                              position: "absolute",
                              color: Colors.primary,
                              bottom:-35,
                              right:75
                            }}
                          />:null
                         }
                      </TouchableOpacity>
                    </Col>
                    );

                    })}
                   </Row>
                   {this.state.availTimeSlot.map((data, key) => {
                    return (
                        <View>
                        {this.state.activedate == key ?
                        (<Row style={{ flex: 1, marginLeft:Layout.indent, marginTop:20, marginBottom:15, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
                        
                        {data.slots.map((data, key1) => {  
                               return (<View key={key1}>       
                                  
                                        <Col onPress={()=>{ this.selectTimeSlot(data.id, data.subscriptionFees, data.time) }} style={[styles.btn,{}]}>
                                            <Icon style={styles.img} name={this.state.selectedTimeSlot == data.id ? 'radio-button-checked' : 'radio-button-unchecked' } type='MaterialIcons' />
                                            <Text style={[styles.bodyText, styles.bodyGreen]}>{data.time} </Text>
                                        </Col>
                                      
                                  </View>  
                              )
                          })}
                       </Row>) : null }
                        </View>       
                    );
                })}
                </Grid> 
              <Grid style={styles.OrderTitle}>
               <Col>
                <Text style={styles.OrderTitleText}>Order Item List </Text>
               </Col>
                <Col style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <Text style={styles.OrderTitleText}>Total Items &nbsp; {totalItem}</Text> 
               </Col>
               </Grid>
               <List style={{paddingBottom:10}}>

                      <FlatList
                       vertical
                       //showsHorizontalScrollIndicator={false}
                       data={cartDetail}
                       renderItem={this.renderCartItems}
                       keyExtractor={(item) => `${item.id}`}
                     />
                      
   {/* Sub Total */} 
                        <ListItem style={[styles.TotalList,{marginTop:10}]}>
                          <Left>
                              <Text style={styles.TotalText}>Subtotal</Text>
                          </Left>
                         
                          <Body style={styles.TotalBar}>
                              <Text></Text>   
                          </Body>

                          <View>
                           <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> {totalAmount.toFixed(2)}</Text>
                          </View>
                        </ListItem>   
{/* Deliver Charge */} 
                         <ListItem style={styles.TotalList}>
                          <View>
                            <Text style={styles.TotalText}>Delivery Charges</Text>
                          </View>
                         <Body style={styles.TotalBar}>
                          <Text></Text>
                          </Body>

                          <View>
                          <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> {deliveryCharges}</Text>
                          </View>
                        </ListItem>   
{/* Sub Total */}                         
                         <ListItem style={[styles.TotalList]}>
                          <View>
                            <Text style={styles.TotalText}> Total</Text>
                          </View>
                         <Body style={styles.TotalBar}>
                                <Text></Text>
                          </Body>

                          <View>
                           <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> {(totalAmount + deliveryCharges).toFixed(2)}</Text>
                          </View>
                        </ListItem>   
           
                
               </List>

               <DeliveryAddress/>


         
            <TouchableOpacity style={styles.checkOutBtnArea} >
              <Button primary full style={styles.checkOutBtn} onPress={()=>this.onPressSubmit('Checkout')}>
                           <Text style={styles.checkOutText}> Pay Now</Text>
                         </Button>
            </TouchableOpacity>
       

               
        </ScrollView>   
       
    
        
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    deliveryAddress: state.subscription.deviveryAddress,
    totalItem: state.cart.totalItem,
    cartDetail: state.cart.cartDetail,
    totalAmount: state.cart.totalAmount,
    deliveryCharges: state.cart.deliveryCharges,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      viewCart: (user_id) => dispatch(cartActions.viewcart({ userId: user_id })),
      getAvailableTimeSlots: (areaId) => dispatch(cartActions.getAvailableTimeSlots({areaId:areaId})),
      fetchDeliveryCharges: (orderValue) => dispatch(cartActions.fetchDeliveryCharges({orderValue:orderValue})),
      freeDeliveryCharge: () => dispatch({ type: ActionTypes.DELIVERYCHARGES, data: 0 }),
      fetchSubscriptionCharges: (user_id) => dispatch(cartActions.fetchSubscriptionCharges({userId: user_id})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);