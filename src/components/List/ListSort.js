import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
const ListSort = ({onListSortByLastest, onListSortByPopular}) => {
    return (
      <ul className="list-sort-selector">
        <li className="list-sort-latest"><button className="list-sort-btn" type="button" onClick={() => {onListSortByLastest()}}>최신순</button></li>
        <li className="list-sort-popular"><button className="list-sort-btn" type="button" onClick={() => {onListSortByPopular()}}>인기순</button></li>
      </ul>
    );
}
 
const propTypes = {
    onListSortByLastest: PropTypes.func,
    onListSortByPopular: PropTypes.func
};
const defaultProps = {
    onListSortByLastest: () => console.warn('onSortByLastest is not defined'),
    onListSortByPopular: () => console.warn('onSrotByPopular is not defined')
};
 
export default ListSort;