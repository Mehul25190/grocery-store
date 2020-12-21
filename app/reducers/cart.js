// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const cart = (state = initialState.cart, action) => {
  switch (action.type) {
    case ActionTypes.RESETCARTSTATE: {
      return initialState.cart
    }
    case ActionTypes.CARTDETAIL: {
    	return {
	    	...state,
	        cartDetail: action.data,
	    }
    }
    case ActionTypes.TOTALITEM: {
    	return {
	    	...state,
	        totalItem: action.data,
	    }
    }
    case ActionTypes.TOTALAMOUNT: {
    	return {
	    	...state,
	        totalAmount: action.data,
	    }
    }
    case ActionTypes.DELIVERYCHARGES: {
      return {
        ...state,
        deliveryCharges: action.data,
      }
    }
    case ActionTypes.ACTUALTOTAL: {
      return {
        ...state,
        actualTotal: action.data,
      }
    }
    case ActionTypes.VIEWCARTDETAIL: {
      return {
        ...state,
          viewCartDetail: action.data,
      }
    }
    case ActionTypes.WALLETAMOUNT: {
      return {
        ...state,
        walletAmount: action.data,
      }
    }
    case ActionTypes.CHECHOUTAMOUNT: {
      return {
        ...state,
        checkoutAmount: action.data,
      }
    }
    case ActionTypes.DUMMYUSER: {
      return {
        ...state,
        dummyuser: action.data,
      }
    }
    
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default cart;