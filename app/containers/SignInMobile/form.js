import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text } from 'native-base';
import { required, email } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from '../SignIn/styles';
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Must be 10 digits'
    : undefined

class SignInFormMobile extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
        <Field 
          type="number"
          placeholder="Mobile Number"
          name="mobileNo" 
          component={InputBox} 
          keyboardType={'numeric'}
          validate={[required({msg: 'Mobile no. is required'}), phoneNumber]}  
        />
      </Form>
    )
  }
}

const signinformmobile = reduxForm({
  form: 'signinFormMobile',
})(SignInFormMobile);

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signinformmobile);