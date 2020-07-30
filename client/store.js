import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';


// takes dummy function --> will be a reducer
// takes the initial state
// takes enhancers
/* below is placeholder store, to explain Provider */
// const store = createStore(() => [], {}, applyMiddleware());


const initialState = {};
// const middleware = [thunk];

/* this is an actual store */
// const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  );


// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;
