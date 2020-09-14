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
import moment from "moment";
import {productList} from '../data/data';

class MyWallet extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
      time: '',
      userWallet: {},
      activityList: [],
    };

  }
  
   componentDidMount() {

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.fetchUserWallet(); 
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
      time:   hours + ':' + min 
    });
  }

  fetchUserWallet(){
    this.props.fetchUserWallet(this.props.user.user.id).then(res => {
      //console.log(res.data.walletBalance);
      this.setState({userWallet: res.data, activityList: res.data.activityList})
    })
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }

    

  render(){
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              setCart={true}
              bgColor='transparent'
              Title='My Wallet'
             />
      
      <Content enableOnAndroid style={appStyles.content}>
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (
            <View>
        <View>
          <Text style={styles.BalanceTitle}>
            Current Balance
          </Text>
        </View>
        <Card style={[appStyles.addBox,{height:'auto'},styles.walletBox]}>
          <Grid>
            <Row style={styles.walletRow}>
              <Col style={styles.walletCol}>
                <Image source={imgs.wallet}  style={styles.walletIcon} />
              </Col>
              <Col style={styles.amountCol}>
                <Text style={styles.amountRs}>{Colors.CUR} {this.state.userWallet.walletBalance}</Text>
              </Col>
            </Row>
          </Grid>

         
        </Card>
   
      <TouchableOpacity >
        <Button full primary style={appStyles.btnSecontary}
        onPress= {()=> this.props.navigation.navigate(Screens.TopupWallet.route)}
        >
          <Text style={[styles.redButton]}>Topup Wallet</Text>
        </Button>
       </TouchableOpacity>
         <View>
          <Text style={styles.BalanceTitle}>
          Wallet Activity
          </Text>
        </View>


         {this.state.activityList.map((item, index) => {
                  return (
                      

                      <Row style={styles.ListItems}>
                          <Col style={{justifyContent:'flex-start',}}>
                            <View style={styles.prodInfo}>
                           {/* <Text style={styles.proTitle}>{item.proName}</Text>*/}
                            <Text  style={styles.proTitle}>{item.orderNumber} </Text>
                            <Text style={styles.paidTime}>status: {item.status} </Text>
                             <Text style={styles.paidTime}>{moment(item.date).format('DD MMM YYYY HH:mm')}</Text>
                            
                          </View>
                          </Col>
                          <Col style={styles.ListRight}>

                              <Text style={item.activityType == 'PAID' ? styles.proPrice : styles.proPriceGreen}>{Colors.CUR} {item.amount}</Text>
                          </Col>
                      </Row>
                  
                  );
                })
           }
        </View>
            )}
          </Content>
      </Container>
     
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
      logout: () => dispatch(userActions.logoutUser()),
      fetchUserWallet: (userId) => dispatch(userActions.fetchUserWallet({userId: userId})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);