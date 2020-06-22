import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';


export const viewcart = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.viewCart,  {queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.CARTDETAIL, data: res.data.data.cartList });
        dispatch({ type: ActionTypes.TOTALITEM, data: res.data.data.cartList.length });
        let totalAmount = 0;
        res.data.data.cartList.map(element => {
          console.log(Number(tempPrice))
            let tempPrice = (element.discountedPrice > 0 && element.discountedPrice < element.itemPrice) ? Number(element.discountedPrice) : Number(element.itemPrice);
            console.log(Number(tempPrice))
            totalAmount = totalAmount + Number(tempPrice)
            console.log(totalAmount)
        })
        dispatch({ type: ActionTypes.TOTALAMOUNT, data: totalAmount });
        return res.data
      } else {
        return res
      }
    });
}









