import { USER_DB } from '../actions/ActionTypes';

function dataProcessing(data) {
  
  return Object.keys(data).map(key => {
    const list_item = data[key];
    list_item.key = key;
    return list_item;
  });
}

export default function (state = {}, action) {
  switch (action.type) {
    case USER_DB:
      return dataProcessing(action.payload.data);
    default:
      return state;
  }
}