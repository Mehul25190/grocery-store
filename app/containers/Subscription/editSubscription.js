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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,Label, Picker, Radio
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import * as subscriptionAction from "../../actions/subscription";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box';
import { showToast } from '../../utils/common';
import moment from "moment";
import DatePicker from 'react-native-datepicker'
import url from '../../config/api';


const DurationList =[
  {
    key:1,
    value:14,
    duration:'15 Days'
  },
  {
    key:2,
    value:29,
    duration:'30 Days'
  },
  {
    key:3,
    value:59,
    duration:'60 Days'
  },
  {
    key:4,
    value:179,
    duration:'180 Days'
  },
 
];

class editSubscribe extends React.Component {

  constructor(props) {
    super(props);
    let item = this.props.navigation.getParam('item')
     this.state = {
      radioBtnsData: ['Daily', 'Alternate Days'],
      selected: false,
      date: '',
      time: '',
      qty: 1,
      duration: 15,
      isChecked:true,
      itemId: item.id,
      subscriptionDtls: {}, 
      subscriptionDtlsImg: {},
      startDate: '',
      endDate: '', 
      displaystartDate: item.startDate ? moment(item.startDate).format('DD MMM YYYY') : moment(new Date()).format('DD MMM YYYY'),
      excludeWeekend: 0,
    };
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);

  }
   componentDidMount() {

    this.props.fetchSubscriptionDtlsById(this.state.itemId).then(res=>{
      //console.log(res)
      if(res.status == "success"){
          const subScriDet = res.data.subscriptionDtls[0]
          this.setState({ 
              subscriptionDtls: res.data.subscriptionDtls[0],
              startDate: moment(subScriDet.startDate).format('DD/MM/YYYY'),
              endDate: moment(subScriDet.endDate).format('DD/MM/YYYY'),
              duration: subScriDet.duration,
              checked: subScriDet.frequency == 'daily' ? 0 : 1,
              excludeWeekend: subScriDet.excludeWeekend,
              isActive: 1,
              qty: subScriDet.quantity,
              displaystartDate: moment(subScriDet.startDate).format('DD MMM YYYY'),
          });
      } 
    });

    
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

   onDurationValueChange(value) {
    // alert(value);
     var s_Date = moment(this.state.startDate, 'DD/MM/YYYY')
    this.setState({
      duration: value,
      endDate: moment(s_Date).add(value, 'days').format('DD/MM/YYYY')
    });
  }

  setStartDate(value){
    console.log(value)
    var value = moment(value, 'DD/MM/YYYY')
    this.setState({startDate: value, displaystartDate: moment(new Date(value)).format('DD MMM YYYY'),  endDate: moment(new Date(value)).add(this.state.duration, 'days').format('DD/MM/YYYY')})
  }

  setEndDate(value){
    var value = moment(value, 'DD/MM/YYYY')
    this.setState({endDate: moment(value).format('DD/MM/YYYY')})
  }


  subscribeSubmitHandler(){
    if(this.state.startDate == ''){
      showToast("Please select start date","danger");
      return;
    }
    if(this.state.endDate == ''){
      showToast("Please select end date","danger");
      return;
    }

    var sd = moment(this.state.startDate, 'DD/MM/YYYY');
    var start_date = moment(sd).format('MM/DD/YYYY');

    var ed = moment(this.state.endDate, 'DD/MM/YYYY');
    var end_date = moment(ed).format('MM/DD/YYYY');

    const data = {
      id: this.state.itemId,
      userAddressDtlsId: this.props.deliveryAddress.id,
      itemId: this.state.itemId,
      startDate: start_date,
      endDate: end_date,
      duration: this.state.duration,
      frequency: this.state.checked == 0  ? 'daily' : 'alternate',
      excludeWeekend: this.state.excludeWeekend,
      isActive: 1,
      quantity: this.state.qty
    };
   
    this.props.saveSubscribeOrderDetails(data).then(res=> {
        if(res.status == 'success'){
          showToast("Subscription modified successfully.","success");
          this.props.navigation.navigate(Screens.Subscription.route)
        }else{
          showToast("Please enter proper value","danger");
        }
    });

  }

  render(){
    const { navigation, deliveryAddress } = this.props;
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='Modify Subscription'
             />
      
          <Content enableOnAndroid>
        { this.props.isLoading ?
            <Spinner color={Colors.secondary} style={appStyles.spinner} /> :
            (<View>
        <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
          <Grid >
            <Row style={styles.firstRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Subscribe</Text>
              </Col>
              <Col style={styles.QtyBox}>
                <View>
                  <NumericInput 
                   inputStyle={{fontSize:13}}
                      value={this.state.qty} 
                      //onChange={value => this.setState({qty: value})} 
                      onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                       minValue={this.state.qty}
                       maxValue={this.state.qty}
                      totalWidth={95} 
                      totalHeight={30} 
                      iconSize={10}
                      borderColor={Colors.primary}
                      step={1}
                      valueType='real'
                      rounded 
                      textColor={Colors.primary}
                      iconStyle={{ color: Colors.primary,fontSize:20 }} 
                      rightButtonBackgroundColor='#fff' 
                      leftButtonBackgroundColor='#fff'
                      editable={false}
                    />
                </View> 
              </Col>
            </Row>
             <Row style={styles.secondRow}>
              <Col style={styles.amulCol}>
                <Image source={{uri: url.imageURL+this.state.subscriptionDtls.imagePath} } style={styles.amulMoti} />
              </Col>
              <Col style={styles.amulInfo}>
                <View>
                 <Text style={styles.AmuText}>{this.state.subscriptionDtls.brandName}</Text>
                 <Text style={[styles.AmuText,styles.AmuTextTitle]}>{this.state.subscriptionDtls.itemName}</Text>
                 <Text style={styles.AmuText}>{this.state.subscriptionDtls.weight} {this.state.subscriptionDtls.uom}</Text>
                 {/*<Text style={styles.AmuText}>Qty: {this.state.subscriptionDtls.quantity}</Text>*/}
                 <Text> <Text style={{}}>{Colors.CUR}</Text> {this.state.subscriptionDtls.price}</Text>
                </View>
              </Col>
            </Row>
            
          </Grid>

         
        </Card>
        <Grid>
           <Row style={{justifyContent:'center'}}>
              <Col style={styles.startDateCol}>
                   <Text style={styles.startDate}>Start Date</Text>
              </Col>
              <Col style={styles.amulInfo}>
                <View>
                   <DatePicker
            minDate={moment(new Date()).format('DD/MM/YYYY')}
            locale={"en"}
            disabled={moment(this.state.startDate).format('DD/MM/YYYY') > moment(new Date()).format('DD/MM/YYYY') ? false : true }
            format="DD/MM/YYYY"
            onDateChange={this.setStartDate}
            date={this.state.startDate}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            iconSource={imgs.calImg}
            customStyles={{dateInput: { borderWidth:0, marginTop: 10, height:30 }}}
            />
                </View>
              </Col>
            </Row>
        </Grid>
           <View style={styles.reasonView} >
            <Item style={{borderBottomWidth:0}} >
                <Picker

                  mode="dropdown"
                  iosHeader="Select Duration"
                  headerStyle={{ backgroundColor: Colors.primary }}
                  itemStyle={{fontFamily:'Font-Medium'}}
                  itemTextStyle={{fontFamily:'Font-Medium'}}
                  textStyle={{fontFamily:'Font-Medium'}}
                  style={styles.dorpDownReason}
                  selectedValue={this.state.duration}
                  onValueChange={(value, index) => this.onDurationValueChange(value)}

                  placeholderStyle={{borderWidth:10, fontFamily:'Font-Medium' }}
                  placeholderIconColor={{borderWidth:2}}
                  >
                  {

                    DurationList.map(data=>(
                         <Picker.Item key={data.key} label={data.duration} value={data.value} />
                  
                    ))
                  
                  }
               
                 
                </Picker>
                <Image source={imgs.DownArrowColor} style={styles.DownArrow} />
                </Item>
               </View>
       
        <Grid >
        <Row style={{justifyContent:'center',marginBottom:15,}}>
              <Col style={styles.startDateCol}>
                   <Text style={styles.startDate}>End Date</Text>
              </Col>
              <Col style={styles.amulInfo}>
                <View>
          <DatePicker
            minDate={this.state.endDate}
            locale={"en"}
            format="DD/MM/YYYY"
            onDateChange={this.setEndDate}
            date={this.state.endDate}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            iconSource={imgs.calImg}
            customStyles={{dateInput: { borderWidth:0, marginTop: 10 }}}
            />
                </View>
              </Col>
            </Row>

        </Grid>
        <View style={[styles.HoriLine,{marginTop:10}]}>
          <Text></Text>
        </View>
       
        <Grid>
          <Row style={{ flex: 1, marginLeft:Layout.indent, marginTop:5, marginBottom:5, flexDirection: 'row'}}>
        
        {this.state.radioBtnsData.map((data, key) => {
          return (  <View key={key}>       
                  {this.state.checked == key ?
                  
                      <Col style={[styles.btn,{}]}>
                          <Icon style={styles.img} name='radio-button-checked' type='MaterialIcons' />
                          <Text style={[styles.bodyText, styles.bodyGreen]}>{data}</Text>
                      </Col>
                   
                      :
                    
                      <Col onPress={()=>{this.setState({checked: key})}} style={[styles.btn,{}]}>
                          <Icon style={styles.img} name='radio-button-unchecked' type='MaterialIcons' />
                          <Text style={[styles.bodyText, styles.bodyGreen]}>{data}</Text>
                      </Col>
                    

                  }
                </View>  
          )
      })}
       </Row>
        </Grid> 
         <View style={styles.HoriLine}>
              <Text></Text>
            </View>
         <ListItem noBorder icon>
          <Left>
          <CheckBox
               style={styles.checkboxStyle}
               onClick={(value)=>{
                  this.setState({
                      excludeWeekend:!this.state.excludeWeekend ? 1 : 0,
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.excludeWeekend}
            />
            
          </Left>
           <Body>
                    
             <View>
              <Text style={[styles.bodyText,styles.bodyGreen]}>Exclude Weekend  </Text>
               <Text style={styles.bodyNote} note>(We are Ok if you skip weekend delivery)</Text>
              </View> 
          </Body>
         
        </ListItem>

         <View >
          <Text style={styles.title}>Delivery Address </Text>
         </View>

        <Card style={[appStyles.addBox,styles.deliveryAddress]}>
       
          <ListItem  noBorder icon style={{ marginLeft: Layout.indent,}}>
                <Left >
                  <Icon name="location-on" 
                   type="MaterialIcons"
                   
                    style={[appStyles.IconStyle,styles.addressIcon]}
                    />
                </Left>
                <Body>
                  <Text style={[appStyles.userArea,styles.addressText]} >{deliveryAddress ? deliveryAddress.buildingName + ',' : ''}</Text>
                  <Text style={[appStyles.userCity,styles.addressText]} >{deliveryAddress ? deliveryAddress.cityName + ' - ' + deliveryAddress.state : ''} </Text>
                 
                </Body>

                <Right>
                 <TouchableOpacity  onPress={()=>this.props.navigation.navigate(Screens.MyAddress.route)}>
                  <Icon name="edit" type="MaterialIcons"
                 
                    style={[appStyles.IconStyle,styles.addressIcon]}
                    />
                </TouchableOpacity>
                </Right>
              </ListItem>
          
      
          </Card>

          <Grid style={styles.payBtn}>
          <Row>
            <Col style={{justifyContent:'center'}}>
            <View style={{}}>
            <Text style={styles.payText}>Subscription Start Date </Text>
            <Text style={styles.payText}> {this.state.displaystartDate}</Text>
            </View> 
            </Col>
            <Col style={{justifyContent:'flex-end',width:140}}>
             <Button style={styles.paynowBtn} primary full>
              <TouchableOpacity onPress={()=> this.subscribeSubmitHandler()} >
                <Text style={styles.payTextNow}> Subscribe</Text>
                </TouchableOpacity>
              </Button>
            </Col>
          </Row>
          </Grid>
          </View>)}
          </Content>
        
      </Container>
     
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoading: state.common.isLoading,
    deliveryAddress: state.subscription.deviveryAddress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      fetchSubscriptionDtlsById: (id) => dispatch(subscriptionAction.fetchSubscriptionDtlsById({id: id})),
      saveSubscribeOrderDetails: (data) => dispatch(subscriptionAction.saveSubscribeOrderDetails(data)),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(editSubscribe);