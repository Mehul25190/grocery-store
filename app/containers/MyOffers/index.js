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
import {orderList} from '../data/data';

class MyOffers extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       status:''
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
      time:   hours + ':' + min ,
      status:'Pending'
    });
      


  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

    onDetailPage = (item,index) => {
     
      if(item.status == 'Pending'){
        this.props.navigation.navigate('OrderDetail', { item });    
      }
      else{
        this.props.navigation.navigate('OrderReturn', { item });
      }
    
  };

  dateFormate(date){
    var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let orderDate = new Date(date);
  let getDate=orderDate.getDate() + " "+ monthNames[orderDate.getMonth()] +" "+orderDate.getFullYear();
  return getDate;
  }

  render(){
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
               IconRightF='search'
             
              
               IconRightT='sound-mix'
               StyleIconRightT={{marginRight:10}}
              bgColor='transparent'
              Title='My Offers'
              IconsRightT={styles.IconsRightT}
             />
      
          <Content enableOnAndroid>
        
   
    
         <View>
          <Text style={styles.BalanceTitle}>
           Special Offers
          </Text>
        </View>

         <View style={styles.dateRow}>
          <Text style={styles.walletDate}>
          Valid till  {this.state.date}
          </Text>
        </View>

         {

             orderList.map((item, index) => {
                  return (
                  
                        <ListItem style={styles.ListItems} noBorder>
                          <Left style={styles.ListLeft}>
                            <TouchableOpacity style={styles.prodInfo}  >
                            <Icon style={styles.proImage} name='gift' type='AntDesign' />
                            </TouchableOpacity>
                          </Left>

                        <Body style={styles.bodyText}>
                            <TouchableOpacity style={styles.prodInfo} >
                     
                            <Text numberOfLines={1} style={styles.proTitle}>Get offers in Grocery</Text>
                            <Text style={styles.paidTime}>{this.dateFormate(item.date)} {item.time}</Text>

                            </TouchableOpacity>
                        </Body>

                        <Right style={styles.ListRight}>
                            <View>
                              <Text style={styles.proPrice}>{Colors.CUR}  {item.price}</Text>
                                                 
                            </View>
                        </Right>
                        </ListItem> 
                     
                 
                  );
                })
           }
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
export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);