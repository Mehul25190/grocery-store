import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { View } from "react-native";
import { connect } from "react-redux";
import { Form, Item, Input, Title, Button, Text } from 'native-base';
import { required, email } from 'redux-form-validators'
import { InputBox } from '../../components';
import styles from '../SignIn/styles';


class SignInVerification extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { handleSubmit, onSubmit, language } = this.props;
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
     
        
      <View >
        <Text style={styles.label}>Mobile Number</Text>
      </View>
        <Field 
          name="number" 
          component={InputBox} 
          // placeholder='Enter your Mobile'
          keyboardType={'numeric'}
          validate=''
        />
      
       
      </Form>
    )
  }
}


const signinverification = reduxForm({
  form: 'signinFormverification',
})(SignInVerification);

const mapStateToProps = (state) => {
  return {
    language: state.auth.language,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(signinverification);