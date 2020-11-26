import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date, FlatList} from 'react-native'
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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,DatePicker,Label
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box';
import * as subscriptionAction from "../../actions/subscription";
import url from '../../config/api';
import moment from "moment";


class SubscribeDetail extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       value:1,
       mySubscription: {},
    };

  }
   componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('willFocus', () => {
      this.mySubscriptionList();
    });
    this.mySubscriptionList();

  }

  mySubscriptionList(){
    //console.log('this.props.user.userId', this.props.user.user.id)
    this.props.mySubscriptionList(this.props.user.user.id).then(res => {
      //this.setState({mySubscription: res.data.subscriptionDtls})
    });
  }

  openControlPanel = () => {
    this.props.navigation.goBack(); // open drawer
  };

  playPauseSub = (item) => {
    let status = 'PAU';
    if(item.status == 'PAU'){
      status = 'RES';
    }
    this.props.playPauseSub(item.id, status).then(res => {
        this.mySubscriptionList();
    });
  }

  componentWillUnmount(){
    this._unsubscribe.remove();
  }

  renderItems = ({ item, index}) => {
    //console.log(index, item)
    if(item.status.trim() != 'CAN')  {
    return (
    <View>
      <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
          <Grid >
            <Row style={styles.firstRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Frequency:</Text>
              </Col>
              <Col style={styles.dailyTitle}>
                 <Text style={styles.dayText}>{item.frequency}</Text>
              </Col>
            </Row>
             <Row style={styles.secondRow}>
              <Col style={styles.amulCol}>
                <Image source={{uri: url.imageURL+item.imagePath} } style={styles.amulMoti} />
              </Col>
              <Col style={styles.amulInfo}>
                <View>
                 <Text style={styles.AmuText}>{item.brandName}</Text>
                 <Text style={[styles.AmuText,styles.AmuTextTitle]}>{item.itemName}</Text>
                 <Text style={styles.AmuText}>{item.weight} {item.uom}</Text>
                 {/*<Text style={styles.AmuText}>Qty: {item.quantity}</Text>*/}
                 <Text style={styles.AmuText}>Start Date: {moment(item.startDate).format('DD/MM/YYYY')}</Text>
                 <Text style={styles.AmuText}>End Date: {moment(item.endDate).format('DD/MM/YYYY')}</Text>
                 <Text> <Text style={appStyles.currencymedium}>{Colors.CUR}</Text> <Text style={appStyles.amountmedium}>{item.price}</Text></Text>
                </View>
              </Col>
            </Row>
            
          </Grid>
   
        </Card>
       <Grid>
        <Row style={styles.btnRow}>
          <Col style={styles.BtnCol}>
         
            <Button primary full style={styles.modifyBtn}>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.ModifySubscription.route, {item: item, mode: 'update'})}>
               <Icon name='edit' type='MaterialIcons' style={styles.modifyIcon} />
              <Text style={styles.btnText}> Modify </Text>
               </TouchableOpacity>
            </Button>
         
          </Col>
          <Col style={styles.BtnCol}>
          
            <Button   style={styles.deleteBtn}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.DeleteSubscribe.route, {item: item})}>
             <Icon name="trashcan" type="Octicons" style={styles.deleteIcon} />
              <Text style={[styles.btnText,{color:Colors.primary}]}>  Delete </Text>
             </TouchableOpacity>
            </Button>
            
       
          </Col>

         <Col style={[styles.BtnCol,{flex:0}]}>
         
            <Button   style={styles.pauseBtn}>
             <TouchableOpacity onPress={()=> this.playPauseSub(item)}>
             <Icon name={item.status == null || item.status != 'PAU' ? "pause-circle" : "play-circle"} type="FontAwesome5" style={styles.pauseIcon} />
             <Text style={[styles.btnText,{color:Colors.primary}]}>  {item.status == null || item.status != 'PAU' ?  'Pause' : 'Resume' } </Text>
            </TouchableOpacity>
            </Button>
            

          </Col>
        </Row>
       </Grid>
    </View>
    );
  }
  }

  render(){
    const { navigation, mySubscription } = this.props;
    console.log(mySubscription)
    const getItem = navigation.getParam('item');
    return (
      <Container style={appStyles.container}>
         <Headers
            IconLeft='arrowleft'
            onPress={() => this.openControlPanel()}
            IconRightF='search'
            setCart={true}
            bgColor='transparent'
            Title='My Subscription'
           />
       <Content enableOnAndroid>
       { this.props.isLoading ?
          <Spinner color={Colors.secondary} style={appStyles.spinner} /> :
          (<View>
            <View style={styles.topInstruction}>
              <Text style={styles.instruction}>
                Daily Delivery Before 7:00 AM
              </Text>
            </View>
            <FlatList 
               vertical
               initialNumToRender={mySubscription.length}
               showsVerticalScrollIndicator={false}
               numColumns={1}
               data={mySubscription}
               renderItem={this.renderItems}
               keyExtractor={item => `${item.id}`}
             />
             
             {mySubscription.length == 0 ? <View style={[appStyles.spinner, appStyles.norecordfound]}><Text>No Subscription Found</Text></View> : null }
           
            <View style={{height:20}}></View>
          </View>
        )}
        </Content>
        
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.common.isLoading,
    user: state.auth.user,
    mySubscription: state.subscription.mySubscription,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(userActions.logoutUser()),
      mySubscriptionList : (userId) => dispatch(subscriptionAction.mySubscriptionList({userId: userId})),
      playPauseSub: (id, status) => dispatch(subscriptionAction.playPauseSub({id: id, status, status})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeDetail);