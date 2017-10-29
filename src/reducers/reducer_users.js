import { USER_DB } from '../actions/';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_DB:
      console.log('reducer action: ', action);
      return action.payload.data;
    default:
      return state;
  }
}