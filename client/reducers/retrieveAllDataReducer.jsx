import { FETCH_ALL_DATA, FETCH_CURRENT_DATA } from "../actions/types";


const initialState = {
  all_data: [],
  current_data: [],
  current_index: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_DATA:
      console.log("reducing: FETCH_ALL_DATA");
      return {
        ...state,
        all_data: action.payload
      }
    case FETCH_CURRENT_DATA:
      console.log("reducing: FETCH_CURRENT_DATA");
      return {
        ...state,
        current_data: action.payload
      }
    default:
      return state;
  }
}
