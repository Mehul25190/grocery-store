import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text, Row, Col } from 'native-base';
import { required, email, length, confirmation } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from '../SignIn/styles';
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Must be 10 digits'
    : undefined

class SignUpForm extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm,styles.signFormBox}>

      <Row style={{height:60}}>
        <Col><Field 
         styles={{marginBottom:20}}
          name="firstName" 
          component={InputBox}
          placeholder='First Name'
          keyboardType={'email-address'}
         validate={[required({msg: 'First Name is required'})]} 
        />
        <View style={{}}><Text></Text></View></Col>
        
        <Col><Field 
         styles={{marginBottom:20}}
          name="lastName" 
          component={InputBox}
          placeholder='Last Name'
          keyboardType={'email-address'}
         validate={[required({msg: 'Last Name is required'})]} 
        />
        <View style={{}}><Text></Text></View></Col>
      </Row>

         <Field 
          placeholder='Mobile Number'
          name="mobileNo" 
          component={InputBox} 
          keyboardType={'numeric'}
         validate={[required({msg: 'Mobile no. is required'}), phoneNumber]} 
        />
        <View><Text style={{height:15}}></Text></View>
        <Field 
         placeholder='Email'
          name="email" 
          component={InputBox} 
          keyboardType={'email-address'}
          validate={[required({msg: `${language.email} ${language.required}`}), email({msg: `${language.email} ${language.notValid}`})]}
        />
      <View><Text style={{height:15}}></Text></View>
        <Field 
          name="password" 
          component={InputBox} 
           placeholder='Password'
          secureTextEntry={true}
          validate={[required({msg: `${language.password} ${language.required}`})]}
        />
      </Form>
    )
  }
}

const signupform = reduxForm({
  form: 'signupForm',
})(SignUpForm);

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signupform);