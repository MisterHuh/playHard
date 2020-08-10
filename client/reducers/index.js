// this is where rootReducer file
// what we want to do here is COMBINE all of our reducers
// using combineReducers

import { combineReducers } from "redux";
import postReducer from "./postReducer";
import data from "./retrieveAllDataReducer";
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
  // posts: postReducer,
  data,
  form: formReducer
});
