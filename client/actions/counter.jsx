import { PREVIOUS_ENTRY, NEXT_ENTRY } from './types';

// export const previousEntry = () => dispatch => {

// }

export function previousEntry() {
  console.log("action: PREVIOUS_ENTRY");
  return function (dispatch) {
    type: "PREVIOUS_ENTRY"
  }
}
