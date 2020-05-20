import React from "react";
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
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
    onPress = () => {
    this.setState({active: !this.state.active});
    this.props.onPress();
    };
  render() {
    return (
      <Header searchBar rounded style={appStyles.headerStyle}>
      
          <Left style={appStyles.headerLeft}>
            <Button transparent style={appStyles.menuBtn}  onPress={() => this.onPress()}>
              <Icon style={appStyles.menuBar} size={30} color={Colors.white} name={this.props.IconLeft} />
            </Button>
          </Left>
       
          <Item style={{width:60,backgroundColor:'transparent'}} >
            
          <Text style={{color:'#fff',fontSize:18}}>{this.props.Title}</Text>
          </Item>
         
          <Right style={appStyles.headerRight}>
             <Button transparent>
              <TouchableOpacity>
               <Icon style={appStyles.IconRight}  name={this.props.IconRightF} />
                  </TouchableOpacity>
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