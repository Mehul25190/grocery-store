import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, ScrollView, FlatList, Alert} from 'react-native'
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers, DeliveryAddress } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem, Item, Picker
} from 'native-base';
import url from "../../config/api";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as cartActions from "../../actions/cart";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import { showToast } from '../../utils/common';


class OrderDetail extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       orderData: [],  
       orderItem:[],
       availTimeSlot: [],
    };
    

  }

  getAvailableSlots(getAvailableSlots){
    this.props.getAvailableTimeSlots(this.props.deliveryAddress.areaId, getAvailableSlots).then(res => {
      //console.log(JSON.stringify(res.data.availableTimeSlots))     
      const newArr = Object.keys(res.data.availableTimeSlots).map((key) => res.data.availableTimeSlots[key])
      const newArr1 = Object.keys(res.data.availableTimeSlots).map((key) => key)
      newArr.map((data, key) => {
          data.date = newArr1[key];
      });
      let availableSolts = Object.values(res.data.availableTimeSlots);
      let tempArr = [];
      availableSolts.map((maindata, key) => {
        maindata.slots.map((data, key1) => { 
          //console.log('date', maindata)
          //console.log('data', data);
          tempArr.push({id: maindata.date+' '+data.id, value: maindata.date+' '+data.time});
        })
      })
      //console.log('tempArr', tempArr)
      this.setState({availTimeSlot: tempArr})
    })
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
      time:   hours + ':' + min 
    });

    const { navigation } = this.props;
    const para_orderId = navigation.getParam('orderId');

    //alert(para_orderId);
    //get user's order List
    this.getOrderDetails(para_orderId);
  }

  onRatingPage = item => {
    //alert(item);
    //this.props.navigation.navigate('ProductList', { para_categoryId:item.id, categoryName: item.categoryName});
    if(this.state.orderData[0].orderStatus == 'CNF') {  
      this.props.navigation.navigate('MyRatings', { item:item });
    }
  
  };


  getOrderDetails(para_orderId) {
    //alert(para_orderId);
    this.props.getOrderDetails(para_orderId).then (res =>{
    
        if(res.status == "success"){
          //console.log(res.data.orderDetails["2020-06-17"]);
              this.setState({ orderData:res.data.orderDetails});
              this.setState({ orderItem:res.data.orderItems });       
        } else {
              console.log("something wrong with varification call");
              showToast("Something wrong with Server response","danger");
        }
        this.getAvailableSlots(res.data.orderDetails[0].deliverySlotId);
      })
      .catch(error => {
          console.log('Error messages returned from server', error);
          showToast("Error messages returned from server","danger");
      });
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

    onCancelPage = item => {
      this.props.navigation.navigate('CancelOrder', { item});
    };

    onValueChange(value: string) {
      setTimeout(() => {
        Alert.alert(
          "Update Time Slot",
          "Are you sure you want to change time slot?",
          [
            {
              text: "Cancel",
              onPress: () => this.setState({selected: ''}),
              style: "cancel"
            },
            { text: "Yes", onPress: () => this.updateTimeSlot(value) }
          ],
          { cancelable: false }
        );
      }, 800)
    }

    updateTimeSlot(value){
      var wordsArray = value.split(" ");
      var slotId = wordsArray[1];
      var slotDate = wordsArray[0];
      const { navigation } = this.props;
      const para_orderId = navigation.getParam('orderId');
      this.setState({selected: value});
      this.props.updateDeliverySlot(slotId, para_orderId, slotDate).then(res => {
        if(res.status == 'success'){
          showToast(res.message, 'success')
        }else{
          showToast(res.message, 'danger')
        }
      })
    }
  
  renderItems = ({ item, index }) => (
    <ListItem style={styles.ListItems} noBorder>
                <Left style={styles.ListLeft}>
                     <Image style={styles.proImage} source={{ uri: url.imageURL + item.imagePath }} />
                </Left>
              
                <Body style={styles.bodyText}>
                  <TouchableOpacity style={styles.prodInfo} onPress={() => this.onRatingPage(item)}>
                    <Text  style={[styles.proTitle,{  fontFamily:'Font-Medium'}]}>{item.itemName} </Text>
                    <Text style={styles.QtyPro}>Qty: {item.quantity}</Text>
                    <Text style={styles.proPrice}>{Colors.CUR} {item.itemPrice} {item.orderStatus}</Text>
                    
                  </TouchableOpacity>  
                 </Body>
                 {item.itemStatus == 'RET' ?
                 (<Right> 
                  <Text style={{width:85, marginRight:0}}>Returned</Text>
                </Right>) : (<Right/>)}
                
         </ListItem>
  );

  render(){

    const cancelOrderCard = <View><Card style={[appStyles.addBox,styles.trackBox,{borderBottomWidth:3,zIndex:0}]}>
    <TouchableOpacity onPress={()=> console.log()}>
    <Text style={styles.detailTitle2}>Track Shipment</Text>
    <Text style={styles.orderValText}>Your Order has being processed.</Text>
     <Row style={styles.orderRow}>
          <Col style={styles.orderTitle}>
            <Text style={styles.orderTitleText}> Delivery Date :</Text>
          </Col>
          <Col style={styles.orderValue}>
           <Text style={styles.orderValText}> {(this.state.orderData.length >0 )? this.state.orderData[0].orderDeliveryDate : ""}</Text>
          </Col>
    </Row>
     <Row style={styles.orderRow}>
          <Col style={styles.orderTitle}>
            <Text style={styles.orderTitleText}> Delivery Time :</Text>
          </Col>
          <Col style={styles.orderValue}>
           <Text style={styles.orderValText}> {(this.state.orderData.length >0 )? this.state.orderData[0].deliveryFromTime.replace(/:[^:]*$/,'') + ' : ' + this.state.orderData[0].deliveryToTime.replace(/:[^:]*$/,'') : ""}</Text>
          </Col>
    </Row>
    

    </TouchableOpacity>
  </Card>
   <Card style={[appStyles.addBox,styles.trackBox,{marginTop:-9,borderTopWidth:0,zIndex:-1}]}>

   <View style={styles.reasonView} >
                <Item style={{ borderBottomWidth: 0 }} >
                  <Picker
                    note
                    mode="dropdown"
                    placeholder="Select Delivery Time Slot" // yipeee, placeholder
                    style={styles.dorpDownReason}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    
                    {this.state.availTimeSlot.map((data, key) => {
                      //console.log(data)
                      return <Picker.Item key={data.id} label={data.value} value={data.id} />
                      })
                    }
                  </Picker>
                  <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                </Item>
              </View>
    <TouchableOpacity>
              <Button style={[styles.cancelBtn,{marginTop:30,marginLeft:Layout.indent,marginRight:Layout.indent}]}
               primary full   onPress={()=> this.onCancelPage(this.state.orderData)}>
               
                <Text style={styles.cancelBtnTxt}>Cancel Order </Text>
                
              </Button>
              </TouchableOpacity>
              
  </Card>
  </View>;

    
  const confirmOrderCard = <View>
    { /*<Card style={[appStyles.addBox,styles.trackBox,{borderBottomWidth:3,zIndex:0}]}>
    <TouchableOpacity onPress={()=> console.log()}>
      <Text style={styles.detailTitle2}>Track Shipment</Text>
      <Text style={styles.orderValText}>Your Order assiged to Delivery Boy.</Text>
      <Row style={styles.orderRow}>
          <Col style={styles.orderTitle}>
            <Text style={styles.orderTitleText}> Delivery Date :</Text>
          </Col>
          <Col style={styles.orderValue}>
           <Text style={styles.orderValText}> {(this.state.orderData.length >0 )? this.state.orderData[0].orderDeliveryDate : ""}</Text>
          </Col>
    </Row>
     <Row style={styles.orderRow}>
          <Col style={styles.orderTitle}>
            <Text style={styles.orderTitleText}> Delivery Time :</Text>
          </Col>
          <Col style={styles.orderValue}>
           <Text style={styles.orderValText}> {(this.state.orderData.length >0 )? this.state.orderData[0].deliveryFromTime + ' : ' + this.state.orderData[0].deliveryToTime : ""} </Text>
          </Col>
    </Row>
     
    </TouchableOpacity>
  </Card> */ }
   
  </View>;

    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='View Order Details'
             />
      
      <Content enableOnAndroid style={appStyles.content}>
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (
       <View>
        <Card style={[appStyles.addBox,{height:'auto'},styles.orderBox]}>
          <Grid >
            <Row style={styles.orderRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Order Date</Text>
              </Col>
              <Col style={styles.orderValue}>
               <Text style={styles.orderValText}>{(this.state.orderData.length >0 )? this.state.orderData[0].orderDate : ""}</Text>
              </Col>
            </Row>
             <Row style={styles.orderRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Order#</Text>
              </Col>
              <Col style={styles.orderValue}>
                <Text style={styles.orderValText}>{(this.state.orderData.length >0 )? this.state.orderData[0].orderNumber : ""}</Text>
              </Col>
            </Row>
             <Row style={styles.orderRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Order Total</Text>
              </Col>
              <Col style={styles.orderValue}>
                <Text style={styles.orderValText}>
                  <Text style={{fontFamily:'Roboto',color:'gray'}}>{Colors.CUR} </Text> {(this.state.orderData.length >0 )? this.state.orderData[0].orderAmt : ""}</Text>
              </Col>
            </Row>
          </Grid>

         
        </Card>

        
         <DeliveryAddress />
        
     
          <Card style={[appStyles.addBox,{height:'auto',borderBottomWidth:1},styles.orderBox]}>
          <View>
            <Text style={styles.detailTitle}>Shipment Details  </Text>
          </View>
          {/*
          <View>
            <Text style={styles.deliveryTitle}>Delivery Estimate: </Text>
            <Text style={styles.deliveryDate}>Monday {this.state.date} </Text>
          </View>
          */}
        
          <ScrollView>
                <FlatList
                  
                  initialScrollIndex={this.currentIndex}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.orderItem}
                  renderItem={this.renderItems}
                  keyExtractor={(item) => `${item.itemName}`}
                />
              </ScrollView>

          

         
        </Card>

        {   this.state.orderData.length >0 ? 
            (this.state.orderData[0].orderStatus == "PEN" ) ? cancelOrderCard : confirmOrderCard  
             : 
            null  
        } 
            
           
        </View> )}
          </Content>
        
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoading: state.common.isLoading,
    deliveryAddress: state.subscription.deviveryAddress,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getOrderDetails: (orderId) => dispatch(userActions.getOrderDetailById({id: orderId})),
      logout: () => dispatch(userActions.logoutUser()),
      getAvailableTimeSlots: (areaId, deliverySlot) => dispatch(cartActions.getAvailableTimeSlots({areaId:areaId, deliverySlot:deliverySlot})),
      updateDeliverySlot: (deliverySlot, orderId, deliveryDate) => dispatch(cartActions.updateDeliverySlot({deliverySlot:deliverySlot, orderId:orderId, deliveryDate:deliveryDate})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);