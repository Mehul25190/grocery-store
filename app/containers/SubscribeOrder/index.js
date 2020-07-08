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
    value:15,
    duration:'15 Days'
  },
  {
    key:2,
    value:30,
    duration:'30 Days'
  },
  {
    key:3,
    value:60,
    duration:'60 Days'
  },
  {
    key:4,
    value:180,
    duration:'180 Days'
  },
 
];

class SubscribeOrder extends React.Component {

  constructor(props) {

    super(props);
    let item = this.props.navigation.getParam('item')
    let qty = this.props.navigation.getParam('qty')

     this.state = {
      radioBtnsData: ['Daily', 'Alternate Days'],
      checked: 0,
      selected: false,
      excludeWeekend: 0,
      date: '',
      time: '',
      //qty: item.quantity && mode != 'save' ? item.quantity : 1,
      qty: qty ? qty : 1,
      duration: 15,
      isChecked:true,
      itemId: item.id,
      subscriptionDtls: item, 
      subscriptionDtlsImg: {},
      startDate: moment(new Date()).add(1, 'days').format('MM/DD/YYYY'),
      endDate: moment(new Date(), "MM/DD/YYYY").add(15, 'days').format('MM/DD/YYYY'), 
      displaystartDate: moment(new Date()).format('DD MMM YYYY'),
      excludeWeekend: 0,
    };
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);

  }

  componentDidMount() {
  
  }

  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  onDurationValueChange(value) {
    this.setState({
      duration: value,
      endDate: moment(this.startDate).add(value, 'days').format('MM/DD/YYYY')
    });
  }

  setStartDate(value){
    this.setState({startDate: value, displaystartDate: moment(value).format('DD MMM YYYY'), endDate: moment(value).add(this.state.duration, 'days').format('MM/DD/YYYY')})
  }

  setEndDate(value){
    this.setState({endDate: moment(value).format('MM/DD/YYYY')})
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
    const data = {
      userAddressDtlsId: this.props.deliveryAddress.id,
      itemId: this.state.itemId,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      duration: this.state.duration,
      frequency: this.state.checked == 0  ? 'daily' : 'alternate',
      excludeWeekend: this.state.excludeWeekend,
      isActive: 1,
      quantity: this.state.qty
    };

    this.props.saveSubscribeOrderDetails(data).then(res=> {
        if(res.status == 'success'){
          this.props.navigation.navigate(Screens.SubscribeSuccess.route, {subscriptionDate: this.state.displaystartDate})
        }else{
          showToast("Please enter proper value","danger");
        }
    });
  }

  render(){
    const { navigation, deliveryAddress } = this.props;
    const getItem = navigation.getParam('item');
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='Subscribe Order'
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
                      onChange={value => this.setState({qty: value})} 
                      onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                       minValue={1}
                      totalWidth={90} 
                      totalHeight={20} 
                      iconSize={10}
                      borderColor={Colors.primary}
                      step={1}
                      valueType='real'
                      rounded 
                      textColor={Colors.primary}
                      iconStyle={{ color: Colors.primary,fontSize:13 }} 
                      rightButtonBackgroundColor='#fff' 
                      leftButtonBackgroundColor='#fff'
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
                 <Text style={styles.AmuText}>MRP: <Text style={{}}>{'\u20B9'}</Text> {this.state.subscriptionDtls.price}</Text>
                </View>
              </Col>
            </Row>
            
          </Grid>

         
        </Card>
        <Grid>
          <Row style={{marginTop:20}}>
           
           <Item  success style={{ marginLeft:Layout.indent, marginRight:Layout.indent}}>
            <Label style={styles.datelabel}>Start Date</Label>
            <DatePicker
            minDate={moment(new Date()).add(1, 'days').format('MM/DD/YYYY')}
            locale={"en"}
            format="MM/DD/YYYY"
            onDateChange={this.setStartDate}
            date={this.state.startDate}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            iconSource={imgs.calImg}
            customStyles={{dateInput: { borderWidth:0, marginTop: 10 }}}
            />
          </Item>
       
          
          
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
          <Row style={{marginTop:20}}>
           
          
           <Item  success style={{ marginLeft:Layout.indent, marginRight:Layout.indent}}>
           <Label style={styles.datelabel}>End Date</Label>
            <DatePicker
            minDate={this.state.endDate}
            locale={"en"}
            format="MM/DD/YYYY"
            onDateChange={this.setEndDate}
            date={this.state.endDate}
            confirmBtnText="Done"
            cancelBtnText="Cancel"
            iconSource={imgs.calImg}
            customStyles={{dateInput: { borderWidth:0, marginTop: 10 }}}
            />
  
          </Item>
         
          </Row>
        </Grid>
        <View style={[styles.HoriLine,{marginTop:10}]}>
          <Text></Text>
        </View>
        <Grid>
          <Row style={{ flex: 1, marginLeft:Layout.indent, marginTop:5, marginBottom:5, flexDirection: 'row'}}>
        
        {this.state.radioBtnsData.map((data, key) => {

        return (<View key={key}>       
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
            <Text style={styles.payText}>Subscribe Start Date </Text>
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
  console.log(state.subscription.deviveryAddress);
  return {
    user: state.auth.user,
    isLoading: state.common.isLoading,
    deliveryAddress: state.subscription.deviveryAddress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      getItemDetail: (id) => dispatch(subscriptionAction.getItemDetail({itemId: id})),
      saveSubscribeOrderDetails: (data) => dispatch(subscriptionAction.saveSubscribeOrderDetails(data)),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeOrder);