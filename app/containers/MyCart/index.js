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
  Header, Left, Body, Footer, Title, Right,Card,Grid,Col,Row,ListItem,FooterTab
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import NumericInput from 'react-native-numeric-input';

class MyCart extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
    };

  }
   componentDidMount() {
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
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

    

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
              Title='My Cart'
            />
    
       <ScrollView>   
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
               <Grid style={{marginRight:Layout.indent}}>
                <Row style={{marginVertical:10}}>
                  <Col style={{justifyContent:'center',alignItems:'flex-start',}}>
                   <Text style={styles.title}>Delivery Date </Text>
                  </Col>
                  <Col style={{justifyContent:'center',alignItems:'flex-end'}}>
                   <Text style={styles.txtDate}>{this.state.date}, Friday </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Text style={styles.title}>2 Cart Items </Text>
                  </Col>
                  <Col style={{justifyContent:'center',alignItems:'flex-end'}}>
                    <View style={styles.totalAmount}>
                      <Text style={styles.totalText}>Total Amount <Text style={{fontFamily:'Roboto',color:Colors.white}}>{'\u20B9'}</Text><Text style={styles.Amount}>56</Text></Text>
                     </View> 
                  </Col>
                </Row>
               </Grid>
               
              
                
               
                <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
                <Grid >
                 
                  <Row style={styles.secondRow}>
                    <Col style={styles.amulCol}>
                      <Image source={imgs.amulMoti} style={styles.amulMoti} />
                    </Col>
                    <Col style={styles.amulInfo}>
                      <View>
                       <Text style={styles.AmuText}>Amul</Text>
                       <Text style={[styles.AmuText,styles.AmuTextTitle]}>Amul Moti</Text>
                       <Text style={styles.AmuText}>500 ml</Text>
                       <Text style={styles.AmuText}></Text>
                       <Text style={styles.AmuText}>MRP: <Text style={{}}>{'\u20B9'}</Text> 28</Text>
                      </View>
                    </Col>
                   <Col style={styles.QtyBox}>
                      <View style={styles.subscibed}>
                        <Text style={styles.textSubscribe}>Subscibed</Text>
                      </View>
                      <View>
                        <NumericInput 
                         inputStyle={{fontSize:13}}
                            value={this.state.value} 
                            onChange={value => this.setState({value})} 
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
                  </Row>

              <Row style={styles.secondRow}>
                    <Col style={styles.amulCol}>
                      <Image source={imgs.amulMoti} style={styles.amulMoti} />
                    </Col>
                    <Col style={styles.amulInfo}>
                      <View>
                       <Text style={styles.AmuText}>Amul</Text>
                       <Text style={[styles.AmuText,styles.AmuTextTitle]}>Amul Moti</Text>
                       <Text style={styles.AmuText}>500 ml</Text>
                       <Text style={styles.AmuText}></Text>
                       <Text style={styles.AmuText}>MRP: <Text style={{}}>{'\u20B9'}</Text> 28</Text>
                      </View>
                    </Col>
                   <Col style={styles.QtyBox}>
                      <View>
                        <NumericInput 
                         inputStyle={{fontSize:13}}
                            value={this.state.value} 
                            onChange={value => this.setState({value})} 
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
                  </Row>
                 
                 
                </Grid>
              </Card>
        </ScrollView>   
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
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyCart);