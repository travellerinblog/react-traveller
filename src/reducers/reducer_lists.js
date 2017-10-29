import { LIST_DB } from '../actions/ActionTypes';

console.log('reducer list: ', LIST_DB);
function dataProcessing(data) {
  
  return Object.keys(data).map(key => {
    const list_item = data[key];
    list_item.key = key;
    return list_item;
  });
}

export default function (state = {}, action) {
  switch (action.type) {
    case LIST_DB:
      console.log('reducer action: ', action);
      return dataProcessing(action.payload.data);
    default:
      return state;
  }
}