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
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default subscription;