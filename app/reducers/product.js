// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const subscription = (state = initialState.product, action) => {
  switch (action.type) {
    case ActionTypes.RESETSTATE: {
      return initialState.product
    }
    case ActionTypes.PRODUCTDETAIL: {
      return {
        ...state,
        productDetail: action.data,
      }
    }

    case ActionTypes.FETCHBRAND: {
      return {
        ...state,
        brand: action.data,
      }
    }

    case ActionTypes.FETCHBRANDDETAILS: {
      return {
        ...state,
        brandlisting: action.data,
        brandlistingbrand: action.brand,
      }
    }

    case ActionTypes.FETHETHNICITIES: {
      return {
        ...state,
        ethnicities: action.data,
       
      }
    }

    case ActionTypes.FETHETHNICITIESDETAILS: {
      return {
        ...state,
        ethnicitieslisting: action.data,
        ethnicitieslistingbrand: action.brand
      }
    }

    case ActionTypes.FETCHWISHLIST: {
      return {
        ...state,
        fetchwishlist: action.data,
      }
    }

    case ActionTypes.SIMILARPRODUCT: {
      return {
        ...state,
        similarproduct: action.data,
      }
    }

    case ActionTypes.FILTERDATA: {
      return {
        ...state,
        applyfilter: action.data,
      }
    }
    

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default subscription;