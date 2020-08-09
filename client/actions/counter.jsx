import { PREVIOUS_ENTRY, NEXT_ENTRY } from './types';

export const previousEntry = () => dispatch => {
  console.log("action: PREVIOUS_ENTRY");
  dispatch({
    type: PREVIOUS_ENTRY,
    payload: 1
  })
}

export const nextEntry = () => dispatch => {
  console.log("action: NEXT_ENTRY");
  dispatch({
    type: NEXT_ENTRY
    // payload: 1
  })
}

// export function previousEntry() {
//   console.log("action: PREVIOUS_ENTRY");
//   return function (dispatch) {
//     type: PREVIOUS_ENTRY,
//     payload: 1
//   }
// }
