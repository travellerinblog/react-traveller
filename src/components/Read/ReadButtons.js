import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};

// element.scrollIntoView(alignWithTop)
class ReadButtons extends Component {
    constructor(props) {
        super(props);
        this._handleScrollToTop = this._handleScrollToTop.bind(this);
        this._handleScrollToBottom = this._handleScrollToBottom.bind(this);
    }
    _handleScrollToTop() {
        document.getElementsByClassName('read-title-box')[0].scrollIntoView({'behavior':'smooth'});
    }
    _handleScrollToBottom() {
        document.getElementsByClassName('read-link-buttons')[0].scrollIntoView({'behavior':'smooth'});
    }
    render() {
        return(
            <div className="read-buttons">
                <div className="read-link-buttons"> 
                    <Link to="/List/All"> 목록으로 </Link>
                    <Link to="/Editor/userid"> 글쓰기 </Link>
                </div>
                <div className="read-scroll-buttons">
                    <button className="scroll-btn scroll-top" type="button" onClick={this._handleScrollToTop}> 위로 </button>
                    <button className="scroll-btn scroll-bottom" type="button" onClick={this._handleScrollToBottom}> 아래로 </button>
                </div>
            </div>
        );
    }
}
ReadButtons.propTypes = propTypes;
ReadButtons.defaultProps = defaultProps;
export default ReadButtons;

