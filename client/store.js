import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';


// takes dummy function --> will be a reducer
// takes the initial state
// takes enhancers
/* below is placeholder store, to explain Provider */
// const store = createStore(() => [], {}, applyMiddleware());


const initialState = {};
const middleware = [thunk];

/* this is an actual store */
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
