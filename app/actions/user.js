import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';

export const signin = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  //console.log(payloads);
  return axios.post(url.signin,  {payloads: payloads})
  .then(res => {
     //console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        if(res.data.status==200){
          dispatch({ type: ActionTypes.SIGNIN, data: res.data.data.user });
        }
        return res.data
      } else {
        return res
      }
    });
}

export const signinWithMobile = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  //console.log(payloads);
  return axios.post(url.signinMobile,  {payloads: payloads})
  .then(res => {
     console.log("res>>222>>", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        if(res.data.status==200){
          dispatch({ type: ActionTypes.SIGNIN, data: res.data.data.user });
        }
        return res.data
      } else {
        return res
      }
    });
}

export const signup = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signup,  {payloads: payloads}).then(res => {
     console.log("res>>>>", payloads.mobileNo);
    //console.log(res.status);

    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){

        //console.log("Entereed >>>>");
      //if(res.status="success"){  
        //set mobile number into state @nirav store value into state level
        dispatch({ type: ActionTypes.MOBILENO, data: payloads.mobileNo });
        //console.log("set dispatch>>>>");
        return res.data;
      } else {
        return res;
      }
    })
}

export const signupMobileVerification = payloads => dispatch => {
  //console.log('entered varification');
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signupVerifyMobile,  {payloads: payloads}).then(res => {
   

    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        return res;
      }
    })
}


export const logoutUser = () => dispatch => {
  return dispatch({ type: ActionTypes.LOGOUT });
  
}

export const forgotpassword = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signup,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        return res;
      }
    })  
}

export const setLanguage = payloads => dispatch => {
  dispatch({ type: ActionTypes.SHOWMODAL, showModal: false });
  return dispatch({ type: ActionTypes.LANGUAGECODE, language: getLanguage(payloads.id), languageId: payloads.id ,languageSet: payloads.set });
}
