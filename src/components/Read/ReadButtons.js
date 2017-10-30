import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
class ReadButtons extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="read-buttons">
                <div className="read-link-buttons"> 
                    <a herf=""> 목록으로 </a>
                    <a herf=""> 글쓰기 </a>
                </div>
                <div className="read-scroll-buttons">
                    <button className="scroll-btn scroll-top" type="button"> 위로 </button>
                    <button className="scroll-btn scroll-bottom" type="button"> 아래로 </button>
                </div>
            </div>
        );
    }
}
ReadButtons.propTypes = propTypes;
ReadButtons.defaultProps = defaultProps;
export default ReadButtons;

