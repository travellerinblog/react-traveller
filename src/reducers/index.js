
import { combineReducers } from 'redux';
import list from './reducer_list_item';
import Errors from './reducer_error_messages';
import Lists from './reducer_lists';
import Users from './reducer_users';

const reducers = combineReducers({
  list,
  Errors,
  list_db: Lists,
  user_db: Users
});

export default reducers;