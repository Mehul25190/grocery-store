import React from "react";
import { AppRegistry, Image, StatusBar, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationActions, DrawerItems } from 'react-navigation'
import {
  Button, View,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Body,
  Left,Right,
  Thumbnail, Header,Card,Title,
  Footer
} from "native-base";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user";
import * as subscriptionAction from "../../actions/subscription";
import imgs from '../../assets/images';
import appStyles from '../../theme/appStyles';
import { Screens, Colors, Layout } from '../../constants';
import styles from './styles';
import { getCurrentRoute } from '../../utils/common';
import { Svgicon,LoginBackIcon } from '../../components';
import IconFont from 'react-native-vector-icons/FontAwesome';
import ActionTypes from "../../constants/ActionTypes";


class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.listItems = [Screens.Home,
                      Screens.MyOrder,
                      Screens.MyWallet,
                      Screens.MyOffers,
                      Screens.MyAddress,
                      Screens.Subscription,
                      Screens.MyWishlist];
    
  }

  componentDidMount(){
    //check user logged in or not
    if(this.props.user!=null){
      this.props.navigation.navigate(Screens.SignInStack.route);
    }
  }  

  logout(){
    this.props.logout();
    this.props.resetState();
    this.props.navigation.navigate(Screens.SignInMobile.route);
  }
  render() {
    const { navigation, user, language, state, deliveryAddress } = this.props;
    console.log(deliveryAddress);
    const currentRoute = getCurrentRoute(state);
    const userName = this.props.user == null ? '' : this.props.user.name;
    const userEmail = this.props.user == null ? '' : this.props.user.email;
    return (
      <Container>
        <Header style={[styles.header,appStyles.headerStyle]}>
                <Left style={{flex:0,justifyContent:'flex-start', width:60}}>
                  <LoginBackIcon />
                </Left>
                <Body>
                 <Title style={{fontSize:16, color:Colors.primary, fontFamily:'Font-Medium'}}>My Account</Title>
                </Body>

                <Right>
               
                </Right>
             
        </Header>
        {this.props.user != null ?
          (<Card style={[appStyles.addBox,{height:'auto',}]}>
          <ListItem avatar noBorder style={{ marginLeft: 10, paddingBottom:2}}>
            <Left style={{ flex: 0,  marginLeft: 0,   paddingLeft:0,  }}>
              <View>
                <TouchableOpacity style={{padding:5}} onPress= {()=> this.props.navigation.navigate(Screens.Profile.route)}>
              <Svgicon name="user-circle" 
               type="FontAwesome"
                color={Colors.primary} 
                IconStyle={appStyles.userIconStyle}
                />
            </TouchableOpacity>
            </View>
            </Left>
            <Body style={{justifyContent:'flex-start',alignItems:'flex-start',paddingBottom:10,marginLeft:5}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.Profile.route)}>
            {this.props.user.user.firstName!="" && (
               <Text style={appStyles.profileName} >
                {(this.props.user.user.firstName!="") ? this.props.user.user.firstName + " " : ""}  
                 {(this.props.user.user.lastName !="") ? this.props.user.user.lastName : ""}</Text>
              )

            }
             
              <Text style={appStyles.profileEmail}>{(this.props.user.user.email!="") ? this.props.user.user.email :"" }</Text>
              <Text style={appStyles.profileEmail}>{(this.props.user.user.mobile!="") ? this.props.user.user.mobile : ""}</Text>
              </TouchableOpacity>
            </Body>
          </ListItem>
          <View>
            <Text style={{backgroundColor:Colors.secondary,height:1}}>
            </Text>
          </View>
           <ListItem avatar noBorder style={{ marginLeft: 10,}}>
            <Left style={{ flex: 0,  marginLeft: 0,   paddingLeft:0,  }}>

              <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.navigate(Screens.MyAddress.route)}>
              <Svgicon name="location-on" 
               type="MaterialIcons"
                color={Colors.primary} 
                IconStyle={appStyles.userIconStyle}
                />
            </TouchableOpacity>
            </Left>
            <Body style={{justifyContent:'flex-start',alignItems:'flex-start',paddingBottom:15,marginLeft:5}}>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.MyAddress.route)}>
              <Text style={appStyles.userArea} > {(deliveryAddress ? (deliveryAddress.aptNo + ",") : "" )} {deliveryAddress ? deliveryAddress.buildingName + ',' : ''}</Text>
              <Text style={appStyles.userCity} >{deliveryAddress ? deliveryAddress.areaName + ' - ' + deliveryAddress.cityName : ''} </Text>
             </TouchableOpacity>  
            </Body>

          </ListItem>
        </Card>) : null }
        <Content style={{borderTopWidth:1,borderColor:Colors.primary,marginTop:5}}>
          <List
              dataArray={this.listItems}
              keyExtractor={(item, index) => index.toString()} 
              style={appStyles.drawerList}
              renderRow={(data) => {
              return (
                <ListItem 
                noBorder
                button full
                // noIndent
                style={[appStyles.drawerItem, data.route==currentRoute ? appStyles.activeDrawerItem : {}]}
                onPress={() => this.props.navigation.navigate(data.route)}>
                  <Svgicon 
                    style={appStyles.drawerIcon} 
                    color={(data.route==currentRoute) ? Colors.primary:Colors.primary2} 
                    name={data.icon} 
                    type={data.type}
                    />
                    <Text
                    style={[appStyles.drawerText]}>
                    {(data.label)}</Text>
                  {/*
                  <Text
                    style={[appStyles.drawerText]}>
                    {language[(data.route).toLowerCase()]}</Text>
                  */}
                </ListItem>
              );
              }}
            />
          {/*<DrawerItems {...this.props} />*/}
           <View style={styles.logoutFooter}>
          <Button iconLeft transparent full style={styles.logoutBtn} onPress={() => this.logout()} >
            <Icon  type='AntDesign' name='logout' style={styles.logoutIcon} />
            <Text style={styles.logoutText}>{this.props.language.logout}</Text>
          </Button>
        </View>
        </Content>
       
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state.subscription.deviveryAddress);
  return {
    state: state,
    user: state.auth.user,
    language: state.auth.language,
    deliveryAddress: state.subscription.deviveryAddress
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(userActions.logoutUser()),
      resetState: () => dispatch({ type: ActionTypes.RESETSTATE }),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);