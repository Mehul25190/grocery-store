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
          console.log(res.data.data)
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
    console.log("sign in mobile");
    console.log(res);
    if(res.status == 200){
      if(res.data.status=="success"){
        dispatch({ type: ActionTypes.MOBILENO, data: payloads.mobileNo });
        //dispatch({ type: ActionTypes.SIGNIN, data: res.data.data });
        //dispatch({ type: ActionTypes.SIGNIN, data: res.data.data });
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
    console.log(res);
    if(res.status == 200){
      dispatch({ type: ActionTypes.SIGNIN, data: res.data.data });
      return res.data;
    } else {
      return res;
    }
  })
}

export const signInMobileVerification = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.loginVerifyMobile,  {payloads: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    console.log(res);
    if(res.status == 200){
      dispatch({ type: ActionTypes.SIGNIN, data: res.data.data });
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
      console.log("set cat", res.data.data.category);
      dispatch({ type: ActionTypes.CATEGORYLIST, data: res.data.data.category });
      return res.data;
    } else {
      return res;
    }
  })
}

/**
 * Show City List on address save screen
 */
export const showCityList = payloads => dispatch => {
  //console.log("showCategoryList>>> action ")
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.cityList).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
    if(res.status == 200){
      //console.log('under');
      //console.log(res.data);
      return res.data;
    } else {
      return res;
    }
  })
}

/**
 * Show Area List on address save screen
 */
export const showAreaList = payloads => dispatch => {
  //console.log("showCategoryList>>> action ")
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.areaList,{queries: payloads}).then(res => {
    //console.log(payloads);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res.data);
    if(res.status == 200){
      ///console.log('under');
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

export const getProductList = payloads => dispatch => {
  //console.log("showCategoryList>>> action ")
  //console.log('payload>>'+payloads);
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.productList,{queries: payloads}).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
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

/**
 * Save User Profile
 */

export const saveUserProfile = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.saveUserProfile,  {payloads: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res);
      if(res.status == 200){
        dispatch({ type: ActionTypes.SIGNIN, data: res.data.data });
        //console.log(res.data.userProfile);
        //dispatch({ type: ActionTypes.SIGNIN, data: res.data.data });
        return res.data
      } else {
        return res
      }
    });
}

/**
 * get User EthenCity 
 */
export const showEthenCityList = payloads => dispatch => {
  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchEthnicityList,  {queries: payloads}).then(res => {
    
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res);
      if(res.status == 200){
        //console.log('return');
        //console.log(res.data);
        return res.data
      } else {
        return res
      }
    });

}
/**
 * get User profile 
 */
export const showUserProfile = payloads => dispatch => {
  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.showUserProfile,  {queries: payloads}).then(res => {
    
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res);
      if(res.status == 200){
        //console.log('return');
        //console.log(res.data);
        return res.data
      } else {
        return res
      }
    });

}

/**
 * Save User Address
 */

export const saveUserAddress = payloads => dispatch => {
  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.saveUserAddress,  {payloads: payloads}).then(res => {
    //console.log("under address");
    //console.log(payloads);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res);
      if(res.status == 200){
        //console.log('return');
        //console.log(res.data);
        return res
      } else {
        return res
      }
    });
}

/**
 * Get User delivery address
 */
export const showUserDeliveryAddress = payloads => dispatch => {
  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.showUserDeliveryAddress,  {queries: payloads}).then(res => {
    
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res);
      if(res.status == 200){
        //console.log('return');
        //console.log(res.data);
        return res.data
      } else {
        return res
      }
    });

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
  //console.log('payloads', payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getDeviveryAddress,  {queries: payloads}).then(res => {
    //console.log("get del add"+res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.DELIVERYADDRESS, data: res.data.data.userAddressDtls});
        //console.log("get del add"+res.data);
        return res.data
      } else {
        return res
      }
    });
}
/**
 * Get User Order List
 * @param {} payloads 
 */
export const getUserOrderList = payloads => dispatch => {
  //console.log('payloads', payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getUserOrderList,  {queries: payloads}).then(res => {
   // console.log("get del add"+res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        //console.log("get del add"+res.data);
        return res.data
      } else {
        return res
      }
    });
}

/**
 * Get User Wallet List
 * @param {} payloads 
 */
export const getUserWalletList = payloads => dispatch => {
  //console.log('payloads', payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getUserWalletList,  {queries: payloads}).then(res => {
    console.log("xxxxx"+res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        console.log("get response"+res.data);
        return res.data
      } else {
        return res
      }
    });
}
/**
 * Get Cancel order
 * @param {} payloads 
 */
export const cancelOrder = payloads => dispatch => {
  //console.log('payloads', payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.cancelOrder,  {payloads: payloads}).then(res => {
   // console.log("get del add"+res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        //console.log("get del add"+res.data);
        return res.data
      } else {
        return res
      }
    });
}

/**
 * return order
 * @param {} payloads 
 */
export const saveReturnOrder = payloads => dispatch => {
  //console.log('payloads', payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.returnOrder,  {payloads: payloads}).then(res => {
   // console.log("get del add"+res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        //console.log("get del add"+res.data);
        return res.data
      } else {
        return res
      }
    });
}

/**
 * getOrderDetailById
 * @param {*} payloads 
 */
export const getOrderDetailById = payloads => dispatch => {
  //console.log('payloads', payloads);
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getOrderDetailById,  {queries: payloads}).then(res => {
    console.log("get order details"+res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        //console.log("get del add"+res.data);
        return res.data
      } else {
        return res
      }
    });
}

export const getOrderDetailById1 = payloads => dispatch => {
  //console.log('payloads', payloads);
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.getOrderDetailById,  {queries: payloads}).then(res => {
    console.log("get order details"+res.data);
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        //console.log("get del add"+res.data);
        return res.data
      } else {
        return res
      }
    });
}


/****  Get Sub Category Lisy ****/
export const fetchSubCategory = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchSubCategory,{queries: payloads}).then(res => {
    //dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      return res.data;
    } else {
      return res;
    }
  })
}
/****  Get Sub Category Lisy ****/

/***** Fetch the user wallet detail ******/
export const fetchUserWallet = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.fetchUserWallet,{queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      return res.data;
    } else {
      return res;
    }
  })
}
/***** Fetch the user wallet detail ******/


/**
 * Save Item Rating 
 */

export const saveItemRating = payloads => dispatch => {
  
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.saveItemRatings,  {payloads: payloads}).then(res => {
    
    //console.log(payloads);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    //console.log(res);
      if(res.status == 200){
        //console.log('return');
        //console.log(res.data);
        return res
      } else {
        return res
      }
    });
}


export const rechargeWallet = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.rechargeWallet,{payloads: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      return res.data;
    } else {
      return res;
    }
  })
}

export const checkActiveSubscription = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.get(url.checkActiveSubscription,{queries: payloads}).then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      return res.data;
    } else {
      return res;
    }
  })
}

