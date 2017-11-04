import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
class ReadContents extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="read-contents-box">
                <ul className="read-contents">
                    {/* 콘텐츠 수에 따라서 li 개수 달라짐, 콘텐츠 안의 key값으로 img와 p를 구분 */}
                    {/* 에디터 완료되면 내용 수정 */}
                    <li className="read-content">
                        <p>본문 내용</p>
                    </li>
                    <li className="read-content">
                        <img src="" alt="" />
                    </li>
                </ul>
            </div>
        );
    }
}
ReadContents.propTypes = propTypes;
ReadContents.defaultProps = defaultProps;
export default ReadContents;


