import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};


class ListSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <input className="list-search-input" type="text" placeholder="검색할 나라/도시를 입력해주세요" />
            </div>

        );
    }
}




ListSearch.propTypes = propTypes;
ListSearch.defaultProps = defaultProps;
export default ListSearch;