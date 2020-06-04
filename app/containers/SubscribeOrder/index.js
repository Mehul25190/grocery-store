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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,DatePicker,Label, Picker
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box';
const DurationList =[
 {
    key:1,
    duration:'30 Days'
  },
  {
    key:2,
    duration:'60 Days'
  },
  {
    key:3,
    duration:'180 Days'
  },
 
];

class SubscribeOrder extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       value:1,
           selected: '0',
           isChecked:true
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
      time:   hours + ':' + min 
    });
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    };

   onValueChange(value: string) {
    this.setState({
      selected: value,
      switch1Value: value
    });
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
              Title='Subscribe Order'
             />
      
          <Content enableOnAndroid>
       
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
                      value={this.state.value} 
                      onChange={value => this.setState({value})} 
                      onLimitReached={(isMax,msg) => console.log(isMax,msg)}
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
                <Image source={imgs.amulMoti} style={styles.amulMoti} />
              </Col>
              <Col style={styles.amulInfo}>
                <View>
                 <Text style={styles.AmuText}>Amul</Text>
                 <Text style={[styles.AmuText,styles.AmuTextTitle]}>Amul Moti</Text>
                 <Text style={styles.AmuText}>500 ml</Text>
                 <Text style={styles.AmuText}>Qty: 1</Text>
                 <Text style={styles.AmuText}>MRP: <Text style={{}}>{'\u20B9'}</Text> 28</Text>
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
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={true}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: Colors.primary,paddingLeft:0,paddingBottom:3 }}
            placeHolderTextStyle={{ color: "transparent" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Image source={imgs.calImg} style={{marginLeft:20}} style={styles.calImage} />
          </Item>
       
          
          
          </Row>
        </Grid>
           <View style={styles.reasonView} >
            <Item style={{borderBottomWidth:0}} >
                <Picker
                  note
                  mode="dropdown"
                  iosHeader="Select Duration"
                  headerStyle={{ backgroundColor: Colors.primary }}
                  itemStyle={{fontFamily:'Font-Medium'}}
                  itemTextStyle={{fontFamily:'Font-Medium'}}
                  textStyle={{fontFamily:'Font-Medium'}}
                  style={styles.dorpDownReason}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                  placeholderStyle={{borderWidth:10, fontFamily:'Font-Medium' }}
                  placeholderIconColor={{borderWidth:2}}
                  >
                  <Picker.Item label="Select Duration" style={{fontFamily:'Font-Medium'}} value="0" />
                  {

                    DurationList.map(data=>(
                         <Picker.Item key={data.key} label={data.duration} value={data.key} />
                  
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
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
           textStyle={{ color: Colors.primary,paddingLeft:0,paddingBottom:3 }}
            placeHolderTextStyle={{ color: "transparent" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Image source={imgs.calImg}  style={styles.calImage} />
          </Item>
         
          </Row>
        </Grid>
        <View style={[styles.HoriLine,{marginTop:10}]}>
          <Text></Text>
        </View>
       
       <ListItem noBorder icon>
          <Left>
          <CheckBox
               style={styles.checkboxStyle}
               onClick={()=>{
                  this.setState({
                      isChecked:!this.state.isChecked
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.isChecked}
            />
          </Left>
           <Body style={{justifyContent:'center',alignItems:'flex-start'}}>
              <View>
              <Text style={[styles.bodyText, styles.bodyGreen]}>Daily   </Text>
              </View> 
                       
          </Body>
          <Right>
            <CheckBox
               style={[styles.checkboxStyle,{height:30,width:30}]}
               onClick={()=>{
                  this.setState({
                      isChecke:!this.state.isChecke
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary,paddingLeft:2, paddingTop:0,fontSize:26}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.isChecke}
            />
             <View>
              <Text style={[styles.bodyText,styles.bodyGreen]}>Alternate Days   </Text>
              </View> 
          </Right>
        </ListItem>
         <View style={styles.HoriLine}>
              <Text></Text>
            </View>
         <ListItem noBorder icon>
          <Left>
          <CheckBox
               style={styles.checkboxStyle}
               onClick={()=>{
                  this.setState({
                      Checked:!this.state.Checked
                  })
                }}
              checkedImage={<Icon name='check' type='AntDesign' style={{color:Colors.primary}} />}
              unCheckedImage={<Icon name='check-box-outline-blank' type=' MaterialIcons' style={{color:'transparent'}} /> }
              isChecked={this.state.Checked}
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
                  <Text style={[appStyles.userArea,styles.addressText]} >South Bopal,</Text>
                  <Text style={[appStyles.userCity,styles.addressText]} >Ahmedabad - Gandhinagar,</Text>
                 
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
            <Text style={styles.payText}> {this.state.date}</Text>
            </View> 
            </Col>
            <Col style={{justifyContent:'flex-end',width:140}}>
             <Button style={styles.paynowBtn} primary full>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.SubscribeSuccess.route)} >
                <Text style={styles.payTextNow}> Subscribe</Text>
                </TouchableOpacity>
              </Button>
            </Col>
          </Row>
          </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeOrder);