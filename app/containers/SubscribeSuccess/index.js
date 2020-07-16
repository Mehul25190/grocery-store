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
  Header, Left, Body, Title, Right,Card,Grid,Row,Col,ListItem
} from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from './styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class SubscribeSuccess extends React.Component {
   constructor(props) {
    super(props);
  }
  
  openControlPanel = () => {
      this.props.navigation.navigate(Screens.Subscription.route) // open drawer
  }

  render(){
    return (
      <Container style={appStyles.container}>
       
           <Header style={[appStyles.headerStyle]}>
        <Left style={appStyles.headerLeft} icon>
          <Button
            transparent
            style={appStyles.menuBtn}
            onPress={() => this.openControlPanel()}
          >
            <Icon
              style={appStyles.menuBar}
              size={30}
              color={Colors.white}
              type="AntDesign"
              name="arrowleft"
            />
          </Button>
        </Left>
        <Body>
         <Text style={{ width: 120, backgroundColor: "transparent" }}>
            <Text style={appStyles.headerTitle}>Thank you</Text>
          </Text>
        </Body>
        <Right></Right>

        </Header>

          <Content enableOnAndroid>
             <Card style={[appStyles.addBox,{height:'auto',marginTop:15, position:'relative', }]}>
              <Image source={imgs.SubscribeSuccess}
                style={styles.succesImg}
               />
               <View style={{textAlign:'center'}}>
                  <View style={{marginBottom:5}}>
                   <Text style={styles.SuccesTittle}>Subscribe Successfull</Text>
                  </View>
                   <View style={{marginBottom:5}}>
                   <Text style={styles.SuccessText}>Your subscription will start from</Text>
                    <Text style={{fontWeight:'bold',textAlign:'center'}}> {this.props.navigation.getParam('subscriptionDate')}</Text>
                  </View>
                   <View style={{marginBottom:5}}>
                    <Text style={styles.SuccessText}>Please recharge your foodapp wallet for uninterprited serivices.</Text>
                  </View>
                  
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.Subscription.route)}>
                    <Text  style={styles.SuccessText}>To see your current subscrption,<Text style={{fontWeight:'bold'}}> please visit My Subscription</Text></Text>
                    </TouchableOpacity>
                  
                 </View>
                    <TouchableOpacity style={styles.checkOutBtnArea} >
                      <Button primary full style={styles.checkOutBtn} onPress={()=>this.props.navigation.navigate(Screens.MyWallet.route)}>
                          <Text style={styles.checkOutText}>Add Money</Text>
                       </Button>
                    </TouchableOpacity>
                     <TouchableOpacity style={styles.checkOutBtnArea} >
                      <Button primary full style={styles.checkOutBtn} onPress={()=>this.props.navigation.navigate(Screens.Home.route)}>
                          <Text style={styles.checkOutText}>Continue Shopping</Text>
                       </Button>
                    </TouchableOpacity>
             </Card>
             
              <View style={{marginLeft:Layout.indent,marginRight:Layout.indent,marginTop:10,marginBottom:0}}>
                  <Text style={styles.textTitle}>How it works</Text>
              </View>
             <Card style={[appStyles.addBox,{height:'auto',marginTop:5, position:'relative', }]}>
              <ListItem icon noBorder style={styles.listIcons}>
                <Left>
                 <Image source={imgs.bag} style={styles.IconImg} />
                </Left>
                <Body>
                  <View>
                   <Text style={styles.IconTitle}>
                  Hang your bag on your door
                  </Text>
                   <Text style={styles.IconText}>
                   Don't forgot to hang a bag on your door everyday.
                  This will ensure that the items will remain fresh and infact.
                  </Text>
                  </View>
                </Body>
              </ListItem>
               <ListItem icon noBorder style={styles.listIcons}>
                <Left style={{marginLeft:0}}>
                 <Image source={imgs.walletIcon} style={styles.IconImg} />
                </Left>
                <Body>
                  <View>
                 <Text style={styles.IconTitle}>
                 Prepaid wallet service
                  </Text>
                   <Text style={styles.IconText}>
                   Maintain a positive balance in your wallat else your subscription might go on hold.
                  </Text>
                  
                  </View>
                </Body>
              </ListItem>
               <ListItem icon noBorder style={[styles.listIcons,{borderBottomWidth:0}]}>
                <Left>
                 <Image source={imgs.refreshIcon} style={styles.IconImg} />
                </Left>
                <Body>
                  <View>
                  <Text style={styles.IconTitle}>
                  Simple and easy modification
                  </Text>
                   <Text style={styles.IconText}>
                   You can modify your orders by 10:00PM to change the delivery for the next day.
                  </Text>
                  
                  </View>
                </Body>
              </ListItem>

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
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeSuccess);