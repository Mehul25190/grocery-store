import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';


export const viewcart = payloads => dispatch => {
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.viewCart,  {queries: payloads}).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        console.log(res.data.data);
        dispatch({ type: ActionTypes.VIEWCARTDETAIL, data: res.data.data });
        dispatch({ type: ActionTypes.CARTDETAIL, data: res.data.data.cartList });      
        let totalAmount = 0;
        let totalItem = 0;
        let actualTotal = 0;
        res.data.data.cartList.map(element => {
            let tempPrice = (element.discountedPrice > 0 && element.discountedPrice < element.itemPrice) ? Number(element.discountedPrice) : Number(element.itemPrice);
            totalAmount = totalAmount + Number(tempPrice * element.quantity)
            if(element.isSubscribedItem == 0) totalItem = totalItem + 1;
            actualTotal = actualTotal + Number(element.itemPrice * element.quantity);
        })
        dispatch({ type: ActionTypes.TOTALAMOUNT, data: totalAmount });
        dispatch({ type: ActionTypes.TOTALITEM, data: totalItem });
        dispatch({ type: ActionTypes.ACTUALTOTAL, data: actualTotal });
        dispatch({ type: ActionTypes.WALLETAMOUNT , data: res.data.data.userWalletBalance})
        return res.data
      } else {
        return res
      }
    });
}

export const addToCartItem = payloads => dispatch => {
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.addToCartItem,  {payloads: payloads}).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data
      } else {
        return res
      }
    });
}


export const updateCartItem = payloads => dispatch => {
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.updateCartItem,  {payloads: payloads}).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data
      } else {
        return res
      }
    });
}


export const deleteCartItem = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.deleteCartItem,  {payloads: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data
      } else {
        return res
      }
    });
}

export const getAvailableTimeSlots = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getAvailableTimeSlots,  {queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data
      } else {
        return res
      }
    });
}

export const fetchDeliveryCharges = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchDeliveryCharges,  {queries: payloads}).then(res => {
    console.log('res', res)
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.DELIVERYCHARGES, data: res.data.data.deliveryCharge });
        return res.data
      } else {
        return res
      }
    });
}

export const placeOrder = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.placeOrder,  {payloads: payloads}).then(res => {
    console.log('ssss', res);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        if(res.data.status == 'success')
          dispatch({ type: ActionTypes.RESETCARTSTATE });
        return res.data
      } else {
        return res
      }
    });
}

export const fetchSubscriptionCharges = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchSubscriptionCharges,  {queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.DELIVERYCHARGES, data: res.data.data.subscriptionFees ? res.data.data.subscriptionFees : 0 });
        return res.data
      } else {
        return res
      }
    });
}
















