import * as actions from '../actions/ActionTypes';
import update from 'react-addons-update';

const initial_state = {
  'type': "",
  'list': [],
  'search_flag': '',
  'page_amount': 1,
  'page_index': 0
}

export default function (state = initial_state, action) {
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
        'list': {$set: action.lists},
        'search_flag': {$set: 'search'}
      })
    case actions.LIST_PAGE_COUNT:
    return update(state, {
      'page_amount': {$set: action.page_amount}
    })
    case actions.LIST_PAGE_INDEXING: 
      return update(state, {
        'page_index': {$set: action.page_index}
      })
    default:
      return state;
  }
}

