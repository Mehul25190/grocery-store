import React from "react";
import { View, TouchableWithoutFeedback } from 'react-native';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';

import {
  Button,
  Text,
  Header, Item, Input, Left, Body, Title, Right,Icon
} from 'native-base';

import appStyles from '../theme/appStyles';
import svgs from '../assets/svgs';
import { Colors, Layout, ActionTypes } from '../constants';
import Logo from './Logo';
import Svgicon from './Svgicon';
import Statusbar from './Statusbar';


import ModalBox from './ModalBox';
import SetLanguage from './SetLanguage';


class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      visibleModal:false
    }
  }
  render() {
    return (
      <Header searchBar rounded style={appStyles.headerStyle}>
          <Left style={appStyles.headerLeft}>
            <Button transparent style={appStyles.menuBtn} onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={appStyles.menuBar} size={30} color={Colors.white} name="menu" />
            </Button>
          </Left>
       
          <Item style={[appStyles.searchBar,{width:60}]} >
            <Icon name="ios-search" style={{color:Colors.primary}} />
            <Input style={appStyles.searchInput} placeholder="Search Product" />
           
          </Item>
         
          <Right style={appStyles.headerRight}>
             <Button transparent>
               <Icon style={appStyles.cartIcon}  name="cart" />
               <Icon style={appStyles.userIcon} name="person" />      
            </Button>
          </Right>
       
         
          </Header>

    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
      showModal: () => {
        dispatch({ type: ActionTypes.SHOWMODAL, showModal: true })
      },
    };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Headers);