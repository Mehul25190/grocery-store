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
import {productList} from '../data/data';

class MyWallet extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
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
      
          <Content enableOnAndroid>
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
                <Text style={styles.amountRs}>{'\u20B9'}165.00</Text>
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

         <View style={styles.dateRow}>
          <Text style={styles.walletDate}>
            {this.state.date}
          </Text>
        </View>

         {

             productList.map((item, index) => {
                  return (
                  
                       <ListItem style={styles.ListItems} >
                        <Left style={{justifyContent:'flex-start'}}>
                         <View style={styles.prodInfo}>
                           {/* <Text style={styles.proTitle}>{item.proName}</Text>*/}
                            <Text  style={styles.proTitle}>Charged Succesfully</Text>
                             <Text style={styles.paidTime}>{this.state.date} {this.state.time}</Text>
                            
                          </View>
                        </Left>
                       
                        <Right style={styles.ListRight}>
                          <View>
                          <Text style={styles.proPrice}>{'\u20B9'}{item.price}</Text>
                                                
                          </View>
                        </Right>
                      </ListItem>
                  
                  );
                })
           }
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
export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);