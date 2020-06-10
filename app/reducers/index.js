// Imports: Reducers
import auth from './auth';
import common from './common';
import subscription from './subscription';
import { reducer as formReducer } from 'redux-form';

// Redux: Root Reducer
const rootReducer = {
  auth: auth,
  common: common,
  form: formReducer,
  subscription: subscription,
};

// Exports
export default rootReducer;