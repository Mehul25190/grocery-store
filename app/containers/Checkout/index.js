import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, ScrollView} from 'react-native'
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
  Header, Left, Body, Footer, Title, Right,Card,Grid,Col,Row,ListItem,List,Switch,Radio
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {orderList} from '../data/data';
import NumericInput from 'react-native-numeric-input';

class Checkout extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       dayName:'',
       tomorrow:'',
       afterTmr:'',
       dayTmr:'',
       dayAfterTmr:'',
        selected: false,
         switch1Value: false,
         activedate:true,
         deactive:true,
          radioBtnsData: ['4PM-5PM', '5PM-7PM'],
       checked: 0,
    };

  }
   componentDidMount() {
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
   console.log("dayAfterTmr:"+ tomorrow);
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
  console.log(item);
    this.props.navigation.navigate('OrderSuccess', { item });
  };

  toggleSwitch1= (value) =>{
      this.setState({
           switch1Value: value
      });
  }

  render(){
    const { navigation } = this.props;
    const getItem = navigation.getParam('item');
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='Order Summary'
             />
    
       <ScrollView>   
               <View style={{marginTop:5}}>
               <View style={styles.clickBtn} onPress={()=>this.props.navigation.navigate(Screens.MyPayments.route)}>
                  <Text style={styles.textPayMode}>Choose delivery slots for this order</Text>
                </View>
                  <Grid>
                  <Row>
                    <Col style={[styles.dateCol,]}>
                      <TouchableOpacity style={styles.dateWithDay}>
                         <Text style={styles.txtDate}>{this.state.dayName}</Text>
                         <Text style={styles.txtDay}>{this.state.date}</Text>
                      </TouchableOpacity>
                    </Col>
                    <Col style={[styles.dateCol, this.state.activedate==true?styles.activeDateCol:'']}>
                      <TouchableOpacity style={styles.dateWithDay} onPress={()=> this.setState({activedate:!this.state.activedate})}>
                         <Text style={[styles.txtDate,this.state.activedate==true?styles.activetxtDate:'']}>{this.state.dayTmr}</Text>
                         <Text style={[styles.txtDay,this.state.activedate==true?styles.activetxtDay:'']}>{this.state.tomorrow}</Text>
                         {
                          this.state.activedate==true?
                          <Icon  name="triangle-down" type="Entypo" 
                           style={{
                              position: "absolute",
                              color: Colors.primary,
                              bottom:-35,
                              right:50
                            }}
                          />:null
                         }
                      </TouchableOpacity>
                    </Col>
                    <Col style={styles.dateCol}>
                      <TouchableOpacity style={styles.dateWithDay}>
                         <Text style={styles.txtDate}>{this.state.dayAfterTmr}</Text>
                          <Text style={styles.txtDay}>{this.state.afterTmr}</Text>
                      </TouchableOpacity>
                    </Col>
                   </Row>
                    <Row style={{ flex: 1, marginLeft:Layout.indent, marginTop:20, marginBottom:15, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                        
                        {this.state.radioBtnsData.map((data, key) => {

                       return (<View key={key}>       
                            {this.state.checked == key ?
                            
                                <Col style={[styles.btn,{}]}>
                                    <Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />
                                    <Text style={[styles.bodyText, styles.bodyGreen]}>{data}</Text>
                                </Col>
                             
                                :
                              
                                <Col onPress={()=>{this.setState({checked: key})}} style={[styles.btn,{}]}>
                                    <Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />
                                    <Text style={[styles.bodyText, styles.bodyGreen]}>{data}</Text>
                                </Col>
                              

                            }
                          </View>  
                      )
                  })}
               </Row>
                </Grid>
                <Text style={styles.title}>Payment Method </Text>
               </View>
                 <ListItem style={styles.PayMethod} icon>
                    <Left style={{flex:0}}>
                        <Switch
                       style={{color:Colors.primary,}}
                       onValueChange = {this.toggleSwitch1}
                       value = {this.state.switch1Value}/>
                    </Left>
                    <Body style={{borderBottomWidth:0}}>
                      <Text style={styles.payOptions}>Use My Wallet Balance</Text>
                      <Text style={styles.payOptions}>Current Balance: <Text style={[appStyles.currency,{fontSize:12}]}>{'\u20B9'}</Text>1000</Text>
                    </Body>

                    <TouchableOpacity style={styles.walletBtn} onPress={()=>this.props.navigation.navigate(Screens.TopupWallet.route)}>
                      <Text style={styles.walletBtnText}>Topup Wallet</Text>
                    </TouchableOpacity>
                </ListItem>   
                 <ListItem style={styles.PayMethodOther} icon>
                   <Left style={styles.payRadio} onPress={() => this.setState({ selected: !this.state.selected })}>
                       <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />
                  </Left>
                  <Body style={{borderBottomWidth:0}}>
                    <Text style={styles.payOptionscard}>Pay with Card</Text>
                    <Text style={[styles.payOptionscard,{color:Colors.gray}]}>xxx-xxxx-xxxx-0011</Text>
                  </Body>

                  <TouchableOpacity style={styles.walletBtn} onPress={()=>this.props.navigation.navigate(Screens.MyPayments.route)}>
                    <Text style={styles.walletBtnText}>+ Add Card</Text>
                  </TouchableOpacity>
                </ListItem>  
                 <ListItem style={styles.PayMethodOther} icon>
                    <Left style={styles.payRadio} onPress={() => this.setState({ selected: !this.state.selected })}>
                       <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />
                  </Left>

                  <Body style={{borderBottomWidth:0}}>
                    <Text style={styles.payOptionscard}>Pay with Cash</Text>
                    <Text style={[styles.payOptionscard,{color:Colors.gray}]}>(Eligible with amount above {'\u20B9'}5000)</Text>
                  </Body>

                  <View style={[styles.walletBtn,{backgroundColor:Colors.primary}]}>
                    <Text style={[styles.walletBtnText,{textTransform:'uppercase'}]}>Cash</Text>
                  </View>
                </ListItem>  
               <View style={styles.OrderTitle}>
                <Text style={styles.OrderTitleText}>Order Item List </Text>
               </View>

               <List>

               
                      <ListItem style={styles.ItemList}>
                          <Left>
                            <Text style={styles.orderName}>Vegitable Salad</Text>
                          </Left>
                          <Body>
                            <Text style={styles.orderQty}>1 X</Text>
                          </Body>

                          <View>
                            <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> 200</Text>
                          </View>
                        </ListItem>   
                        {/* loop */} 
                       <ListItem style={styles.ItemList}>
                          <Left>
                            <Text style={styles.orderName}>Vegitable Salad</Text>
                          </Left>
                          <Body>
                            <Text style={styles.orderQty}>1 X</Text>
                          </Body>

                          <View>
                            <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> 200</Text>
                          </View>
                        </ListItem>    
   {/* Sub Total */} 
                        <ListItem style={[styles.TotalList,{marginTop:10}]}>
                          <Left>
                             <Text style={styles.orderName}>Items &nbsp; 2</Text>   
                          </Left>
                         
                          <Body style={styles.TotalBar}>
                              <Text style={styles.TotalText}>Subtotal</Text>
                          </Body>

                          <View>
                           <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> 400</Text>
                          </View>
                        </ListItem>   
{/* Deliver Charge */} 
                         <ListItem style={styles.TotalList}>
                          <View>
                            <Text></Text>
                          </View>
                         <Body style={styles.TotalBar}>
                            <Text style={styles.TotalText}>Delivery Charges</Text>
                          </Body>

                          <View>
                          <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> 40</Text>
                          </View>
                        </ListItem>   
{/* Sub Total */}                         
                         <ListItem style={styles.TotalList}>
                          <View>
                            <Text></Text>
                          </View>
                         <Body style={styles.TotalBar}>
                                <Text style={styles.TotalText}> Total</Text>
                          </Body>

                          <View>
                           <Text style={styles.OrderPrice}><Text style={appStyles.currency}>{'\u20B9'}</Text> 440</Text>
                          </View>
                        </ListItem>   
           
                
               </List>

               <View style={{marginTop:10}}>
                <Text style={styles.title}>Delivery Address </Text>
               </View>
               <Card style={[appStyles.addBox,styles.deliveryAddress]}>
             
                <ListItem  noBorder icon style={{ marginLeft: Layout.indent,}}>
                      <Left >
                        <Icon name="location-on" 
                         type="MaterialIcons"
                         
                          style={[appStyles.IconStyle,styles.addressIcon]}
                          />
                      </Left>
                      <Body>
                        <Text style={[appStyles.userArea,styles.addressText]} >South Bopal,</Text>
                        <Text style={[appStyles.userCity,styles.addressText]} >Ahmedabad - Gandhinagar,</Text>
                       
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);