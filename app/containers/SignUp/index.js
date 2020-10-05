import React from 'react'
import { StyleSheet, View, ImageBackground, Image,TouchableOpacity} from 'react-native'
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
  Input,
  Spinner, Row, Col, Toast
} from 'native-base';
//import { ActionTypes, Strings } from '../constants/';
import { connect } from "react-redux";
import { submit } from 'redux-form';
import { bindActionCreators } from "redux";
import * as Animatable from 'react-native-animatable';

import { Layout, Colors, Screens } from '../../constants';
import { Logo, Statusbar, LoginBackIcon } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import {showToast} from '../../utils/common';
import appStyles from '../../theme/appStyles';
import styles from '../SignIn/styles';
import SignUpForm from './form';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNo: '',
      email: '',
      password: '',
      error: '',
    };
  }
  onSigninButtonPressHandler(){
    this.props.navigation.navigate(Screens.SignInMobile.route)
  }

  onForgotpasswordPressHandler(){
    this.props.navigation.navigate(Screens.ForgotPassword.route)
  }

  signup(values, dispatch, props){
    dispatch(userActions.signup(values)).then(res => {
      
      if(res.status == "success"){  
        showToast(res.message,"success");
        dispatch(NavigationActions.navigate({ routeName: Screens.Verification.route, params:{para_email: values.email} }));
      }
      else if(res.code == "1000") {
        showToast(res.message,"danger")
      }
      else{
        showToast(res.warnings[0].message,"danger");
      }
    }).catch(error => {
      const messages = _.get(error, 'res.data.error')
      message = (_.values(messages) || []).join(',')
      if (message){
        showToast(message,"danger");
      }
      console.log(`Error messages returned from server:`, messages )
    });
  }

  render(){
    const { language } = this.props;
    return (
      <Container >
        <Content bounces={false} enableOnAndroid>
          <ImageBackground 
              source={imgs.signupBg} 
              style={ styles.backGroundstyle}>
              <View style={appStyles.BackIconTop}>
                  <LoginBackIcon  props={this.props}  /> 
              </View>
           <View style={[styles.loginBox,styles.signupBox]}>
             <Animatable.View 
                    animation="fadeInUp"
                    delay={500}                
                     > 
                    <SignUpForm onSubmit={this.signup} />
                   
                  </Animatable.View>
                <Animatable.View 
                    animation="fadeIn"
                    delay={1200} 
                    style={{marginTop:0}}> 
                  { this.props.isLoading ? 
                     <Spinner color={Colors.secondary} /> : 
                      <Button
                        full
                        primary
                        style={styles.btnSecontary}
                        onPress={() => this.props.pressSignup()}  >
                        <Text style={styles.SignInbtn}>SignUp </Text>
                      </Button>
                  }
                   <Row style={{marginBottom:50}}>
                     <Col>
                        <Button transparent full  
                         style={[{justifyContent:'center'}]} >
                          <TouchableOpacity  onPress={() => this.onSigninButtonPressHandler()}>
                          <Text  style={styles.loginWithText}  >Login</Text>
                          </TouchableOpacity>
                        </Button>
                      </Col>
                     
                    </Row>
                </Animatable.View>  
            </View>    
        </ImageBackground>      
      </Content>
    </Container>
     
    );
  }
}
// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    isLoading: state.common.isLoading,
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      pressSignup: () => dispatch(submit('signupForm')),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
