import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
// poprs로 받아오거나, 로컬스토리지에서 받아올 값
const user_id = 'user1';
// 로그인으로 연결하는 값
const list_footer_goto_sign = (<a href=''> 시작하기 </a>)
// 글쓰기로 연결하는 값
const list_footer_goto_write = (<a href=''> 글쓰러가기 </a>)
// 출력해주는 값
const list_footer_render = user_id ? list_footer_goto_write : list_footer_goto_sign;
class ListFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="list-footer">
              <h2 className="list-footer-title">당신의 여행 일지를 트래블러스들에게 자랑하는 공간!</h2>
              { list_footer_render }
            </div>
        );
    }
}


// .goto-write
// h2.write-title 
// button.btn-start(type="button" @click="showSignModal" v-if="userStatus === 'out'") 시작하기
// router-link.write-link(:to="{name: 'Write', query: {id: userUid}}" v-if="userStatus === 'in'") 여행 일지 쓰기
ListFooter.propTypes = propTypes;
ListFooter.defaultProps = defaultProps;
export default ListFooter;