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
import {productList} from '../data/data';

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
  onPressSubmit=item =>{
    this.props.navigation.navigate('Confirmation', { item });
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
              Title='Cancel Order'
             />
      
          <Content enableOnAndroid>
        <View style={{ marginTop:Layout.indent}}>
            <View style={{marginLeft:Layout.indent, marginRight:Layout.indent,}}>
                <Text style={styles.msgTitleTxt}>
                Are You Sure?
                </Text>
            <Text style={styles.msgText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard
            </Text>
            </View>
            <View style={styles.borderTop}>
            </View>
            <ListItem noBorder style={{paddingTop:10, height:30, alignItems:'flex-start'}}>
              <Left style={{alignItems:'flex-start',textAign:'left', marginLeft:0, paddingLeft:0}}>
                <Text style={styles.TotalTitle}>Sub Total</Text>
              </Left>
              <Right>
              <Text style={styles.cancelRs}>{'\u20B9'} {getItem.price}</Text>
              </Right>
            </ListItem>
              <ListItem style={{paddingBottom:30,height:35,borderColor:Colors.primary}}>
              <Left>
                <Text style={styles.TotalTitle}>Delivery</Text>
              </Left>
              <Right>
              <Text style={styles.cancelRs}>{'\u20B9'} 50.00</Text>
              </Right>
            </ListItem>
               <ListItem noBorder>
              <Left>
                <Text style={styles.TotalTitle}>Total</Text>
              </Left>
              <Right>
              <Text>{'\u20B9'} 0.00</Text>
              </Right>
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
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder);