import * as actions from '../actions/ActionTypes';
import update from 'react-addons-update';

const initial_state = {
  DB_lists: [],
  DB_users: []
}

export default function(state = initial_state, action) {
  switch (action.type) {
    case actions.FETCH_DB:
      return update(state, {
        DB_lists: {$set: action.data.lists},
        DB_users: {$set: action.data.users}
      })
    default:
      return state;
  }
}