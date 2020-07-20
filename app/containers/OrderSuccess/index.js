import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity} from 'react-native'
import _ from 'lodash'; 
import {Screens, Layout, Colors } from '../../constants';
import { Logo, Statusbar,Headers } from '../../components';
import imgs from '../../assets/images';
import {
  Container,
  Content,
  Icon,
  Spinner,
  Button,
  Text,
  Header, Left, Body, Title, Right,Card,Grid,Row,Col
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class OrderSuccess extends React.Component {
   constructor(props) {
    super(props);
  }
  
  openControlPanel = () => {
      this.props.navigation.goBack(); // open drawer
  }

  render(){
    return (
      <Container style={appStyles.container}>
       
           <Headers
              //IconLeft='arrowleft'
              onPress={() => this.openControlPanel()}
              IconRightS=''
              IconRightF='search'
              bgColor='transparent'
              Title='Order Confirmation'
            />

          <Content enableOnAndroid>
             <Card style={[appStyles.addBox,{height:'auto',marginTop:15, position:'relative',flex:1,justifyContent:'center', alignItems:'center'}]}>
              <Image source={imgs.successIcon}
                style={styles.succesImg}
               />
                 
             </Card>
             <View style={styles.thanksHeading}>
                <Text style={styles.thankText}>Thank you for placing your order with us.  </Text>
                <Text style={styles.thankText}>Your order ID is {this.props.navigation.getParam('orderNumber')}.  </Text>
             </View>
             <View style={styles.thanksInfo}>
                <Text style={styles.infoText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                 Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy  </Text>
             </View>
          <TouchableOpacity style={styles.checkOutBtnArea} >
            <Button primary full style={styles.checkOutBtn} onPress={()=>this.props.navigation.navigate(Screens.Home.route)}>
                <Text style={styles.checkOutText}>Continue shopping</Text>
             </Button>
          </TouchableOpacity>

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
export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccess);