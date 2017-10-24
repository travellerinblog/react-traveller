import * as actions from '../actions/ActionTypes';
import update from 'react-addons-update';

const initial_state = {
  'type': "",
  'list': []
}

export default function(state = initial_state, action) {
  switch (action.type) {
    case actions.LIST_SORT_BY_LATEST:
      return update(state, {
        'type': {$set: action.type},
        'list': {$set: action.lists}
      })
    case actions.LIST_SORT_BY_POPULAR:
      return update(state, {
        'type': {$set: action.type},
        'list': {$set: action.lists}
      });
    case actions.LIST_LOCATION_SEARCH:
      return update(state, {
        'type': {$set: action.type},
        'list': {$set: action.lists}
      })
    default:
      return state;
  }
}