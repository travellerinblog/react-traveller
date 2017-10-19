import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
class ListSort extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <ul className="list-sort">
            <li><button type="button">최신순</button></li>
            <li><button type="button">인기순</button></li>
          </ul>
        );
    }
}
ListSort.propTypes = propTypes;
ListSort.defaultProps = defaultProps;
export default ListSort;