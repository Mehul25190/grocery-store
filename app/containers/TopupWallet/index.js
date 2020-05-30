import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date,ScrollView } from 'react-native'
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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem, Form,Item,Label,Input
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import CheckBox from 'react-native-check-box';

class TopupWallet extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
        
    };
   
  }

 onPressSubmit = item => {
  console.log(item);
    this.props.navigation.navigate('MyPayments', { item });
  };

 
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
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
         <Form>
          
         <View >

             <Item style={{justifyContent:'flex-start',borderColor:Colors.primary, marginRight:Layout.indent, marginTop:0}} stackedLabel>
                      <Label style={styles.amountLabel}>Enter Amount</Label>
                      <Input  />
             </Item>
            
             <Card style={[appStyles.addBox,{height:'auto'},styles.cardBox]}>
                 
                     <ListItem noBorder>
          
                          <Body style={styles.cardLabel}>
                            <Text style={styles.cardText}>Credit / Debit Card, NetBanking</Text>
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
         
         
        </Form>
     

        </ScrollView> 
          <TouchableOpacity style={{marginBottom:50}}>
              <Button full primary style={[appStyles.btnSecontary]} onPress={()=>this.onPressSubmit('TopupWallet')}>
                <Text style={[styles.redButton]}>Submit</Text>
              </Button>
          </TouchableOpacity>
         
        
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