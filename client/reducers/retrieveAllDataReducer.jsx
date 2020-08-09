import { FETCH_ALL_DATA, FETCH_CURRENT_DATA, PREVIOUS_ENTRY, NEXT_ENTRY } from "../actions/types";


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
        // current_index: action.payload.length - 1
      }
    case FETCH_CURRENT_DATA:
      console.log("reducing: FETCH_CURRENT_DATA");
      return {
        ...state,
        current_data: action.payload,
      }
    case PREVIOUS_ENTRY:
      console.log("reducing: PREVIOUS_ENTRY");
      return {
        ...state,
        current_index: current_index + 1
      }
    default:
      return state;
  }
}
