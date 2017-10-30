import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
class ReadTitle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="read-title">
                <div className="read-title-image">
                    <img src="" alt=""/>
                </div>
                <div className="read-title-contents">
                    <a className="read-title-content" herf="">tag</a>
                    <p className="read-title-content"> by. 작성자 이름 | 나라이름 | 조회수 </p>
                    <p className="read-title-content"> 작성일 | 여행기간</p> 
                </div>
                {/* 수정&삭제 조건 처리, read-delete div 조건 처리 */}
                <div className="read-title-buttons">
                    <a href="">수정</a>
                    <button type="button">삭제</button>
                </div>
                <div className="read-delete">
                    <p className="read-delete-comment">글을 삭제하시겠습니까?</p>
                    <button type="button" className="read-delete-cancel">취소</button>
                    <button type="button" className="read-delete-excute">삭제</button>
                </div>
            </div>
        );
    }
}
ReadTitle.propTypes = propTypes;
ReadTitle.defaultProps = defaultProps;
export default ReadTitle;
