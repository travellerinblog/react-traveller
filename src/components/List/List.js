import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListSort from './ListSort';
import ListSearch from './ListSearch';
import ListItems from './ListItems';
import ListPages from './ListPages';
import ListFooter from './ListFooter';

const propTypes = {
};
const defaultProps = {
};
class List extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div className="List">
            <h1>당신의 다음 목적지는 어디인가요?</h1>
            <ListSearch/>
            <ListSort/>
            <ListItems/>
            <ListPages/>
            <ListFooter/>
          </div>
        );
    }
}
List.propTypes = propTypes;
List.defaultProps = defaultProps;
export default List;