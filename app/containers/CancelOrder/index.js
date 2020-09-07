import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date} from 'react-native'
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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { showToast } from '../../utils/common';

class CancelOrder extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
    };

  }
  openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }
  onPressSubmit = item => {

    const { navigation } = this.props;
    const getItem = navigation.getParam('item');

    //alert(getItem[0].id);
    this.props.myCancelOrder(getItem[0].id).then (res =>{
      
        //console.log(res);
        if(res.status == "success"){
            
          showToast(res.message,"success");
        } else {
              //console.log("something wrong with varification call");
              showToast("Something wrong with Server response","danger");
        }
         
      })
      .catch(error => {
          //console.log('Error messages returned from server', error);
          showToast("Error messages returned from server","danger");
      });

    this.props.navigation.navigate('Confirmation', { item });
  }
  render(){
     const { navigation } = this.props;
    const getItem = navigation.getParam('item');
    //alert(getItem[0].orderAmt);
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='Cancel Order'
             />
      
          <Content enableOnAndroid>
        <View style={{ marginTop:Layout.indent}}>
            <View style={{marginLeft:Layout.indent, marginRight:Layout.indent,}}>
                <Text style={styles.msgTitleTxt}>
                Are You Sure?
                </Text>
            <Text style={styles.msgText}>
               Your order will be cancelled once you click "Cancel Order" & your payment will be deposited in your wallet.
            </Text>
            </View>
            <View style={styles.borderTop}>
            </View>
            {/* <ListItem noBorder style={{paddingTop:10, height:30, alignItems:'flex-start'}}>
              <Left style={{alignItems:'flex-start',textAign:'left', marginLeft:0, paddingLeft:0}}>
                <Text style={styles.TotalTitle}>Sub Total</Text>
              </Left>
              <Right>
              <Text style={styles.cancelRs}>{Colors.CUR}{getItem.price}</Text>
              </Right>
            </ListItem>
              <ListItem style={{paddingBottom:30,height:35,borderColor:Colors.primary}}>
              <Left>
                <Text style={styles.TotalTitle}>Delivery</Text>
              </Left>
              <Right>
              <Text style={styles.cancelRs}>{Colors.CUR} 50.00</Text>
              </Right>
    </ListItem> */}
            <ListItem noBorder>

              <Body>
              <Text style={styles.TotalTitle}>Total: {Colors.CUR} {(getItem[0].orderAmt !="" )? getItem[0].orderAmt : ""} </Text> 
              </Body>

            </ListItem>
           <TouchableOpacity>
              <Button style={[styles.cancelBtn,{marginTop:30,marginLeft:Layout.indent,marginRight:Layout.indent}]}
               primary full  onPress={()=>this.onPressSubmit('CancelOrder')}>
               
                <Text style={styles.cancelBtnTxt}>Cancel Order </Text>
                
              </Button>
              </TouchableOpacity>
            
            </View>
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
      myCancelOrder: (orderId) => dispatch(userActions.cancelOrder({orderId: orderId})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder);