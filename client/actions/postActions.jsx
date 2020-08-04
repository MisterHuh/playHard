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
  console.log("fetching");
  fetch("https://jsonplaceholder.typicode.com/posts")
    // fetch(`/api/retrieveAllData.php`)
    .then(res => res.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts
    }));
}

export function createPosts(postData) {
  return function (dispatch) {
    console.log("action called");
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(post => dispatch({
        type: NEW_POST,
        payload: post
      }))
  }
}
