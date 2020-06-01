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
import imgs from '../../assets/images';
import appStyles from '../../theme/appStyles';
import { Screens, Colors, Layout } from '../../constants';
import styles from './styles';
import { getCurrentRoute } from '../../utils/common';
import { Svgicon,LoginBackIcon } from '../../components';
import IconFont from 'react-native-vector-icons/FontAwesome';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.listItems = [Screens.Home,
                      Screens.MyOrder,
                      Screens.MyWallet,
                      Screens.MyOffers,
                      Screens.MyAddress,
                      Screens.Subscription];
    
  }

  logout(){
    this.props.logout();
    this.props.navigation.navigate(Screens.SignOutStack.route);
  }
  render() {
    const { navigation, user, language, state } = this.props;
    const currentRoute = getCurrentRoute(state);
    const userName = this.props.user == null ? '' : this.props.user.name;
    const userEmail = this.props.user == null ? '' : this.props.user.email;
    return (
      <Container>
        <Header style={[styles.header,appStyles.headerStyle]}>
         
           
                <Left style={{flex:0,JustinContent:'flex-start', width:60}}>
                  <LoginBackIcon />
                </Left>
                <Body>
                 <Title style={{fontSize:16, fontFamily:'Font-Medium'}}>My Account</Title>
                </Body>

                <Right>
               
                </Right>
             
        </Header>
        <Card style={[appStyles.addBox,{height:'auto',}]}>
         <List >
              <ListItem avatar noBorder style={{ marginLeft: 10,}}>
                <Left style={{ flex: 0,  marginLeft: 0,   paddingLeft:0,  width: 40}}>
                  <Svgicon name="user-circle" 
                   type="FontAwesome"
                    color={Colors.primary} 

                    IconStyle={appStyles.userIconStyle}
                    />
                </Left>
                <Body>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.Profile.route)}>
                  <Text style={appStyles.profileName} >Kirit k</Text>
                  <Text style={appStyles.profileEmail}>kirit.jbs@gmail.com</Text>
                  <Text style={appStyles.profileEmail}>987654210</Text>
                  </TouchableOpacity>
                </Body>

                <Right>
                 <TouchableOpacity onPress= {()=> this.props.navigation.navigate(Screens.Profile.route)}>
                  <Svgicon name="edit" type="MaterialIcons"
                   color={Colors.primary} 
                    IconStyle={appStyles.IconStyle}
                    />
                </TouchableOpacity>
                </Right>
              </ListItem>
              <View>
                <Text style={{backgroundColor:Colors.primary,height:1,  borderBottom:1}}>
                </Text>
              </View>
               <ListItem avatar noBorder style={{ marginLeft: 10,}}>
                <Left style={{paddingLeft:5, width: 30,}}>
                  <Svgicon name="location-on" 
                   type="MaterialIcons"
                    color={Colors.primary} 

                    IconStyle={[appStyles.IconStyle,{textAlign:'center',JustinContent:'center'}]}
                    />
                </Left>
                <Body>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.MyAddress.route)}>
                  <Text style={appStyles.userArea} >South Bopal,</Text>
                  <Text style={appStyles.userCity} >Ahmedabad - Gandhinagar,</Text>
                 </TouchableOpacity>  
                </Body>

                <Right>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate(Screens.MyAddress.route)}>
                  <Svgicon name="edit" type="MaterialIcons"
                    color={Colors.primary} 
                    IconStyle={appStyles.IconStyle}
                    />
                </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
        </Card>
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
                    color={(data.route==currentRoute) ? Colors.primary:Colors.lightIcon} 
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
  return {
    state: state,
    user: state.auth.user,
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(userActions.logoutUser()),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);