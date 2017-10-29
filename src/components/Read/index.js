import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};
class Read extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
              <h1>Read Page!</h1>
            </div>
        );
    }
}
Read.propTypes = propTypes;
Read.defaultProps = defaultProps;
export default Read;