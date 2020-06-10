import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';


export const mySubscriptionList = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.mySubscriptionList,  {queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data
      } else {
        return res
      }
    });
}

export const getItemDetail = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getItemDetail,  {queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data
      } else {
        return res
      }
    });
}

/*
export const getDeviveryAddress = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getDeviveryAddress,  {queries: payloads}).then(res => {
    	dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
      	dispatch({ type: ActionTypes.DELIVERYADDRESS, data: res.data.data.userAddress[0] });
      	deviveryAddress
        return res.data
      } else {
        return res
      }
    });
}
*/

export const saveSubscribeOrderDetails = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.saveSubscribeOrderDetails,  {payloads: payloads}).then(res => {
  	console.log(res);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data
      } else {
        return res
      }
    });
}







