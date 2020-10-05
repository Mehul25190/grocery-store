import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity} from 'react-native'
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

import { Layout, Colors, Screens } from '../../constants';
import { Logo, Statusbar, LoginBackIcon } from '../../components';
import imgs from '../../assets/images';
import * as userActions from "../../actions/user";
import appStyles from '../../theme/appStyles';
import styles from '../SignIn/styles';
import ForgotForm from './form';
import { showToast } from '../../utils/common';

class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);
  }

  reset(values, dispatch, props){
        dispatch(userActions.forgotpassword(values))
          .then(res => {
            if(res.status == "success"){
              showToast("Please check your inbox.","success");
              dispatch(NavigationActions.back());
              
            } else {
              //console.log("something wrong with varification call");
              showToast("Email is not valid. Please re-enter.","danger");
          }

      })
      .catch(error => {
        console.log('Error messages returned from server', error);
        showToast("Error messages returned (Next Order) from server"+ error,"danger");
      });

  }

  render(){
    const { language } = this.props;
    return (
     <Container >
        <Content bounces={false} enableOnAndroid>

          <ImageBackground 
              source={imgs.signupBg} 
              style={ styles.backGroundstyleEmail}>
              <View style={appStyles.BackIconTop}>
                  <LoginBackIcon  arrowColor={Colors.primary2} props={this.props}  /> 
              </View>
              <View style={[styles.loginBox, styles.forgotBox]}>
                  <Animatable.View 
                    animation="fadeInUp"
                    delay={500}> 
                       <View >
                        
                          <Animatable.Text 
                            animation="fadeInDown"
                            style={appStyles.loginTitle}>{language.forgot}
                            </Animatable.Text>
                      </View>   
                     <ForgotForm onSubmit={this.reset} />
                  
                  </Animatable.View>
                
                   <Animatable.View 
                      animation="fadeIn"
                      delay={1000}>
                      { this.props.isLoading ? 
                         <Spinner color={Colors.secondary} /> : 
                          <TouchableOpacity >
                           <Button
                            full
                            primary
                            style={styles.btnSecontary}
                            onPress={() =>  this.props.pressReset()} 
                              >
                            <Text style={styles.SignInbtn}>Reset </Text>
                          </Button>
                       </TouchableOpacity>
                }
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
    return {
      pressReset: () => dispatch(submit('forgotForm')),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Forgotpassword);
