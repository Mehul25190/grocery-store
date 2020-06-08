// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const subscription = (state = initialState.subscription, action) => {
  switch (action.type) {
    case ActionTypes.RESETSTATE: {
      return initialState.subscription
    }
    case ActionTypes.DELIVERYADDRESS: {
      return {
        ...state,
        deviveryAddress: action.data,
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