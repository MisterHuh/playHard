// evaluate any actions that are committed
// such as fetching our post
// such as creating a new post

// for actions, we must create TYPES, which are constants
// these constants wil lbe stored in ./actions./types.jsx
import { FETCH_POSTS, NEW_POST } from "../actions/types";

// from our postREducer, we want to create our initial state
// this is the state tree that you will be using

const initialState = {
  items: [],
  item: {}
}


// this function evaluates what TYPE of action that we are dealing with
export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
}
