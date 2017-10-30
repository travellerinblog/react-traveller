import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
class ReadReply extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="read-reply">
                {/* 로그인 한 경우 아닌 경우 조건 처리  */}
                <div className="read-reply-login">
                    <p> 로그인 후 댓글을 작성해주세요. </p>
                    <a href=""> 트레블로 시작하기 </a>
                </div>
                <div className="read-reply-input">
                    <h2 className="read-reply-title"> 댓글작성 </h2>
                    <textarea className="read-reply-textarea" placeholder="댓글을 입력해주세요."/> 
                    <button className="read-reply-submit"type="button" >등록</button>
                </div>
                <ul className="read-reply-list">
                    <li className="read-reply-item">
                        <div className="read-reply-item-title">
                            <p className="read-reply-item-author"> 작성자 </p>
                            <p className="read-reply-item-date"> 작성일 </p>
                            {/* 조건처리(사용자 id check) */}
                            <div className="read-reply-item-btns">
                                <button className="read-reply-edit" type="button">수정</button>
                                {/* 저장/ 취소는 수정 버튼을 눌렀을 때 표시 됨 */}
                                <button className="read-reply-save" type="button">저장</button>
                                <button className="read-reply-cancel" type="button">취소</button>
                                <button className="read-reply-delete" type="button">삭제</button>
                            </div>
                        </div>
                        <p className="read-reply-item-content"> 댓글 내용 </p> 
                    </li>
                </ul>
            </div>
        );
    }
}
ReadReply.propTypes = propTypes;
ReadReply.defaultProps = defaultProps;
export default ReadReply;


//           span {{item.date}}
//           span(v-if="userStatus==='in'")
//             button.btn-edit(v-show="item.user_uid === signUserUid && !showEditReply" type="button" @click="changeEditReply({'index': index,'replyText': item.reply_text})") 수정
//             button.btn-save(v-show="showEditReply && index === replyEditable.index" type="button" @click="saveEditReply(item.key)" :id="'reply-save' + index") 저장
//             button.btn-cancel(v-show="showEditReply && index === replyEditable.index" type="button" @click="cancelEditReply(index)") 취소
//             button.btn-delete(v-show="item.user_uid === signUserUid && !showEditReply" type="button" @click="deleteAction(item.key)") 삭제
//       .reply-list-content
//         p(:id="'reply'+index" :contenteditable="replyEditable.index === index && replyEditable.state === true" @blur="focusOut(index, item.key)" @input="editReplyText") {{item.reply_text}}