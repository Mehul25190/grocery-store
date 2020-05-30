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
  Header, Left, Body, Title, Right,Card,Grid,Col,Row,ListItem,Item,Input,DatePicker,Label
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import {productList} from '../data/data';
import NumericInput from 'react-native-numeric-input';
import CheckBox from 'react-native-check-box';

class SubscribeDetail extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      //default value of the date time
      date: '',
       time: '',
       value:1
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

    

  render(){
    const { navigation } = this.props;
    const getItem = navigation.getParam('item');
    return (
      <Container style={appStyles.container}>

           <Headers
              IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightF='search'
              
              bgColor='transparent'
              Title='Subscribe Order'
             />
      
       <Content enableOnAndroid>
       <View style={styles.topInstruction}>
        <Text style={styles.instruction}>
          Daily Delivery Before 7:00 AM
        </Text>
       </View>

        <Card style={[appStyles.addBox,{height:'auto'},styles.paddingBox]}>
          <Grid >
            <Row style={styles.firstRow}>
              <Col style={styles.orderTitle}>
                <Text style={styles.orderTitleText}>Subscribe:</Text>
              </Col>
              <Col style={styles.dailyTitle}>
                 <Text style={styles.dayText}>Daily</Text>
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
        <Row style={styles.btnRow}>
          <Col style={styles.BtnCol}>
         
            <Button primary full style={styles.modifyBtn}>
             <TouchableOpacity>
               <Icon name='edit' type='MaterialIcons' style={styles.modifyIcon} />
              <Text style={styles.btnText}> Modify </Text>
               </TouchableOpacity>
            </Button>
         
          </Col>
          <Col style={styles.BtnCol}>
          
            <Button   style={styles.deleteBtn}>
            <TouchableOpacity>
             <Icon name="trashcan" type="Octicons" style={styles.deleteIcon} />
              <Text style={[styles.btnText,{color:Colors.primary}]}>  Delete </Text>
             </TouchableOpacity>
            </Button>
            
       
          </Col>

         <Col style={styles.BtnCol}>
         
            <Button   style={styles.pauseBtn}>
             <TouchableOpacity>
             <Icon name="pause-circle" type="FontAwesome5" style={styles.pauseIcon} />
             <Text style={[styles.btnText,{color:Colors.primary}]}>  Pause </Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeDetail);