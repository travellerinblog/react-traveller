
import { combineReducers } from 'redux';
import DB from './DB';
import list from './List';

const reducers = combineReducers({
  getDB: DB,
  list: list
});

export default reducers;