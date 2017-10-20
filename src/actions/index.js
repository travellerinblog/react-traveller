import {FETCH_DB} from './ActionTypes';


export function fetchDB (data){
  return {
    type: FETCH_DB,
    data
  }
}


