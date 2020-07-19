import { FETCH_POSTS, NEW_POST } from "./types";


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
export const fetchPosts = () => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    }));
}
