import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, date} from 'react-native';
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


class OrderReturn extends React.Component {

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
    };

    onReturnDetailPage = item => {
      console.log(item);
    this.props.navigation.navigate('OrderReturnDetail', { item });
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
              Title='Order Return'
             />
      
          <Content enableOnAndroid>
       
        <Card style={[appStyles.addBox,{height:'auto'},styles.orderBox]}>
          <Grid >
            <Row style={styles.orderRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Order Date</Text>
              </Col>
              <Col style={styles.orderValue}>
               <Text style={styles.orderValText}>{this.state.date}</Text>
              </Col>
            </Row>
             <Row style={styles.orderRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Order#</Text>
              </Col>
              <Col style={styles.orderValue}>
                <Text style={styles.orderValText}>123-7894561</Text>
              </Col>
            </Row>
             <Row style={styles.orderRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Order Total</Text>
              </Col>
              <Col style={styles.orderValue}>
                <Text style={styles.orderValText}><Text style={{fontFamily:'Roboto',color:'gray'}}>{'\u20B9'}</Text> 500.00</Text>
              </Col>
            </Row>
          </Grid>

         
        </Card>
        
      
       
     
          <Card style={[appStyles.addBox,{height:'auto',borderBottomWidth:1},styles.orderBox]}>
          <View>
            <Text style={styles.detailTitle}>Shipment Details  </Text>
          </View>
          <View>
            <Text style={styles.deliveryTitle}>Delivery Estimate: </Text>
            <Text style={styles.deliveryDate}>Monday {this.state.date} </Text>
          </View>

          <ListItem style={styles.ListItems} noBorder>
                <Left style={styles.ListLeft}>
                     <Image style={styles.proImage} source={getItem.image} />
                </Left>
              
                <Body style={styles.bodyText}>
                    <Text numberOfLines={1}  style={[styles.proTitle,{  fontFamily:'Font-Medium'}]}>Paid for {getItem.proName}</Text>
                    <Text style={styles.QtyPro}>Qty: 2</Text>
                 </Body>
                 
                <Right style={styles.ListRight}>
                  <View>
                  <Text style={styles.proPrice}>{'\u20B9'} {getItem.price}</Text>
                  <Button style={styles.reviewBtn}>
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.MyRatings.route)}>
                          <Text style={styles.reviewBtnText}>
                              Add Review
                          </Text>

                          </TouchableOpacity>
                  </Button>                  
                  </View>
                </Right>
         </ListItem>

         
        </Card>
      
         <Card style={[appStyles.addBox,styles.trackBox,{marginTop:-9,borderTopWidth:0,zIndex:-1}]}>
          <TouchableOpacity onPress={()=> this.onReturnDetailPage(getItem)}>
            <Text style={styles.detailTitle2}>Return Order</Text>

          </TouchableOpacity>
        </Card>

        
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderReturn);