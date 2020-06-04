import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, ScrollView, } from 'react-native'
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
  Header, Left, Body, Title, Right,Card,Grid,Row,Col,Tabs,Tab,ScrollableTab,Input,Item,ListItem,Picker
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CheckBox from 'react-native-check-box';
import {BankList} from '../data/data';
import {BankOptions} from '../data/data';
class MyPayments extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
      //default value of the date time
      date: '',
      time: '',
      value: null ,
      selected: '0',
         
    };
  }
    componentDidMount() {

    }
   openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }
     onValueChange(value: string) {
    this.setState({
      selected: value,
      switch1Value: value
    });
  }
  render(){
    const {navigation} = this.props;
    const getTab = navigation.getParam('item')

    
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
           
           <Card style={[appStyles.addBox,{height:'auto',marginTop:15, position:'relative'}]}>
             <View style={styles.amountBox}>
              <Text style={styles.amountText}>Amount:&nbsp;160.00 </Text>
              <Text style={styles.txtText}>Txnid:&nbsp;37089163  </Text>
             </View>
           </Card>

    <Tabs  initialPage={0} locked={true} 
       style={styles.StyleTabs}>

{/* ---------------------------------Wallet----------------------------------*/}
  
 {getTab=='Checkout' &&

 
       (<Tab heading="Wallet"  style={styles.tabHeading}
           tabStyle={[styles.tabStyle]}
            activeTextStyle={styles.activeTextStyle}
            textStyle={styles.textStyle}
            activeTabStyle={styles.activeStyle}
           
            >

         <View style={styles.tabBody}>
           <View>
           
            <Text style={[styles.titleText,{marginTop:10,fontSize:18}]}>Current Balance</Text>
           </View>

            <Card style={[appStyles.addBox,{height:'auto', position:'relative',marginLeft:0,marginRight:0}]}> 
               <View style={[styles.amountBox,{marginTop:10,marginBottom:10}]}>
                <Text style={styles.amountText}>Wallet Balance:
                <Text style={[appStyles.currency,{fontWeight:'bold', fontSize:18,color:Colors.primary}]}> {'\u20B9'}</Text> 20.00</Text>
               </View>
            </Card>

            <View>
            <Text style={[styles.titleText,{marginTop:10,fontSize:18}]}>Add Money</Text>
             </View>
              <Card style={[appStyles.addBox,{height:'auto', position:'relative',padding:10,marginLeft:0,marginRight:0}]}> 
               <View style={{borderBottomWidth:1,marginRight:Layout.indent,borderColor:Colors.primary,paddingBottom:5,marginBottom:5}}>
                <Text style={styles.selectedAmnt}>
                  <Text style={appStyles.currency,{fontWeight:'bold'}}>{'\u20B9'}</Text>  1000.00
                 </Text>
               </View>
              <ScrollView horizontal  style={styles.addmoney}>
                  <TouchableOpacity style={styles.moneyBorder}>
                    <Text style={[styles.listAmnt]}>
                     <Text style={appStyles.currency}>{'\u20B9'}</Text> 1000.00
                   </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.moneyBorder}>
                    <Text style={[styles.listAmnt]}>
                     <Text style={appStyles.currency}>{'\u20B9'}</Text> 2000.00
                   </Text>
                  </TouchableOpacity>
                   <TouchableOpacity style={styles.moneyBorder}>
                    <Text style={[styles.listAmnt]}>
                     <Text style={appStyles.currency}>{'\u20B9'}</Text>  3000.00
                   </Text>
                  </TouchableOpacity>
                   <TouchableOpacity style={styles.moneyBorder}>
                    <Text style={[styles.listAmnt]}>
                     <Text style={appStyles.currency}>{'\u20B9'}</Text>  4000.00
                   </Text>
                  </TouchableOpacity>
                  
              </ScrollView>

              <TouchableOpacity style={styles.addmoneyArea}>
                <Button primary full style={styles.addMoneyBtn} onPress={()=>this.props.navigation.navigate(Screens.MyWallet.route)}>
                <Text style={styles.btnText}>Add Money</Text>
                </Button>
              </TouchableOpacity>

              </Card>
          </View>
        </Tab>)}
 

