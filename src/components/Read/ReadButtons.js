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
        this.handleScrollToTop = this.handleScrollToTop.bind(this);
        this.handleScrollToBottom = this.handleScrollToBottom.bind(this);
    }
    handleScrollToTop() {
        document.getElementsByClassName('read-title-box')[0].scrollIntoView({'behavior':'smooth'});
    }
    handleScrollToBottom() {
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
                    <button className="scroll-btn scroll-top" type="button" onClick={this.handleScrollToTop}> 위로 </button>
                    <button className="scroll-btn scroll-bottom" type="button" onClick={this.handleScrollToBottom}> 아래로 </button>
                </div>
            </div>
        );
    }
}
ReadButtons.propTypes = propTypes;
ReadButtons.defaultProps = defaultProps;
export default ReadButtons;

