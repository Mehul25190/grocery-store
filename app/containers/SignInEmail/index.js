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
import { Logo, LoginBackIcon, Statusbar, ModalBox, SetLanguage, SelectLanguage, Loader, AppIntro } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import { showToast } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import styles from '../SignIn/styles';
import SignInFormEmail from './form';

class SignInEmail extends React.Component {
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
  }

  onSignupButtonPressHandler(){
    this.props.navigation.navigate(Screens.SignUp.route)
  }

  onForgotpasswordPressHandler(){
    this.props.navigation.navigate(Screens.ForgotPassword.route)
  }

  signin(values, dispatch, props){
    values.isEmail = 1; //sending extra parameter
    dispatch(userActions.signin(values)).then(res => {
      if(res.status == "success"){  
        showToast(res.message,"success");
        dispatch(NavigationActions.navigate({ routeName: Screens.SignInStack.route }));
      }else{
        console.log("something wrong in login");
        showToast(res.message,"danger");
      }
    }).catch(error => {
      const messages = _.get(error, 'response.data.error')
      message = (_.values(messages) || []).join(',')
      if (message){
       showToast(message,"danger");
      }
      console.log(`Error messages returned from server:`, messages )
    });
  }

  render(){
    const { language } = this.props;
  
    if(this.props.user==null){
      // Login 
      return (
        <Container >
        <Content bounces={false} enableOnAndroid>
          <ImageBackground 
              source={imgs.signupBg} 
              style={ styles.backGroundstyleEmail}>
             <View style={appStyles.BackIconTop}>
                      <LoginBackIcon  props={this.props}  /> 
              </View>
             <View style={[styles.loginBox,styles.loginBoxEmail]} >
                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}                
                     > 
                    <SignInFormEmail onSubmit={this.signin} />
                    <Row style={{marginBottom:20}}>
                     <Col style={{width:100,marginLeft:Layout.indent}}>
                        <Button transparent full  
                         style={[{justifyContent:'flex-start'}]} >
                          <TouchableOpacity  onPress={() => this.onSignupButtonPressHandler()}>
                          <Text style={[styles.linkTextSignup,appStyles.textRight]} ></Text>
                          </TouchableOpacity>
                        </Button>
                      </Col>
                        <Col style={{marginRight:Layout.indent}}>
                        <Button transparent full  
                         style={[{justifyContent:'flex-end'}]} >
                          <TouchableOpacity  onPress={() => this.onForgotpasswordPressHandler()}>
                          <Text style={[styles.linkTextEmail,appStyles.textRight]} > Forgot Password?</Text>
                          </TouchableOpacity>
                        </Button>
                      </Col>
                    </Row>
                  </Animatable.View>
                  <Animatable.View 
                    animation="fadeIn"
                    delay={1000} 
                    style={{marginTop:20}}> 
                  { this.props.isLoading ? 
                     <Spinner color={Colors.secondary} /> : 
                      <TouchableOpacity>
                       <Button
                        full
                        primary
                        style={appStyles.btnSecontary}
                         onPress={() =>  this.props.pressSignin()}  >
                        <Text style={styles.SignInbtn}>Login </Text>
                      </Button>
                       </TouchableOpacity>
                  }
                </Animatable.View>  
                 <Animatable.View 
                    animation="fadeIn"
                     delay={1200} 
                    style={styles.loginWith}
                   
                    >
                    <TouchableOpacity  onPress={() =>  this.props.pressSigninMob()}>
                    <Text style={styles.loginWithText}>Login with OTP</Text>
                    </TouchableOpacity>
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
    isLoading: state.common.isLoading,
    user: state.auth.user,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      pressSignin: () => dispatch(submit('signinFormemail')),
      pressSigninMob: () => dispatch(NavigationActions.navigate({ routeName: Screens.SignInMobile.route })),
      setLanguage: () => dispatch(userActions.setLanguage({id:1,set:1})),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignInEmail);
