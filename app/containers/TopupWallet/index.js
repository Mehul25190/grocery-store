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
import * as cartActions from "../../actions/cart";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList,CardDetails} from '../data/data';
import CheckBox from 'react-native-check-box';
import { showToast } from '../../utils/common';

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
        CardChecked:null,
        cardList: [],
        amount: '',
    };
   
  }
 componentDidMount() {
      this.setState({
      // showAddCard:true
      });
    }
 onPressSubmit = item => {
  console.log(item);
  this.props.rechargeWithCVV(this.props.user.user.id, 26, 100, 123).then(res => {
    if(res.data.isAutoDebit == 'N'){
      const temp_html = res.data.html;
      const temp = temp_html.replace(/\\/g, "");

      this.props.navigation.navigate(Screens.CardWalletPayment.route, {html:temp});
    }else{
      showToast('Wallet updated successfully', "success");
      this.props.navigation.navigate(Screens.MyWallet.route);
    }
  })
    //this.props.navigation.navigate('MyPayments', { item });
  };

  getCardDetail(){
    this.props.fetchCardDetails(this.props.user.user.id).then(res => {
      console.log('card', res.data.cardList);
      this.setState({cardList: res.data.cardList});
    });
  }
 
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  }

  ShowCardList(){
    this.getCardDetail();
    this.setState({
      showMyCard:true,
      showAddCard:false
    });
  }

  ShowAddCard(){
    if(this.state.amount == ''){
      showToast('Please enter the amount', "danger");
      return;
    }
    
    this.props.navigation.navigate(Screens.WalletOrderPayment.route, {userId:this.props.user.user.id, amount: this.state.amount});

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
                      <Input style={styles.inputStyle}
                        value={this.state.amount} 
                        onChangeText={(value) => {this.setState({amount:value});} } 
                        />
             </Item>
         </View>

        <View style={styles.TopupView}>

                 <ListItem style={styles.PayMethodOther} icon>
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
                 
              {/* Card credentail box */}

              
            
              { this.state.showMyCard==true && (
               <FlatList
                data={this.state.cardList}
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
      
    
  </View>
 
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
      fetchCardDetails: (userId) => dispatch(cartActions.fetchCardDetails({userId: userId})),
      deleteCard: (userId, id) => dispatch(cartActions.deleteCard({userId: userId, id: id})),
      rechargeWithCVV: (userId, cardId, amount, cvv) => dispatch(userActions.rechargeWallet({userId: userId, cardId: cardId, amount: amount, cvv: cvv})),
      recharge: (userId, cardId, amount ) => dispatch(userActions.rechargeWallet({userId: userId, cardId: cardId, amount: amount})),

   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(TopupWallet);