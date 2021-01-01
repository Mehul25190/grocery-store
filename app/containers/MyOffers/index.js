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
import url from "../../config/api";

class MyOffers extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       status:'',
       offerList: [],
    };

  }
   componentDidMount() {

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.fetchUserOffer(); 
    });
 

  

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

  fetchUserOffer(){

      this.props.fetchUserOffer().then(res => {
        console.log("Adfad");
      console.log(res.data.offerList);
      this.setState({offerList: res.data.offerList})
    })
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
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

         {

          this.state.offerList.map((item, index) => {
                  return (
                  
                        <ListItem style={styles.ListItems} noBorder>
                          <Left style={styles.ListLeft}>
                            <TouchableOpacity style={styles.prodInfo}  >
                            
                            <Image style={styles.proImage} source={{ uri: url.imageURL + item.offerImage }} />
                            </TouchableOpacity>
                          </Left>

                        <Body style={styles.bodyText}>
                            <TouchableOpacity style={styles.prodInfo} onPress={() => this.props.navigation.navigate('SearchOffer', { offer_id: item.id ,comefrom: 'offer'})}>
                     
                            <Text numberOfLines={1} style={styles.proTitle}>{item.offerName}</Text>
                            <Text style={styles.paidTime}>{item.description}</Text>

                            </TouchableOpacity>
                        </Body>

                        
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
      fetchUserOffer: (userId) => dispatch(userActions.fetchUserOffer()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);