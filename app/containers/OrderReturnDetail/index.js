import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, TextInput, ScrollView, FlatList } from 'react-native';
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
  Header, Left, Body, Title, Right, Card, Grid, Col, Row, ListItem, Item, Input, label, Picker
} from 'native-base';
import url from "../../config/api";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as cartActions from "../../actions/cart";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { ReturnReason } from '../data/data';
import { showToast } from '../../utils/common';


class OrderReturnDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //default value of the date time
      date: '',
      time: '',
      selected: 0,
      returnItems:[]
    };

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
      time: hours + ':' + min
    });
  }
  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  dateFormate(date) {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let orderDate = new Date(date);
    let getDate = orderDate.getDate() + " " + monthNames[orderDate.getMonth()] + " " + orderDate.getFullYear();
    return getDate;
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
      switch1Value: value
    });
  }

  makeObject = (orderItemId,returnReason,returnQty) => {
    alert("Pending");
    const orderReturnItem = 
      {
      "orderItemId": orderItemId,
      "returnReason": returnReason,
      "returnQty": returnQty,
      "image":''
    };
    this.props.orderReturn(JSON.stringify(orderReturnItem)).then(res => {

    });
  }
   onPressSubmit = (item) => {
     
     //start
      //to make demo object & call api
      this.state.returnItems = [
        {
        "orderItemId": 1,
        "returnReason": "Quality",
        "returnQty": 1,
        "image":''
      },
      {
        "orderItemId": 1,
        "returnReason": "Quality",
        "returnQty": 1,
        "image":''
      },
    ];
     

        //return order api call
        this.props.saveReturnOrder(JSON.stringify(this.state.returnItems)).then (res =>{
          
         // console.log(res);
          if(res.status == "success"){
              // showToast("Save Successfully","success");
              showToast(res.message,"success");
              this.props.navigation.navigate('Confirmation', { item });
          } else {
                console.log("something wrong with order return process");
                showToast("Something wrong with Server response","danger");
          }
          
        })
        .catch(error => {
            console.log('Error messages returned from server', error);
            showToast("Error messages returned from server","danger");
        });
     //end
    };


  renderItems = ({ item, index }) => (

    <View>

    <ListItem icon style={[styles.ListItems,{borderColor:Colors.primary,borderTopWidth:1,paddingTop:15 }]} noBorder>
      <Left>
        <Image style={styles.proImage} source={{ uri: url.imageURL + item.imagePath }} />
      </Left>
      <Body style={styles.bodyText}>
            <Text  numberOfLines={2}  style={styles.proTitle}>{item.itemName} </Text>
             <Text style={[styles.proTitle, { fontFamily: 'Font-Medium' }]}>
             <Text style={{ fontFamily: 'Roboto', color: '#000' }}>{Colors.CUR}</Text> {item.itemPrice} (Qty:{item.quantity})</Text>   
      </Body>
     

      <Right style={styles.ListRight}>
        <View style={styles.RigView}>
          <Icon name='camera' type='FontAwesome' style={styles.camera} />
        </View>
        <View style={[styles.RigView, styles.qtyCol]}>
          <Text style={styles.qtyText}>Qty</Text>
          <Input keyboardType='numeric' style={styles.qtyInput} value={item.quantity}  maxLength={2}  /> 
          
        </View>

        <Button style={styles.RigView} style={styles.returnBtn}>
          <TouchableOpacity onPress={() => this.makeObject()} >
            <Text style={styles.btnText}> Return </Text>
          </TouchableOpacity>
        </Button>
      </Right>
    </ListItem>
     <View style={{ merginRight: Layout.indent, justifyContent: 'center'}}>
             
              <View style={styles.reasonView} >
                <Item style={{ borderBottomWidth: 0 }} >
                  <Picker
                    note
                    mode="dropdown"
                    style={styles.dorpDownReason}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                    placeholderStyle={{ borderWidth: 10 }}
                    placeholderIconColor={{ borderWidth: 2 }}
                  >
                     {/* <Picker.Item label="Select Reason to Return Order" value={0} key={0} /> */}
                    {

                      ReturnReason.map(data => (
                        <Picker.Item key={data.key} label={data.reason} value={data.key} />

                      ))

                    }


                  </Picker>
                  <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                </Item>
              </View>
            </View>   
    </View>
  );

  render() {
    const { navigation } = this.props;
    const orderData = navigation.getParam('orderData');
    const getItem = navigation.getParam('orderItem');

    return (
      <Container style={appStyles.container}>

        <Headers
          IconLeft='arrowleft'
          onPress={() => this.openControlPanel()}
          IconRightF='search'
          setCart={true}
          bgColor='transparent'
          Title='Return Order Details'
        />


        <ScrollView>
          <Card style={[appStyles.addBox, { height: 'auto', }, styles.orderBox]}>
            <Grid style={{paddingBottom:10,}}>
              <Row style={styles.orderRow}>
                <Col style={styles.orderTitle}>
                  <Text style={styles.orderTitleText}>Order Date</Text>
                </Col>
                <Col style={styles.orderValue}>
                  <Text style={styles.orderValText}>{(orderData.length > 0) ? orderData[0].orderDate : ""}</Text>
                </Col>
              </Row>
              <Row style={styles.orderRow}>
                <Col style={styles.orderTitle}>
                  <Text style={styles.orderTitleText}>Order#</Text>
                </Col>
                <Col style={styles.orderValue}>
                  <Text style={styles.orderValText}>{(orderData.length > 0) ? orderData[0].orderNumber : ""}</Text>
                </Col>
              </Row>
              <Row style={styles.orderRow}>
                <Col style={styles.orderTitle}>
                  <Text style={styles.orderTitleText}>Order Total</Text>
                </Col>
                <Col style={styles.orderValue}>
                  <Text style={styles.orderValText}>
                    <Text style={{ fontFamily: 'Roboto', color: 'gray' }}>{Colors.CUR}
                    </Text>{(orderData.length > 0) ? orderData[0].orderAmt : ""}</Text>
                </Col>
              </Row>
            </Grid>

           

            <ScrollView>
              <FlatList

                initialScrollIndex={this.currentIndex}
                showsHorizontalScrollIndicator={false}
                data={getItem}
                renderItem={this.renderItems}
                keyExtractor={(item) => `${item.itemName}`}
              />
            </ScrollView>




          </Card>

        </ScrollView>
        <View style={styles.doneBtnArea}>
          <Button priamary full style={styles.doneBtn}>
            <TouchableOpacity onPress={() => this.onPressSubmit('OrderReturnDetail')}>
              <Text style={styles.btnTextDone}>Done</Text>
            </TouchableOpacity>
          </Button>
        </View>







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
    saveReturnOrder: (returnItems) => dispatch(userActions.saveReturnOrder(returnItems)),
    orderReturn: (returnItem) => dispatch(cartActions.orderReturn({returnItem})),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(OrderReturnDetail);