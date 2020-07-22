import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

/* this is placeholder store, to explain Provider */
// takes dummy function --> will be a reducer
// takes the initial state
// takes enhancers

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
