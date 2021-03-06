import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
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
import { Logo, Statusbar,LoginBackIcon, ModalBox, SetLanguage, SelectLanguage, Loader, AppIntro } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import { showToast } from '../../utils/common';
import appStyles from '../../theme/appStyles';
import styles from '../SignIn/styles';
// import OtpInputs from 'react-native-otp-inputs';
import OTPInputView from '@twotalltotems/react-native-otp-input';
//import SignInVerification from './form';

class Verification extends React.Component {
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

  signinverification(values, dispatch, props){
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
  
    if(this.props.user==null){
      // Login 
      return (
        <Container >
        <Content bounces={false} enableOnAndroid>
          <ImageBackground 
              source={imgs.greenBg} 
              style={ styles.backGroundstyleEmail}>
            <View style={appStyles.BackIconTop}>
                  <LoginBackIcon  props={this.props}  /> 
              </View>
             <View style={styles.verificationBox} >
                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}                
                     > 
                  
                  <View style={{width:Layout.width, textAlign:'center', alignItems:'center',paddingTop:30}}>
		                  <View>
		                  	<Text style={styles.verifyTitle}>
		                  		Verify Your Number
		                  	</Text>
		                  		<Text style={styles.verifySubTitle}>
		                  		Enter Your Code Here
		                  	</Text>
		                  </View>
                  	<OTPInputView
					    style={{width: '70%', height: 200, alignItems:'center',textAlign:'center'}}
					    pinCount={4}
					    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
					    // onCodeChanged = {code => { this.setState({code})}}
					    autoFocusOnLoad
					    codeInputFieldStyle={styles.underlineStyleBase}
					    codeInputHighlightStyle={styles.underlineStyleHighLighted}
					    onCodeFilled = {(code => {
					        console.log(`Code is ${code}, you are good to go!`)
					    })}
					/>
					</View>			  

                  </Animatable.View>
                  <Animatable.View 
                    animation="fadeIn"
                    delay={1000} 
                    style={{marginBottom:60}}> 
                  { this.props.isLoading ? 
                     <Spinner color={Colors.secondary} /> : 
                      <TouchableOpacity>
                       <Button
                        full
                        primary
                        style={[appStyles.btnSecontary,{marginBottom:20}]}
                         onPress={() =>  this.props.pressSignin()}  >
                        <Text style={styles.SignInbtn}>Submit </Text>
                      </Button>
                       </TouchableOpacity>
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
      pressSignin: () => dispatch(NavigationActions.navigate({ routeName: Screens.Home.route })),
       pressSigninEmail: () => dispatch(NavigationActions.navigate({ routeName: Screens.SignInEmail.route })),
      setLanguage: () => dispatch(userActions.setLanguage({id:1,set:1})),
      showModal: () => dispatch({ type: ActionTypes.SHOWMODAL, showModal: true }),
      resetState: () => dispatch({ type: ActionTypes.RESETSTATE })
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Verification);
