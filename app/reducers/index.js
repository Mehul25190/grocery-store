// Imports: Reducers
import auth from './auth';
import common from './common';
import subscription from './subscription';
import product from './product';
import cart from './cart';
import { reducer as formReducer } from 'redux-form';

// Redux: Root Reducer
const rootReducer = {
  auth: auth,
  common: common,
  form: formReducer,
  subscription: subscription,
  product: product,
  cart: cart,
};

// Exports
export default rootReducer;