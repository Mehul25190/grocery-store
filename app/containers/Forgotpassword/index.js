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

class Forgotpassword extends React.Component {
  constructor(props) {
    super(props);
  }

  reset(values, dispatch, props){
    dispatch(userActions.forgotpassword(values))
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
    return (
     <Container >
        <Content bounces={false} enableOnAndroid>

          <ImageBackground 
              source={imgs.greenBg} 
              style={ styles.backGroundstyleEmail}>
              <View style={appStyles.BackIconTop}>
                  <LoginBackIcon  props={this.props}  /> 
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
                          <TouchableOpacity onPress={() =>  this.props.pressReset()} >
                           <Button
                            full
                            primary
                            style={appStyles.btnSecontary}
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
