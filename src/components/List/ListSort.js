import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const propTypes = {
    app_lists: PropTypes.object,
    sorted_list: PropTypes.object,
    listSortByLastest: PropTypes.func,
    listSortByPopular: PropTypes.func
};
const defaultProps = {
    app_lists: {},
    sorted_list: {},
    listSortByLastest: () => console.warn('listSortByLastest is not defined'),
    listSortByPopular: () => console.warn('listSortByPopular is not defined')
};
class ListSort extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <ul className="list-sort">
            <li><button type="button" onClick={this.props.listLastest}>최신순</button></li>
            <li><button type="button" onClick={this.props.listPopular}>인기순</button></li>
          </ul>
        );
    }
}
ListSort.propTypes = propTypes;
ListSort.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        app_lists: state.getDB.lists,
        sorted_list: state.list
    }
}

export default connect(mapStateToProps, actions)(ListSort);