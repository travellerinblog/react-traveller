import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const propTypes = {
    app_lists: PropTypes.object,
    sorted_list: PropTypes.object,
    onSortByLastest: PropTypes.func,
    onSrotByPopular: PropTypes.func
};
const defaultProps = {
    app_lists: {},
    sorted_list: {},
    onSortByLastest: () => console.warn('onSortByLastest is not defined'),
    onSrotByPopular: () => console.warn('onSrotByPopular is not defined')
};
class ListSort extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <ul className="list-sort">
            <li><button type="button" onClick={this.props.onSortByLastest}>최신순</button></li>
            <li><button type="button" onClick={this.props.onSrotByPopular}>인기순</button></li>
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