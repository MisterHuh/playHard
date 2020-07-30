import { FETCH_ALL_DATA } from "../actions/types";

// const current = []

const initialState = {
  current: []
}

/* this is step 7e, after the action has been created */
// this function evaluates what TYPE of action that we are dealing with
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_DATA:
      console.log("fetchAlldata reducing");
      return {
        ...state,
        current: action.payload
      }
    default:
      return state;
  }
}

/* this is step 6, where we are declaring the function but no actions have been created yet */
// export default function(state = initialState, action) {
//   switch(action.type) {
//     default:
//       return state;
//   }
// }
