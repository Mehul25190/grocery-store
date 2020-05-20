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
    this.listItems = [Screens.Home, Screens.MyOrder, Screens.MyWallet, Screens.MyPayments, Screens.MyRatings, Screens.MyNotification, Screens.MyAddress, Screens.Subscription];
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
        <Header style={styles.header}>
          <View style={[appStyles.row, {paddingTop: Layout.halfIndent}]}>
            <List>
              <ListItem >
                <Left style={{flex:0, JustinContent:'flex-start', width:60}}>
                  <LoginBackIcon />
                </Left>
                <Body>
                 <Title>My Account</Title>
                </Body>

                <Right>
                 <TouchableOpacity>
                  <Svgicon name="search1" type="AntDesign"
                   color={Colors.white} 
                    width={Layout.bigIconSize} 
                    height={Layout.bigIconSize} />
                </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
          </View>
        </Header>
        <Card style={styles.addBox}>
         <List>
              <ListItem avatar>
                <Left>
                  <Svgicon name="user-circle" 
                   type="FontAwesome"
                    color={Colors.primary} 
                    width='250'
                    />
                </Left>
                <Body>
                  <Text style={appStyles.profileName} >Kirit k</Text>
                  <Text style={appStyles.profileEmail}>kirit.jbs@gmail.com</Text>
                  <Text style={appStyles.profileEmail}>987654210</Text>
                </Body>

                <Right>
                 <TouchableOpacity>
                  <Svgicon name="edit" type="MaterialIcons"
                   color={Colors.primary} 
                    width={Layout.bigIconSize} 
                    height={Layout.bigIconSize} />
                </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
        </Card>
        <Content>
          <List
              dataArray={this.listItems}
              keyExtractor={(item, index) => index.toString()} 
              style={appStyles.drawerList}
              renderRow={(data) => {
                return (
                  <ListItem 
                  button full
                  noIndent
                  style={[appStyles.drawerItem, data.route==currentRoute ? appStyles.activeDrawerItem : {}]}
                  onPress={() => this.props.navigation.navigate(data.route)}>
                      <Svgicon 
                        style={appStyles.drawerIcon} 
                        color={(data.route==currentRoute) ? Colors.secondary:Colors.black} 
                        name={data.icon} 
                        type={data.type}
                        />
                      <Text
                      style={[appStyles.drawerText,{backgroundColor:'#ddd'}]}>
                      {language[(data.route).toLowerCase()]}</Text>
                  </ListItem>
                );
              }}
            />
          {/*<DrawerItems {...this.props} />*/}
        </Content>
        <Footer style={styles.logoutFooter}>
          <Button iconLeft transparent full style={styles.logoutBtn} onPress={() => this.logout()} >
            <Icon fontSize='12' type='AntDesign' name='logout' style={styles.white} />
            <Text style={styles.white}>{this.props.language.logout}</Text>
          </Button>
        </Footer>
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