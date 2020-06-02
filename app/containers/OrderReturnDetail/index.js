import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, Picker,TextInput, ScrollView} from 'react-native';
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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,label
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {ReturnReason} from '../data/data';


class OrderReturnDetail extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       selected:'key0'
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

    dateFormate(date){
   var monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May','Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let orderDate = new Date(date);
  let getDate=orderDate.getDate() + " "+ monthNames[orderDate.getMonth()] +" "+orderDate.getFullYear();
  return getDate;
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
      switch1Value: value
    });
  }
   onPressSubmit = item => {
    this.props.navigation.navigate('Confirmation', { item });
    };
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
              Title='Return Order Details'
             />
      
   
       <ScrollView>
        <Card style={[appStyles.addBox,{height:'auto'},styles.orderBox]}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>
            Order ID - {getItem.orderId}
            </Text>
            <Text style={styles.Qty}>
             {getItem.quantity} Items
            </Text>
            <Text style={styles.dateTime}>
             {this.dateFormate(getItem.date)} 
            </Text>
            <Text style={styles.dateTime}>{getItem.time}</Text>
          </View>
          <View style={{merginRight:Layout.indent, justifyContent:'center'}}>
            <Text style={styles.title}>Select Reason to Return Order</Text>
              <View style={styles.reasonView} >
                <Picker
                  note
                  mode="dropdown"
                  style={styles.dorpDownReason}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                  placeholderStyle={{borderWidth:10 }}
                  placeholderIconColor={{borderWidth:2}}
                  >
                  <Picker.Item label="Select Reason to Return Order" value="0" />
                  {

                    ReturnReason.map(data=>(
                         <Picker.Item key={data.key} label={data.reason} value={data.key} />
                  
                    ))
                  
                  }
               
                 
                </Picker>
                <Image source={imgs.DownArrow} style={styles.DownArrow} />
               </View>
          </View>
        
         <ListItem icon style={styles.ListItems}>
            <Left>
               <Image style={styles.proImage} source={getItem.image} />
            </Left>
            <Body style={styles.bodyText}>
              <Text numberOfLines={1}  style={styles.proTitle}>{getItem.proName}</Text>
                    <Text style={styles.proTime}>{getItem.time}</Text>
            </Body>
            <Right  style={styles.ListRight}>
            <View style={styles.RigView}>
                        <Icon name='camera' type='FontAwesome' style={styles.camera} />
                    </View>     
                    <View style={[styles.RigView,styles.qtyCol]}>
                    <Text style={styles.qtyText}>Qty</Text>
                        <TextInput style={styles.qtyInput}
                         keyboardType='numeric'
                            maxLength = {2} value={10}  />
                    </View> 
                 
                        <Button style={styles.RigView} style={styles.returnBtn}>
                           <TouchableOpacity >
                             <Text style={styles.btnText}> Return </Text>
                           </TouchableOpacity>
                        </Button>
            </Right>
          </ListItem>
            <ListItem icon style={styles.ListItems}>
            <Left>
               <Image style={styles.proImage} source={getItem.image} />
            </Left>
            <Body style={styles.bodyText}>
              <Text numberOfLines={1}  style={styles.proTitle}>{getItem.proName}</Text>
                    <Text style={styles.proTime}>{getItem.time}</Text>
            </Body>
            <Right  style={styles.ListRight}>
            <View style={styles.RigView}>
                        <Icon name='camera' type='FontAwesome' style={styles.camera} />
                    </View>     
                    <View style={[styles.RigView,styles.qtyCol]}>
                    <Text style={styles.qtyText}>Qty</Text>
                        <TextInput style={styles.qtyInput}
                         keyboardType='numeric'
                            maxLength = {2} value={10}  />
                    </View> 
                 
                        <Button style={styles.RigView} style={styles.returnBtn}>
                           <TouchableOpacity >
                             <Text style={styles.btnText}> Return </Text>
                           </TouchableOpacity>
                        </Button>
            </Right>
          </ListItem>

        </Card>
        
        </ScrollView>
       <View style={styles.doneBtnArea}>
       <Button priamary full style={styles.doneBtn}>
        <TouchableOpacity onPress={()=>this.onPressSubmit('OrderReturnDetail')}>
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
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(OrderReturnDetail);