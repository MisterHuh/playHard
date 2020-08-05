import { FETCH_CURRENT_DATA } from "./types";

// thunk middleware allows us to call the dispatch function directly so that we can make async request

// export function fetchCurrentData() {
//   return function (dispatch) {
//     console.log("action: FETCH_CURRENT_DATA")
//     fetch(`/api/getCurrent.php`)
//     .then(res => res.json())
//     .then(data => dispatch({
//       type: FETCH_CURRENT_DATA,
//       payload: data
//     }))
//   }
// }

// cleaned up with es6
export const fetchCurrentData = () => dispatch => {
  console.log("action: FETCH_CURRENT_DATA")
  fetch(`/api/getCurrent.php`)
    .then(res => res.json())
    .then(data => dispatch({
      type: FETCH_CURRENT_DATA,
      payload: data
    }))
};
