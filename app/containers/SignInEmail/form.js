import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text, Row, Col,Icon } from 'native-base';
import { required, email } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from '../SignIn/styles';

class SignInFormEmail extends React.Component {
  constructor(props){
    super(props);
     this.state = {
      showPass: false,
     };
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>

        <Field 
         styles={{marginBottom:10}}
          name="email" 
          component={InputBox}
          placeholder='Email'
          keyboardType={'email-address'}
          validate={[required({msg: `${language.email} ${language.required}`}), email({msg: `${language.email} ${language.notValid}`})]}
        />
    <View style={{}}><Text></Text></View>
    <View style={{position:'relative'}}>
        <Field 
          name="password" 
          component={InputBox} 
          placeholder='Password'
          secureTextEntry={this.state.showPass?false:true}
          validate={[required({msg: `${language.password} ${language.required}`})]}

        />
       <TouchableOpacity  style={styles.hidePassSection}  onPress={() =>  this.setState({showPass: !this.state.showPass})}>
        {
          this.state.showPass?(
             <Icon name='eye' type='Entypo'  style={styles.hidePass} />
            
            ):
          (
             <Icon name='eye-with-line'  type='Entypo' style={styles.hidePass} />
          
          )
        }
        </TouchableOpacity>
        
    </View>
      </Form>
    )
  }
}


const signinformemail = reduxForm({
  form: 'signinFormemail',
})(SignInFormEmail);

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signinformemail);