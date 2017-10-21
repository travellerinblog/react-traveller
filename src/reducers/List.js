import * as actions from '../actions/ActionTypes';


export default function(state = {}, action) {
  switch (action.type) {
    case actions.LIST_SORT_BY_LATEST:
      return Object.assign({}, state, {'type': action.type, 'list': action.lists});
    case actions.LIST_SORT_BY_POPULAR:
      return Object.assign({}, state, {'type': action.type, 'list': action.lists});
    default:
      return state;
  }
}
