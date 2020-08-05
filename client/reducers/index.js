// this is where rootReducer file
// what we want to do here is COMBINE all of our reducers
// using combineReducers

import { combineReducers } from "redux";
import postReducer from "./postReducer";
import data from "./retrieveAllDataReducer";


export default combineReducers({
  // posts: postReducer,
  data: data
});
