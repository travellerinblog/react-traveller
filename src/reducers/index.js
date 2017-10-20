
import { combineReducers } from 'redux';
import list from './List';

const reducers = combineReducers({
  list: list
});

export default reducers;