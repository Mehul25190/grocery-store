import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, TextInput, ScrollView, FlatList, Alert } from 'react-native';
import _ from 'lodash';
import { Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar, Headers, ScreenLoader } from '../../components';
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
import CheckBox from 'react-native-check-box';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';

class OrderReturnDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //default value of the date time
      date: '',
      time: '',
      selected: 0,
      returnItems:[],
      qty: "",
      slectedProp: [],
      folder: '',
      itemid: '',
      image: '',
      imageindex: [],
      checked: true,
      orderID: '',
      orderData: [],  
      orderItem:[],
    };

  }


  componentDidMount() {

    this.focusListener = this.props.navigation.addListener("willFocus", () => {
      const { navigation } = this.props;
      const orderData = navigation.getParam('orderData');
      this.setState({orderID: orderData[0].id})

      this.props.getOrderDetails(orderData[0].id).then (res =>{ 
        //console.log(res.data);
        this.setState({ orderData:res.data.orderDetails});
        this.setState({ orderItem:res.data.orderItems });
      });
    });
    
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
    console.log(value)
    this.setState({
      selected: value,
      switch1Value: value
    });
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async (clickIndex) => {
    Alert.alert(
      'Select Image',
      'Please select Image mediam for pickup.',
      [
        { text: 'Open Camera', onPress: () => this.Camera(clickIndex) },
        { text: 'Open Gellary', onPress: () => this.Gellary(clickIndex) },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    )
  };

  Camera = async (clickIndex) => {
    let result = await ImagePicker.launchCameraAsync({
      //launchImageLibraryAsync
      //launchCameraAsync
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.ValidateSize(result.base64)
    }
  }

  Gellary = async (clickIndex) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.ValidateSize(result.base64)
    }
  } 
  ValidateSize(file) {
    const File = file.length
    console.log(File)
    const size = Math.round((File / 1024))
    console.log(size)
    if (size > 2048) {
      alert(
        "Image size should be less than 2mb");
    } else {
      this.setState({ image: file });
    }
  }


  agregarFavoritos(clickIndex, val, itemsid, quantity) {

    var array = [...this.state.slectedProp];
    var folder = [...this.state.folder]
    var item = [...this.state.itemid]

    var index = array.indexOf(clickIndex)
    var idindex = folder.indexOf(val)
    var itemindex = item.indexOf(val)

    if (val > quantity) { 
      array.splice(index, 1);
      folder.splice(idindex, 1);
      item.splice(itemindex, 1);
      return showToast("Please verify ordered quantity ", "danger")
    }

    if (val == '') {
      var checkbox = [...this.state.qty];
      var index = checkbox.indexOf(itemsid)
      checkbox.splice(index, 1);
      this.setState({ qty: checkbox, });
    }

    if (index !== -1) {
      array.splice(index, 1);
      folder.splice(idindex, 1);
      item.splice(itemindex, 1);

      array.push(clickIndex)
      folder.push(val)
      item.push(itemsid)

      this.setState({ slectedProp: array, folder: folder, itemid: item, });
    }
    else {
      array.push(clickIndex)
      folder.push(val)
      item.push(itemsid)

      this.setState({ slectedProp: array, folder: folder, itemid: item, });
    }

  }

  makeObject = (orderItemId,returnReason) => {
   // alert("Pending");
    const orderReturnItem = 
      {
      "orderItemId": orderItemId,
      "returnReason": this.state.selected,
      "returnQty": this.state.qty,
      "image":''
    };
    this.props.orderReturn(JSON.stringify({"orderItemId": orderItemId, "returnReason": this.state.selected, "returnQty": this.state.qty, "image":''})).then(res => {
      console.log(res)
    });
  }
  
  checkbox(clickIndex, OrderID, Name, orderData, returnValidityHours) {
    console.log(returnValidityHours)
    var deliveryDateTime = orderData[0].orderDeliveryDate+' '+orderData[0].deliveryToTime;
    var validReturnDateTime = moment(deliveryDateTime).add(returnValidityHours, 'hours').format('YYYY-MM-DD hh:mm:ss');
    var currentDateTime = moment(new Date()).add(1, 'days').format('YYYY-MM-DD hh:mm:ss')
    if(currentDateTime > validReturnDateTime){
      showToast("Your can't return this item", "danger")
      return;
    }
    // if(validReturnDateTime > )

    const { folder, image } = this.state
    var array = [...this.state.qty];
    var index = array.indexOf(clickIndex)

    this.data = {
      'orderId': this.state.orderID,
      "orderItemId": clickIndex,
      "returnReason": this.state.selected,
      "returnQty": this.state.folder[0],
      "image": JSON.stringify(image),
    }

    //console.log(index);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ qty: array, });
    }
    else {
      if (folder.length > 0) {
        array.push(clickIndex)
        this.setState({ qty: array, });
        this.props.orderReturn(this.data).then(res => {
          //console.log(res)
          if (res.status == "success") {
              this.props.getOrderDetails1(this.state.orderData[0].id).then (res =>{ 
                this.setState({ orderData:res.data.orderDetails});
                this.setState({ orderItem:res.data.orderItems });
              });
             
            this.setState({ image: '' })
            return showToast(Name + " is Returned", "success")
          }
        })
      } else {
        showToast("Please Add Qty", "danger")
      }
    }

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



    <ListItem icon style={[styles.ListItems,{borderColor:Colors.secondary,borderTopWidth:1,paddingTop:15 }]} noBorder>
      <Left>
        <Image style={styles.proImage} source={{ uri: url.imageURL + item.imagePath }} />
      </Left>
      <Body style={styles.bodyText}>
            <Text style={styles.proTitle}>{item.itemName} </Text>
             <Text style={[styles.proTitle, { fontFamily: 'Font-Medium' }]}>
             <Text style={{ fontFamily: 'Roboto', color: '#000' }}>{Colors.CUR}</Text> {item.itemPrice} (Qty: {item.quantity})</Text>   
      </Body>
     

      {item.itemStatus != 'RET' && (item.isReturnable == 1 || item.isReturnable == null) ?
        (<Right style={styles.ListRight}>
      
          <TouchableOpacity
            onPress={() => this._pickImage(item.itemId)}
            style={styles.RigView}>
            <Icon name='camera' type='FontAwesome' style={styles.camera} />
          </TouchableOpacity>

          <View style={[styles.RigView, styles.qtyCol]}>
            <Text style={styles.qtyText}>Qty</Text>
            <TextInput
              value={this.state.folder == '' ? '' : this.state.folder}
              onChangeText={(text) => this.agregarFavoritos(index + 1, text, item.itemId, item.quantity)}
              style={styles.qtyInput}
              keyboardType='numeric'
              maxLength={2} />
          </View>

          <CheckBox
            style={styles.checkboxStyle}
            onClick={() => this.checkbox(item.id, this.state.orderID, item.itemName, this.state.orderData, item.returnValidityHours)}
            checkedImage={<Icon name='check' type='AntDesign' style={{ color: Colors.primary, paddingLeft: 5, paddingTop: 1 }} />}
            unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons'
              style={{ color: 'transparent' }} />}
            isChecked={this.state.qty.indexOf(item.id) !== -1}
          />
      </Right>) : (<Right style={{marginTop:20, width:100}}><Text style={styles.qtyText}>{item.isReturnable == 0 ? 'Not Returnable' : 'Returned'}</Text></Right> )}
    </ListItem>
    {item.itemStatus != 'RET' && (item.isReturnable == 1 || item.isReturnable == null) ?
      (<View style={{ merginRight: Layout.indent, justifyContent: 'center'}}>    
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
                        <Picker.Item key={item.id+''+data.key} label={data.reason} value={data.reason} />

                      ))
                    }
                  </Picker>
                  <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                </Item>
              </View>
            </View>) : null }  
    </View>
  );

  render() {
    const { navigation } = this.props;
    const orderData = this.state.orderData;
    const getItem = this.state.orderItem;

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
          <ScreenLoader  loading={this.props.Loading} />

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
                  <Text style={styles.orderTitleText}>Order #</Text>
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
                    </Text> {(orderData.length > 0) ? orderData[0].orderAmt : ""}</Text>
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
        {/*<View style={styles.doneBtnArea}>
          <Button priamary full style={styles.doneBtn}>
            <TouchableOpacity onPress={() => this.onPressSubmit('OrderReturnDetail')}>
              <Text style={styles.btnTextDone}>Done</Text>
            </TouchableOpacity>
          </Button>
        </View>*/}







      </Container>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    Loading: state.common.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userActions.logoutUser()),
    saveReturnOrder: (returnItems) => dispatch(userActions.saveReturnOrder(returnItems)),
    orderReturn: (returnItem) => dispatch(cartActions.orderReturn(returnItem)),
    getOrderDetails: (orderId) => dispatch(userActions.getOrderDetailById({id: orderId})),
    getOrderDetails1: (orderId) => dispatch(userActions.getOrderDetailById1({id: orderId})),
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(OrderReturnDetail);