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

export function listLocationSearch (lists) {
  return {
    type: types.LIST_LOCATION_SEARCH,
    lists
  }
}

export function throwSearchErrorMessage (error_type, message) {
  return {
    type: types.THROW_SEARCH_ERROR_MESSAGE,
    error_type,
    message
  }
}