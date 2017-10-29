
import { combineReducers } from 'redux';
import list from './List';
import Errors from './Errors';
import Lists from './reducer_lists';
import Users from './reducer_users';

const reducers = combineReducers({
  list,
  Errors,
  list_db: Lists,
  user_db: Users
});

export default reducers;