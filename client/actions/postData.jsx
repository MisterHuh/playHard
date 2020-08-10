import { POST_DATA } from './types'

export const postData = (entry) => dispatch => {
  console.log("action: POST_DATA");
  fetch('/api/add.php', {
    method: 'POST',
    headers: { 'Content-Type':'application/json'},
    body: JSON.stringify(entry)
  })
  .then(res => res.json())
  .then(entry => dispatch({
    type: POST_DATA,
    payload: entry
  }))
}
