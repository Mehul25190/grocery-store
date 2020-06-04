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

class MyOrder extends React.Component {

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
              setCart={true}
              setFilter={true}
              IconRightT='sound-mix'
              StyleIconRightT={{marginRight:10}}
              bgColor='transparent'
              Title='My Order'
              IconsRightT={styles.IconsRightT}
             />
      
          <Content enableOnAndroid>
        
   
    <View style={{flex:0,zIndex:-1, width:200, }}>
         <View>
          <Text style={styles.BalanceTitle}>
           Recent Order
          </Text>
        </View>

         <View style={styles.dateRow}>
          <Text style={styles.walletDate}>
            {this.state.date}
          </Text>
        </View>
</View>
         {

             orderList.map((item, index) => {
                  return (
                  
                        <ListItem style={styles.ListItems} noBorder>
                          <Left style={styles.ListLeft}>
                            <TouchableOpacity style={styles.prodInfo}  onPress={() => this.onDetailPage(item,index)}>
                            <Image style={styles.proImage} source={item.image} />
                            </TouchableOpacity>
                          </Left>

                        <Body style={styles.bodyText}>
                            <TouchableOpacity style={styles.prodInfo} onPress={() => this.onDetailPage(item,index)}>
                            {/* <Text style={styles.proTitle}>{item.proName}</Text>*/}
                            <Text numberOfLines={1} style={styles.proTitle}>{item.orderId}</Text>
                            <Text style={styles.paidTime}>{this.dateFormate(item.date)} {item.time}</Text>

                            </TouchableOpacity>
                        </Body>

                        <Right style={styles.ListRight}>
                            <View>
                              <Text style={styles.proPrice}>{'\u20B9'}  {item.price}</Text>
                              <Button style={styles.statusBtn}>
                              <TouchableOpacity >

                              <Text style={styles.statusText}>
                              {item.status}
                              </Text>

                              </TouchableOpacity>
                              </Button>                      
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
export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);