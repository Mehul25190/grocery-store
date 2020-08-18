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
<<<<<<< HEAD
      time: '',
      userWallet: {},
      activityList: [],
=======
       time: '',
       walletData: [], 
       userWallet:0,
>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
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

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getUserWalletList();
      
    });

    

  }

  fetchUserWallet(){
    this.props.fetchUserWallet(this.props.user.user.id).then(res => {
      console.log(res.data.walletBalance);
      this.setState({userWallet: res.data, activityList: res.data.activityList})
    })
  }
    openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
    }

    getUserWalletList() {
      //alert(this.props.user.user.id);
      this.props.getWalletList(this.props.user.user.id).then (res =>{
        
        //console.log(orderData);
          if(res.status == "success"){
            console.log("After sucess nirav");
            console.log(res);
                if(res.data.activityList!=null){
                  this.setState({ walletData:res.data.activityList});
                  this.setState({ userWallet:res.data.walletBalance});
                  
                } 
          } else {
                console.log("something wrong with varification call");
                showToast("Something wrong with Server response","danger");
          }
           
        })
        .catch(error => {
            console.log('Error messages returned from server', error);
            showToast("Error messages returned from server","danger");
        });
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
      
<<<<<<< HEAD
          <Content enableOnAndroid>
=======
      <Content enableOnAndroid style={appStyles.content}>
>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
          {this.props.isLoading ? (
            <Spinner color={Colors.secondary} style={appStyles.spinner} />
          ) : (
            <View>
<<<<<<< HEAD
=======

>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
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
<<<<<<< HEAD
                <Text style={styles.amountRs}>{Colors.CUR} {this.state.userWallet.walletBalance}</Text>
=======
    <Text style={styles.amountRs}>{Colors.CUR}{this.state.userWallet}</Text>
>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
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

<<<<<<< HEAD
         <View style={styles.dateRow}>
          <Text style={styles.walletDate}>
            
          </Text>
        </View>

         {this.state.activityList.map((item, index) => {
=======
         
         {

             this.state.walletData.map((item, index) => {
>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
                  return (
                       <ListItem style={styles.ListItems} >
                        <Left style={{justifyContent:'flex-start'}}>
                         <View style={styles.prodInfo}>
                           {/* <Text style={styles.proTitle}>{item.proName}</Text>*/}
<<<<<<< HEAD
                            <Text  style={styles.proTitle}>{item.activityType} {item.status}</Text>
                             <Text style={styles.paidTime}>{moment(item.date).format('DD MMM YYYY HH:mm')}</Text>
=======
                            <Text  style={styles.proTitle}>{item.orderNumber} {item.activityType}</Text>
                             <Text style={styles.paidTime}>{item.date}</Text>
>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
                            
                          </View>
                        </Left>
                       
                        <Right style={styles.ListRight}>
                          <View>
                          <Text style={styles.proPrice}>{Colors.CUR} {item.amount}</Text>
                                                
                          </View>
                        </Right>
                      </ListItem>
                  
                  );
<<<<<<< HEAD
                })}
           </View>)}
          </Content>
=======
                })
           }
          
>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
        
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
<<<<<<< HEAD
      fetchUserWallet: (userId) => dispatch(userActions.fetchUserWallet({userId: userId})),
=======
      getWalletList: (useId) => dispatch(userActions.getUserWalletList({userId: useId})),
>>>>>>> 1ce9b0d5b79ff731ee800ac0e938b88f87159ec9
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);