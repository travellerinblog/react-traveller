import * as actions from '../actions/ActionTypes';


export default function(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_DB:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}