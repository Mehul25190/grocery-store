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
  return axios.get(url.searchItem, { queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
    if (res.status == 200) {
      //console.log('product list return');  
      //console.log(res);
      return res.data;
    } else {
      return res;
    }
  })
}

export const searchItemWithoutLoader = payloads => dispatch => {
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.searchItem, { queries: payloads }).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
    if (res.status == 200) {
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
  return axios.get(url.getItemDetail, { queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if (res.status == 200) {
      dispatch({ type: ActionTypes.PRODUCTDETAIL, data: res.data.data });
      return res.data
    } else {
      return res
    }
  });
}
export const similarproduct = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.similarproduct, { queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if (res.status == 200) {
      dispatch({ type: ActionTypes.SIMILARPRODUCT, data: res.data.data.itemList });
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
    console.log(res.data);
    if (res.status == 200) {
      dispatch({ type: ActionTypes.CATEGORYOFFER, data: res.data.data.offerList });
      return res.data
    } else {
      return res
    }
  });
}

export const fetchEthnicities = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchEthnicities).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log("ethnicities",res.data);
    if (res.status == 200) {
      dispatch({ type: ActionTypes.FETHETHNICITIES, data: res.data.data.ethnicityList });
      return res.data
    } else {
      return res
    }
  });
}

export const fetchEthnicitiesdetails = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchEthnicitiesdetails, { queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if (res.status == 200) {
      dispatch({ type: ActionTypes.FETHETHNICITIESDETAILS, data: res.data.data.itemList });
      return res
    } else {
      return res
    }
  });
}

export const fetchBrand = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchBrand).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log(res.data);
    if (res.status == 200) {
      dispatch({ type: ActionTypes.FETCHBRAND, data: res.data.data.brand });
      return res.data
    } else {
      return res
    }
  });
}

export const fetchBranddetails = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchBranddetails, { queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if (res.status == 200) {
      dispatch({ type: ActionTypes.FETCHBRANDDETAILS, data: res.data.data.itemList });
      return res
    } else {
      return res
    }
  });
}

export const fetchItemsByOffer = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchItemsByOffer, { queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log(res.data);
    if (res.status == 200) {
      dispatch({ type: ActionTypes.CATEGORYOFFER, data: res.data.data.offerList });
      return res.data
    } else {
      return res
    }
  });
}

export const fetchItemsByOfferWithoutLoader = payloads => dispatch => {
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchItemsByOffer, { queries: payloads }).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log(res.data);
    if (res.status == 200) {
      dispatch({ type: ActionTypes.CATEGORYOFFER, data: res.data.data.offerList });
      return res.data
    } else {
      return res
    }
  });
}




export const fetchwishlist = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchwishlist, { queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if (res.status == 200) {
      console.log("wishlist",res.data.data.wishlist)
      dispatch({ type: ActionTypes.FETCHWISHLIST, data: res.data.data.wishlist });
      return res
    } else {
      return res
    }
  });
}

export const addtowishlist = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.addtowishlist, { payloads: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log(res.data);
    if (res.status == 200) {
      dispatch({ type: ActionTypes.FETCHWISHLIST, data: res.data.data.wishlist });
      return res.data
    } else {
      return res
    }
  });
}

export const deltowishlist = payloads => dispatch => {
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.deltowishlist, { payloads: payloads }).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log(res.data);
    if (res.status == 200) {
      
      return res.data
    } else {
      return res
    }
  });
}
export const filterapply = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchEthnicitiesdetails,{ queries: payloads }).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log("API RES",res)
    if (res.status == 200) {
      dispatch({ type: ActionTypes.FILTERDATA, data: res.data.data.itemList });
      return res
    } else {
      return res
    }
  });
}