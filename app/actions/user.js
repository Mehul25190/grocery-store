import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';

export const signin = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signin,  {payloads: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        if(res.data.status=="success"){
          dispatch({ type: ActionTypes.SIGNIN, data: res.data.data });
        }
        return res.data
      } else {
        return res
      }
    });
}

export const signinWithMobile = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signinMobile,  {payloads: payloads}).then(res => {
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
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      dispatch({ type: ActionTypes.MOBILENO, data: payloads.mobileNo });
      return res.data;
    } else {
      return res;
    }
  })
}

export const signupMobileVerification = payloads => dispatch => {
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
/**
 * Show Category List on landing screen after sign in
 */
export const showCategoryList = payloads => dispatch => {
  //console.log("showCategoryList>>> action ")
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.categoryList).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
    if(res.status == 200){
      //console.log(res.data);
      return res.data;
    } else {
      return res;
    }
  })
}

/**
 * Show Product List on landing screen - para - categoryID
 */
export const showProductList = payloads => dispatch => {
  //console.log("showCategoryList>>> action ")
  //console.log('payload>>'+payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.productList,{queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
    if(res.status == 200){
      //console.log('product list return');  
      //console.log(res);
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

export const getDeviveryAddress = payloads => dispatch => {
  console.log('payloads', payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getDeviveryAddress,  {queries: payloads}).then(res => {
    

      dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.DELIVERYADDRESS, data: res.data.data.userAddress[0] });
        return res.data
      } else {
        return res
      }
    });
}

