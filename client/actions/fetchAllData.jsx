import { FETCH_ALL_DATA } from "./types";

// thunk middleware allows us to call the dispatch function directly so that we can make async request

export function fetchAllData() {
  return function (dispatch) {
    console.log("action: FETCH_ALL_DATA")
    fetch(`/api/retrieveAllData.php`)
    .then(res => res.json())
    .then(data => dispatch({
      type: FETCH_ALL_DATA,
      payload: data
    }))
  }
}

// cleaned up with es6
// export const fetchAllData = () => dispatch => {
//   console.log("action: fetchAlldata")
//   fetch(`/api/retrieveAllData.php`)
//     .then(res => res.json())
//     .then(data => dispatch({
//       type: FETCH_ALL_DATA,
//       payload: data
//     }))
// };
