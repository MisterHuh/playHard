import React from 'react';

// function ReduxApp() {
//   return (
//     <div>
//       <h1>hello</h1>
//     </div>
//   )
// }


// STORE
import { createStore } from 'redux';


// ACTION
const increment = () => {
  return {
    type: "INCREMENT" // this can also be called name
  }
}

const decrement = () => {
  return {
    type: "DECREMENT" // this can also be called name
  }
}


// REDUCER
const counter = (state = 0, action) => {
  switch(action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

let store = createStore(counter);

// display it on the console
// nothing is going to happen YET because it needs to be dispatched
store.subscribe(() => console.log(store.getState()));


// DISPATCH
store.dispatch(increment());

export const ReduxApp = () => {
  return (
    <div>
      <h1>export const</h1>
    </div>
  )
}

// export default ReduxApp;
