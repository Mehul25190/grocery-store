// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const cart = (state = initialState.cart, action) => {
  switch (action.type) {
    case ActionTypes.RESETSTATE: {
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
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default cart;