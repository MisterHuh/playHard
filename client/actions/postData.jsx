import { POST_DATA } from './types'

export const postData = (entry) => dispatch => {
  console.log("action: POST_DATA");

  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  };

  fetch('/api/add.php', req)
    .then(res => res.json())

    // .then((data) => {
    //   resolve(data ? JSON.parse(data) : {})
    // })
    // .catch((error) => {
    //   reject(error)
    // })

    .then(data => dispatch({
          type: POST_DATA,
          payload: entry
        })
    )

    // .then(data => {
    //   console.log("data is: ", data),
    //     dispatch({
    //       type: POST_DATA,
    //       payload: data
    //     })
    // })
}
