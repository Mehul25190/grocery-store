import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';
import { Layout, Colors, Screens } from "../constants";

/**
 * Show Product List on landing screen - para - categoryID
 */
export const searchItem = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.searchItem,{queries: payloads}).then(res => {
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


export const productDetail = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getItemDetail,  {queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.PRODUCTDETAIL, data: res.data.data }); 
        return res.data
      } else {
        return res
      }
    });
}

export const fetchOffers = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchOffersOnLandingPage).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
      if(res.status == 200){
        dispatch({ type: ActionTypes.CATEGORYOFFER, data: res.data.data.offerList }); 
        return res.data
      } else {
        return res
      }
    });
}


export const fetchItemsByOffer = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchItemsByOffer, {queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
      if(res.status == 200){
        dispatch({ type: ActionTypes.CATEGORYOFFER, data: res.data.data.offerList }); 
        return res.data
      } else {
        return res
      }
    });
}


