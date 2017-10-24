
import { combineReducers } from 'redux';
import DB from './DB';
import list from './List';
import Errors from './Errors';

const reducers = combineReducers({
  getDB: DB,
  list: list,
  Errors: Errors
});

export default reducers;