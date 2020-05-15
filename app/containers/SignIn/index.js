import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
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
import SignInForm from './form';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visibleModal: false,
    };
  }

  componentDidMount() {
    if(this.props.user!=null){
      this.props.navigation.navigate(Screens.SignInStack.route);
    }
    setTimeout(()=>{
      if(this.props.languageSet==0 && !this.props.showIntro){
        this.props.showModal();
      }
    },2000);
  }

  onSignupButtonPressHandler(){
    this.props.navigation.navigate(Screens.SignUp.route)
  }

  onForgotpasswordPressHandler(){
    this.props.navigation.navigate(Screens.ForgotPassword.route)
  }

  signin(values, dispatch, props){
    dispatch(userActions.signin(values))
      .then(res => {
        if(res.status == 200){
          showToast(res.msg,"success");
          dispatch(NavigationActions.navigate({ routeName: Screens.SignInStack.route }));
          // this.props.navigation.navigate(Screens.SignInStack.route)
        }else{
          showToast(res.msg,"danger");
        }
      })
      .catch(error => {
        const messages = _.get(error, 'response.data.error')
        message = (_.values(messages) || []).join(',')
        if (message){
         showToast(message,"danger");
       }
       console.log(`
          Error messages returned from server:`, messages )
      });
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
          <ImageBackground 
              source={imgs.signupBg} 
              style={ styles.backGroundstyle}>
           
             <View style={[styles.loginBox,styles.signBox]}>
                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}                
                     > 
                    <SignInForm onSubmit={this.signin} />
                    <Row style={{marginBottom:20}}>
                    
                      <Col>
                        <Button transparent full  
                         style={[{justifyContent:'flex-end'}]} >
                          <TouchableOpacity  onPress={() => this.onForgotpasswordPressHandler()}>
                          <Text style={[styles.linkText,appStyles.textRight]} > Forgot Password?</Text>
                          </TouchableOpacity>
                        </Button>
                      </Col>
                    </Row>
                  </Animatable.View>
                  <Animatable.View 
                    animation="fadeIn"
                    delay={1000} 
                    style={{marginTop:30}}> 
                  { this.props.isLoading ? 
                     <Spinner color={Colors.secondary} /> : 
                      <Button
                        full
                        primary
                        style={appStyles.btnSecontary}
                         onPress={() =>  this.props.pressSignin()}  >
                        <Text style={styles.SignInbtn}>Login </Text>
                      </Button>
                  }
                </Animatable.View>  
                  <Animatable.View 
                    animation="fadeIn"
                    delay={1200} 
                    style={{marginBottom:0}}> 
                  { this.props.isLoading ? 
                     <Spinner color={Colors.secondary} /> : 
                      <Button
                        full
                        primary
                        style={appStyles.btnSecontary}
                        onPress={() => this.props.pressSignUp()}  >
                        <Text style={styles.SignInbtn}>SignUp </Text>
                      </Button>
                  }
                </Animatable.View>  
              </View>          
        
          
           </ImageBackground>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
