import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date } from 'react-native'
import _ from 'lodash';
import { Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right, Card, Grid, Col, Row, ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { orderList } from '../data/data';
import { MenuProvider } from 'react-native-popup-menu';
class MyOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //default value of the date time
      date: '',
      time: '',
      status: '',
      orderData: [],  
      selectedStatus: '',
    };
    this.courseFilterArr = [];

  }

  componentDidMount() {

    var that = this;
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date().getDate(); //Current Date
    var month = monthNames[new Date().getMonth()]; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    that.setState({
      //Setting the value of the date time
      date: date + ' ' + month + ' ' + year,
      time: hours + ':' + min,
      status: 'Pending'
    });
    //get user's order List
    

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getOrderList();
      this.setState({selectedStatus: ""})
    });
  }
  componentWillUnmount(){
    this.focusListener.remove();
  }
 

  getOrderList() {
    //alert(this.props.user.user.id);
    this.props.getOrderList(this.props.user.user.id).then (res =>{
      
      //console.log(orderData);
        if(res.status == "success"){
          //console.log(res);
          if(res.data.orderList!=null){
            this.setState({ orderData:res.data.orderList});
            this.courseFilterArr = res.data.orderList; 
          }else{
            this.courseFilterArr = [];
          }
          
        } else {
          //console.log("something wrong with varification call");
          showToast("Something wrong with Server response","danger");
        }
         
      })
      .catch(error => {
          console.log('Error messages returned from server', error);
          showToast("Error messages returned from server","danger");
      });
  }

  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  onDetailPage = item => {
    //alert(item.orderStatus);
    //this.props.navigation.navigate('ProductList', { para_categoryId:item.id, categoryName: item.categoryName});
  
    if (item.orderStatus == 'PEN') {
      this.props.navigation.navigate('OrderDetail', { orderId:item.id });
    }
    else  if (item.orderStatus == 'CAN') {
      alert("Your order already has been canceled");
    } 
    else  if (item.orderStatus == 'DEL') {
      this.props.navigation.navigate('OrderReturn', { orderId:item.id });
    } 
    else  if (item.orderStatus == 'CNF') {
      this.props.navigation.navigate('OrderDetail', { orderId:item.id });
    }  
    else {
      this.props.navigation.navigate('OrderDetail', { orderId:item.id });

     // this.props.navigation.navigate('OrderReturn', { orderId:item.id });
    }

  };

  dateFormate(date) {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let orderDate = new Date(date);
    let getDate = orderDate.getDate() + " " + monthNames[orderDate.getMonth()] + " " + orderDate.getFullYear();
    return getDate;
  }

  SearchWithStatusFilter(text) {
    //passing the inserted text in textinput
    const newData = this.courseFilterArr.filter(function (item) {
      return text == item.orderStatus;
    });
    this.setState({
      orderData: newData,
      selectedStatus: text,
    });
  }

  render() {
    return (
      <MenuProvider customStyles={appStyles.containerProvider} >
        <Container style={appStyles.container}>

          <Headers
            IconLeft='arrowleft'
            onPress={() => this.openControlPanel()}
            IconRightF='search'
            setCart={true}
            setFilter={true}
            searchFilter={this.SearchWithStatusFilter.bind(this)}
            selectedStatus={this.state.selectedStatus}
            IconRightT='sound-mix'
            StyleIconRightT={{ marginRight: 10 }}
            bgColor='transparent'
            Title='My Order'
            IconsRightT={styles.IconsRightT}
          />

        <Content enableOnAndroid style={appStyles.content}>
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (
            <View>


              <View style={{ flex: 0, zIndex: -1, width: 200, }}>
                <View>
                  <Text style={styles.BalanceTitle}>
                  Recent Orders
                 </Text>
              </View>
              { /*
              <View style={styles.dateRow}>
                <Text style={styles.walletDate}>
                  {this.state.date}
                </Text>
              </View>
              */}
            </View>
           
            {
               (this.state.orderData.length < 1) ? 
                  <Text style={{flexDirection:'row',textAlign:"center"}}>No Orders</Text> : null 
                
            }
            {

              //orderList.map((item, index) => {
                
              this.state.orderData.map((item, index) => {
                return (

                  <ListItem style={styles.ListItems} noBorder>
                    {/*</*Left style={styles.ListLeft}>
                      <TouchableOpacity style={styles.prodInfo} onPress={() => this.onDetailPage(item, index)}>
                        <Image style={styles.proImage} source={item.image} />
                      </TouchableOpacity>
                </Left> */}
                  
                    <Body style={styles.bodyText}>
                      <TouchableOpacity style={styles.prodInfo} onPress={() => this.onDetailPage(item)}>
                        {/* <Text style={styles.proTitle}>{item.proName}</Text>*/}
                        <Text numberOfLines={1} style={styles.proTitle}>{item.orderNumber}</Text>
                        <Text style={styles.paidTime}>{this.dateFormate(item.orderDate)} {item.orderTime}</Text>

                      </TouchableOpacity>
                    </Body>

                    <Right style={styles.ListRight}>
                      <View>
                        <Text style={styles.proPrice}>{Colors.CUR}  {item.orderAmt}</Text>
                        <Button style={styles.statusBtn}>
                          <TouchableOpacity onPress={() => this.onDetailPage(item)}>

                            <Text style={styles.statusText}>
                              {(item.orderStatus=="DEL") ? "Delivered" : ""}
                              {(item.orderStatus=="PEN") ? "Pending" : ""}
                              {(item.orderStatus=="CAN") ? "Canceled" : ""}
                              {(item.orderStatus=="CNF") ? "Confirmed" : ""}
                              {(item.orderStatus=="RET") ? "Returned" : ""}
                              {(item.orderStatus=="PICKED") ? "Picked" : ""}
                              {(item.orderStatus=="ASGNBACK") ? "Assign Back" : ""}
                            </Text>

                          </TouchableOpacity>
                        </Button>
                      </View>
                    </Right>
                  </ListItem>


                );
              })
            }
            </View>
            )}
          </Content>

        </Container>
      </MenuProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoading: state.common.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (useId) => dispatch(userActions.getUserOrderList({userId: useId})),
    logout: () => dispatch(userActions.logoutUser()),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);