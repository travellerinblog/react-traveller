import * as types from './ActionTypes';


export function fetchDB (data){
  return {
    type: types.FETCH_DB,
    data
  }
}

export function listSortByLastest (lists) {
  return {
    type: types.LIST_SORT_BY_LATEST,
    lists
  }
}

export function listSortByPopular (lists) {
  return {
    type: types.LIST_SORT_BY_POPULAR,
    lists
  }
}
