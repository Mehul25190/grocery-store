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
        dispatch({ type: ActionTypes.CARTDETAIL, data: res.data.data.cartList });
        
        let totalAmount = 0;
        let totalItem = 0;
        res.data.data.cartList.map(element => {
            let tempPrice = (element.discountedPrice > 0 && element.discountedPrice < element.itemPrice) ? Number(element.discountedPrice) : Number(element.itemPrice);
            totalAmount = totalAmount + Number(tempPrice * element.quantity)
            if(element.isSubscribedItem == 0) totalItem = totalItem + 1;
        })
        dispatch({ type: ActionTypes.TOTALAMOUNT, data: totalAmount });
        dispatch({ type: ActionTypes.TOTALITEM, data: totalItem });
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









