import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import _ from 'lodash'; 
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Icon,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Spinner, Row, Col
} from 'native-base';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import * as Animatable from 'react-native-animatable';

import { Layout, Colors, Screens, ActionTypes } from '../../constants';
import { Logo, Statusbar, ModalBox, SetLanguage, SelectLanguage, Loader, AppIntro } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import { showToast } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import styles from './styles';

class Nointernet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visibleModal: false,
    };
  }





  render(){
    const { language } = this.props;
    // if(this.props.showIntro){
    //   // Show the app intro on first time launch
    //   if(this.props.languageSet==0){
    //     return (<SelectLanguage />);
    //   }else{
    //     return (<AppIntro />);
    //   }
    // }
    if(this.props.user==null){
      // Login 
      return (
        <Container >
        <Content bounces={false} enableOnAndroid>
        <TouchableOpacity>
          <ImageBackground 
              source={imgs.Nointernet} 
              style={ styles.backGroundstyle}>
           
             <View style={[styles.loginBox,styles.signBox]}>
                  
                
              </View>          
        
          
           </ImageBackground>
           </TouchableOpacity>
           </Content>
        </Container>
       
      );
    }else{
      // Authendicating
      return (<Loader />);
    }
  }
}
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    showIntro: state.auth.showIntro,
    isLoading: state.common.isLoading,
    user: state.auth.user,
    language: state.auth.language,
    languageSet: state.auth.languageSet || 0,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      pressSignin: () => dispatch(NavigationActions.navigate({ routeName: Screens.SignInEmail.route })),
      pressSignUp: () => dispatch(NavigationActions.navigate({ routeName: Screens.SignUp.route })),
      setLanguage: () => dispatch(userActions.setLanguage({id:1,set:1})),
      showModal: () => dispatch({ type: ActionTypes.SHOWMODAL, showModal: true }),
      resetState: () => dispatch({ type: ActionTypes.RESETSTATE })
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Nointernet);
