import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date,ScrollView,FlatList } from 'react-native'
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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem, Form,Item,Label,Input,Radio
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList,CardDetails} from '../data/data';
import CheckBox from 'react-native-check-box';

class TopupWallet extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
        isChecked:false,
          showMyCard:false,
        showAddCard:false,
           CardChecked:0,
    };
   
  }
 componentDidMount() {
      this.setState({
       showAddCard:true
      });
    }
 onPressSubmit = item => {
  console.log(item);
    this.props.navigation.navigate('MyPayments', { item });
  };

 
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
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
    return (
      <Container style={appStyles.container}>

       <Headers
          IconLeft='arrowleft'
          onPress={() => this.openControlPanel()}
          IconRightF='search'
              setCart={true}
          bgColor='transparent'
          Title='Topup Wallet'
         />
      

       
        <ScrollView>
      
          
         <View style={styles.TopupView}>

             <Item style={{borderColor:Colors.primary,height:70,marginBottom:10}} stackedLabel>
                      <Label style={styles.amountLabel}>Enter Amount</Label>
                      <Input  />
             </Item>
            
             <Card style={[appStyles.addBox,{height:'auto',paddingVertical:0,marginLeft:0,marginRight:0}]}>
                 
                     <ListItem noBorder>
          
                          <Body style={styles.cardLabel}>
                            <Text style={styles.cardText}>Credit / Debit Card</Text>
                          </Body>
                         {/*   // <CheckBox style={{}}
                                // style={{backgroundColor:Colors.primary,width:30,height:30,justifyContent:'center',alignItems:'center'}}
                                  //  checked={true} /> */}
                       <CheckBox
                          style={{borderColor:Colors.primary, width:32, borderRadius:5, borderWidth:2}}
                          onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                          }}

                          checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
                          unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
                          isChecked={this.state.isChecked}
                       //   leftText={"CheckBox"}
                      />
                           
                      </ListItem> 
                 
              </Card>
              </View>
 { this.state.isChecked==true && 

  (<View style={styles.TopupView}>

                 <ListItem style={styles.PayMethodOther} icon>
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
                 
              {/* Card credentail box */}

              
            
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
                      isSaveChecked:!this.state.isSaveChecked
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.isSaveChecked}
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
      
    
  </View>)
  }  
      <TouchableOpacity style={{marginBottom:50}}>
              <Button full primary style={[appStyles.btnSecontary]} onPress={()=>this.onPressSubmit('TopupWallet')}>
                <Text style={[styles.redButton]}>Submit</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(TopupWallet);