{/* ---------------------------------Credit / Debit Card----------------------------------*/}


            <Tab heading="Credit / Debit Card" tabStyle={styles.tabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}
              activeTabStyle={styles.activeStyle}
              style={styles.creditStyles} >
              
               <View>
                <Text style={[styles.titleText,{marginTop:10,fontSize:18}]}>Current Balance</Text>
               </View>

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
                     <Text style={{fontSize:18,fontFamily:'Font-Medium', alignItems:'center'}}>Expires:</Text>
                    </Col>
                    <Col style={styles.ExpiresCol}>
                       <Input placeholderTextColor="#B9B9B9" style={styles.ExpiresStyle} placeholder="MM YYYY " />
                    </Col>
                    <Col>
                    <Item style={{borderBottomWidth:0,paddingLeft:10,alignItems:'center'}}>
                      <Input  placeholderTextColor="#B9B9B9" style={{fontFamily:'Font-Medium',color:'#B9B9B9',}} placeholder="CVV" />
                      <Icon style={styles.lockStyle} name='lock' type='EvilIcons' />
                    </Item>
                      
                    </Col>
                  </Row>
                   <Row style={{ paddingBottom:5, paddingTop:5,height:60}}>
                  
                     <Input placeholderTextColor="#B9B9B9" style={styles.CardNameStyle} placeholder="Name On Card" />
                   
                   
                  </Row>
               </Grid>

           <ListItem noBorder>
          
          </ListItem>
                
            
            </Tab>

{/* ---------------------------------Net Banking Tab----------------------------------*/}

            <Tab heading="Net Banking"  style={styles.tabHeading,{height:'auto'}}
              tabStyle={styles.tabStyle}
              activeTextStyle={styles.activeTextStyle}
              textStyle={styles.textStyle}
              activeTabStyle={styles.activeStyle}>
         <View style={styles.tabBody}>
             
                <View>
                <Text style={[styles.titleText,{marginTop:10,marginBottom:20,fontSize:18}]}>Choose Your Bank</Text>
               </View>
                
               <Grid style={{}}>
                {
                  BankOptions.map(item => (
                    
                          <Col key={item.key} style={styles.buttonContainer}>
                            
                              <TouchableOpacity style={[styles.circle,
                                 this.state.value === item.key && ({backgroundColor:Colors.primary})
                                ]}
                                 onPress={() => this.setState({ value: item.key })}>
                                 <Image source={item.image} style={styles.BankImg} />
                               
                               </TouchableOpacity>
                               <View>
                                 <Text style={styles.bankName}>{item.bank}</Text>
                                 </View>
                          </Col>
                      ))
                  }
                  </Grid>
                <View>
                <Text style={[styles.titleText,{marginTop:5,fontSize:18}]}>Select Other Bank</Text>
               </View>
               <View style={[styles.reasonView,{}]} >
                  <Item style={{borderBottomWidth:0}} >
                        <Picker
                          note
                          mode="dropdown"
                          itemStyle={{fontFamily:'Font-Medium'}}
                          itemTextStyle={{fontFamily:'Font-Medium'}}
                          textStyle={{fontFamily:'Font-Medium'}}
                          style={styles.dorpDownReason}
                          selectedValue={this.state.selected}
                          onValueChange={this.onValueChange.bind(this)}
                          placeholderStyle={{borderWidth:10, fontFamily:'Font-Medium' }}
                          placeholderIconColor={{borderWidth:2}}
                          >
                          <Picker.Item label="Select Bank" style={{fontFamily:'Font-Medium'}} value="0" />
                          {

                            BankList.map(data=>(
                                 <Picker.Item key={data.key} label={data.bank} value={data.key} />
                          
                            ))
                          
                          }
                       
                         
                        </Picker>
                <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                </Item>
               </View>
               </View>
            </Tab>
        </Tabs>
 
          <TouchableOpacity style={styles.checkOutBtnArea} >
              <Button primary full style={styles.checkOutBtn} onPress={()=>this.props.navigation.navigate(Screens.OrderSuccess.route)}>
                  <Text style={styles.checkOutText}> Pay Now</Text>
               </Button>
          </TouchableOpacity>
       

          </Content>
      
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
export default connect(mapStateToProps, mapDispatchToProps)(MyPayments);