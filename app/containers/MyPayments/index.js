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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CheckBox from 'react-native-check-box';
import {BankList} from '../data/data';
import {BankOptions} from '../data/data';

const CardDetails =[
  {
    id:1,
    cardNo:'0011',
    ExpiredM:'01',
    ExpiredY:'2022',
    autoDebit:'yes',

  },
   {
    id:2,
    cardNo:'0025',
    ExpiredM:'11',
    ExpiredY:'2024',
    autoDebit:'no',

  }
];
class MyPayments extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
      //default value of the date time
      date: '',
      time: '',
      value: null ,
      selected: '0',
       switch1Value: false,
       showMyCard:false,
       showAddCard:false,
         
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
   toggleSwitch1= (value) =>{
      this.setState({
           switch1Value: value
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
           
{/* ---------------------------------Credit / Debit Card----------------------------------*/}

         <ScrollView style={{marginLeft:Layout.indent, marginRight:Layout.indent}}>
            <Grid style={{borderBottomWidth:1,marginTop:15, paddingBottom:5, borderColor:'#ddd'}}>
              <Row>
                <Col>
                  <Text style={styles.testStyles}>Total Order Value</Text>
                </Col>
               <Col style={{flex:0, width:60}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currency}>{'\u20B9'}</Text> 200.00</Text>
               </Col>
              </Row>
               <Row>
                <Col>
                  <Text style={styles.testStyles}>Delivery Charges/Subscription Fees</Text>
                </Col>
                <Col style={{flex:0, width:60}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currency}>{'\u20B9'}</Text> 200.00</Text>
               </Col>
              </Row>
            </Grid>
            <Grid style={{paddingTop:5,marginBottom:10}}>
              <Row>
                <Col>
                  <Text style={styles.testStyles}>Total Amount Payable </Text>
                </Col>
               <Col style={{flex:0, width:60}}>
                 <Text style={styles.testStyles}><Text style={appStyles.currency}>{'\u20B9'}</Text> 100.00</Text>
               </Col>
              </Row>
               <Row>
                <Col>
                  <Text style={[styles.testStyles,{color:Colors.primary}]}>Your Savings with this order</Text>
                </Col>
                <Col style={{flex:0, width:60}}>
                 <Text style={[styles.testStyles,{color:Colors.primary}]}><Text style={[appStyles.currency,{color:Colors.primary}]}>{'\u20B9'}</Text> 200.00</Text>
               </Col>
              </Row>
            </Grid>
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
                      <Text style={styles.payOptions}>Current Balance: <Text style={[appStyles.currency,{fontSize:12}]}>{'\u20B9'}</Text>1000</Text>
                    </View>

                    <TouchableOpacity style={styles.walletBtn} onPress={()=>this.props.navigation.navigate(Screens.TopupWallet.route)}>
                      <Text style={styles.walletBtnText}>Topup </Text>
                      <Icon name="wallet" type="Entypo" style={{color:Colors.primary}} />
                    </TouchableOpacity>
                </ListItem>   
                 <ListItem style={styles.PayMethodOther} icon>
                   <Left style={styles.payRadio} onPress={() => this.setState({ selected: !this.state.selected })}>
                       <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />
                   </Left>
                  <Body style={{flex:0,borderBottomWidth:0, justifyContent:'center',alignItems:'flex-start'}}>
                    <Text style={styles.payOptionscard}>Pay with Card    </Text>
                   
                  </Body>

                   <TouchableOpacity style={styles.cardAdd} onPress={()=>this.ShowCardList()}>
                      <Text style={styles.cardAddText}>My card </Text>
                      <Icon name="credit-card" type="MaterialIcons" style={{color:Colors.primary}} />
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.cardAdd} onPress={()=>this.ShowAddCard()}>
                      <Text style={styles.cardAddText}>Add card </Text>
                      <Icon name="plus" type="AntDesign" style={{color:Colors.primary}} />
                    </TouchableOpacity>
                </ListItem>  
                  <ListItem style={styles.PayMethodOther} icon>
                    <Left style={styles.payRadio} onPress={() => this.setState({ selected: !this.state.selected })}>
                       <Radio type="radio" selected={this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />
                    </Left>

                    <Body style={{borderBottomWidth:0}}>
                      <Text style={styles.payOptionscard}>Pay with Cash</Text>
                      <Text style={[styles.payCashText,{color:Colors.gray}]}>(Eligible with amount above {'\u20B9'}5000)</Text>
                    </Body>

                    <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Text style={[styles.walletBtnText,{textTransform:'uppercase',lineHeight:15,paddingBottom:0}]}>Cash</Text>
                        <Icon name="cash" type="MaterialCommunityIcons" style={{color:Colors.primary,paddingTop:0,marginTop:0}} />
                    </View>
                </ListItem>  
              {/* Card credentail box */}

              
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
                        <View style={{}}>
                         <Radio type="radio" selected={item.id==2 && this.state.selected} color={Colors.primary} selectedColor={Colors.primary}  />
                        </View>
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
           
      
              
             { (this.state.showAddCard==true || getTab=='TopupWallet') && (
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
              <Button primary full style={styles.checkOutBtn} onPress={()=>this.props.navigation.navigate(Screens.OrderSuccess.route)}>
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