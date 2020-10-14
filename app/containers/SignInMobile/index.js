import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableWithoutFeedback, TouchableOpacity, Alert} from 'react-native'
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
import SignInFormMobile from './form';

class SignInMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  componentDidMount() {
    //console.log("check user>>>>>")
    //console.log(this.props.user);
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


  signinExplore(){
    
    
    dispatch(userActions.signinExplore()).then(res => {
      console.log('expore signin');
      //console.log(res);
      if(res.status == "success"){
        showToast(res.message,"success");
        dispatch(NavigationActions.navigate({
           // routeName: Screens.Verification.route,params:{para_email: ''} 
          }
          ));

      }else{
        showToast(res.message,"danger");
      }
    }).catch(error => {
      const messages = _.get(error, 'response.data.error')
      message = (_.values(messages) || []).join(',')
      if (message){
       showToast(message,"danger");
      }
      console.log(`Error messages returned from server:`, messages )});
  }

  signinGuestUser(){
    Alert.alert(
      "Explore App",
      "Welcome to MyAllaadin. Kindly explore the app, however no transaction will be placed or saved until you register with your original & verified  details .",
      [
        
        {
          text: "No",
        },
        { text: "Yes", onPress: () => this.signinGuestExplore()}
      ],
      { cancelable: false }
    );
  }

  signinGuestExplore(){
    this.props.signinExplore().then(res => {
      console.log('ssss', res);
      if(res.status == 'success'){
        this.props.navigation.navigate(Screens.SignInStack.route);
      }
    });
  }

  signinmobile(values, dispatch, props){
    
    values.isEmail = "0";
    values.mobileNo = values.mobileNo.toString();
    //sending extra parameter
    dispatch(userActions.signinWithMobile(values)).then(res => {
      console.log('back to sign in mobile');
      //console.log(res);
      if(res.status == "success"){
        showToast(res.message,"success");
        dispatch(NavigationActions.navigate({
            routeName: Screens.Verification.route,params:{para_email: ''} 
          }
          ));

      }else{
        showToast(res.message,"danger");
      }
    }).catch(error => {
      const messages = _.get(error, 'response.data.error')
      message = (_.values(messages) || []).join(',')
      if (message){
       showToast(message,"danger");
      }
      console.log(`Error messages returned from server:`, messages )});
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
               
              </View>
             <View style={[styles.loginBox,styles.loginBoxEmail]} >
                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}                
                     > 
                   <SignInFormMobile onSubmit={this.signinmobile} />
                                      
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
                         onPress={() =>  this.props.pressSigninVerify()}  >
                        <Text style={styles.SignInbtn}>Login<Text style={{  textTransform:'none',fontSize:22,  lineHeight:33, fontFamily:'Font-Regular',  color:'#00545F',}}> using OTP</Text> </Text>
                      </Button>
                       </TouchableOpacity>
                  }

                </Animatable.View>  
                 <Animatable.View 
                    animation="fadeIn"
                     delay={1200} 
                    style={[styles.loginWith,styles.loginWithMob]} >

                    <Row style={{marginBottom:60}}>
                     <Col>
                        <Button transparent full     
                         style={[{justifyContent:'center'}]} >
                          <TouchableOpacity  onPress={() => this.signinGuestUser()}>
                          <Text  style={styles.loginWithText} >I just want to explore</Text>
                          </TouchableOpacity>
                        </Button>
                      </Col>
                      
                    </Row>  

                    <Row style={{marginBottom:60}}>
                     <Col>
                        <Button transparent full     
                         style={[{justifyContent:'center'}]} >
                          <TouchableOpacity  onPress={() => this.onSignupButtonPressHandler()}>
                          <Text  style={styles.loginWithText} >Signup</Text>
                          </TouchableOpacity>
                        </Button>
                      </Col>
                      {/*<Col style={{marginRight:Layout.indent}}>
                        <Button transparent full  
                         style={[{justifyContent:'flex-end'}]} >
                          <TouchableOpacity  onPress={() => this.onForgotpasswordPressHandler()}>
                          <Text style={[styles.linkTextEmail,appStyles.textRight]} > Forgot Password?</Text>
                          </TouchableOpacity>
                        </Button>
                      </Col>*/}
                    </Row>
                  	<View style={styles.hairlineleft} />
                    	   	<View style={styles.loginButtonBelowText1} >		
                    		<Text style={styles.orText}>or</Text>
                   </View>
                 
                    <TouchableOpacity  onPress={() =>  this.props.pressSigninEmail()}>

                    <Text style={styles.loginWithText}>Login with email</Text>
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
    language: state.auth.language,
    languageSet: state.auth.languageSet || 0,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      pressSigninVerify: () => dispatch(submit('signinFormMobile')),
      pressSigninEmail: () => dispatch(NavigationActions.navigate({ routeName: Screens.SignInEmail.route })),
      setLanguage: () => dispatch(userActions.setLanguage({id:1,set:1})),
      signinExplore: () => dispatch(userActions.signinExplore()),
      
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignInMobile);
