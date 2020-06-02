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
               <View >
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
           
                <View >
                <Text style={styles.title}>Delivery Date </Text>
               </View>
                <View >
                <Text style={styles.txtDate}>Friday </Text>
                <Text style={styles.txtDate}>{this.state.date} </Text>
               </View>
                  <View >
                <Text style={styles.title}>2 Cart Items </Text>
               </View>
               
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
        <Footer  style={styles.BottomView}>
         
          <Left style={{width:40,flex:0,justifyContent:'flex-start'}}>
              <Icon name='shopping-cart' type='MaterialIcons' style={styles.bottomCart} />
          </Left>
            
           <View style={{flex:4,  justifyContent:'center',FlexDirection:'column'}}>
               <Text style={styles.bodyText}><Text style={{fontFamily:'Roboto',color:Colors.white}}>{'\u20B9'}</Text> 28   </Text>
               
           </View>
           <Right style={{flex:3,justifyContent:'flex-end'}}>
              <Button style={styles.checkOutBtn} primary full >
              <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.Checkout.route)}>
                <Text style={styles.checkOutText}> Check Out</Text>
                </TouchableOpacity>
              </Button>
           </Right>
        
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