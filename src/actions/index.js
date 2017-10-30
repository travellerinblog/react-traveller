import axios from 'axios';
import * as types from './ActionTypes';

export function listDB() {
  
  const request = axios.get('https://traveler-in-blog.firebaseio.com/lists.json');
  return {
    type: types.LIST_DB,
    payload: request
  }
}
export function userDB() {
  
  const request = axios.get('https://traveler-in-blog.firebaseio.com/users.json');
  return {
    type: types.USER_DB,
    payload: request
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

export function listPageCount (page_amount) {
  return {
    type: types.LIST_PAGE_COUNT,
    page_amount
  }
}

export function listPageIndexing (page_index) {
  return {
    type: types.LIST_PAGE_INDEXING,
    page_index
  }
}

export function throwSearchErrorMessage (error_type, message) {
  return {
    type: types.THROW_SEARCH_ERROR_MESSAGE,
    error_type,
    message
  }
}

