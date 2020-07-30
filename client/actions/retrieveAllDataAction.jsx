import { FETCH_ALL_DATA } from "./types";

// thunk middleware allows us to call the dispatch function directly so that we can make async request


// export function fetchPosts() {
//   return function (dispatch) {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then(res => res.json())
//       .then(posts => dispatch({
//         type: FETCH_POSTS,
//         payload: posts
//       }));
//   }
// }

// cleaned up with es6
// export const fetchPosts = () => dispatch => {
//   // console.log("fetching");
//   fetch("https://jsonplaceholder.typicode.com/posts")
//     // fetch(`/api/retrieveAllData.php`)
//     .then(res => res.json())
//     .then(posts => dispatch({
//       type: FETCH_POSTS,
//       payload: posts
//     }));
// }


export function retrieveAllData() {
  return function (dispatch) {
    console.log("fetchAlldata fetching")
    fetch(`/api/retrieveAllData.php`)
      .then(res => res.json())
      .then(data => dispatch({
        type: FETCH_ALL_DATA,
        payload: data
      }))
  }
}

// export const retrieveAllData = () => dispatch => {
//   console.log("retrieveAlldata fetching")
// }
