import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
};
const defaultProps = {
};


class ListSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const error_message = this.props.error.error_type === 'search' ? this.props.error.message : ''; 
        return(
            <div>
                <input className="list-search-input" type="text" placeholder="검색할 나라/도시를 입력해주세요" />
                <span> {error_message} </span>
            </div>

        );
    }
}




ListSearch.propTypes = propTypes;
ListSearch.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        error: state.Errors
    }
}
export default connect(mapStateToProps)(ListSearch);