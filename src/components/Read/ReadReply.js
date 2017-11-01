import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import axios from 'axios'
import { connect } from 'react-redux';


const propTypes = {
};
const defaultProps = {
};
class ReadReply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'reply_editable': false,
            'reply_index': -1,
            'original_reply_text': ''
        }
        this.toggleReplyEditBtns = this.toggleReplyEditBtns.bind(this);
        this.saveEditedReplyText = this.saveEditedReplyText.bind(this);
        this.replyEditEnterCheck = this.replyEditEnterCheck.bind(this);
        this.addReply = this.addReply.bind(this);
    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log(JSON.stringify(prevProps.app_lists) === JSON.stringify(this.props.app_lists))
    //     console.log('prev', prevProps.app_lists)
    //     console.log('this', this.props.app_lists);
    // }
    componentDidMount() {
        // document.addEventListener('keyup', this.replyEditEnterCheck);
    }
    /**
     * 댓글 추가
     */
    addReply() {
        const reply_textarea = document.getElementsByClassName('read-reply-textarea')[0];
        const reply_text = reply_textarea.value;
        if (reply_text.trim() === '') {
            this.props.handleErrorMessage('reply-submit', '※내용을 입력해주세요.')
            return;
        } else {
            const URL = 'https://traveler-in-blog.firebaseio.com/lists/' + this.props.item.key + '/reply.json'
            const reply_data = {
                'date' : '20171011150949',
                'id' : "dasom1012@gmail.com",
                'name': 'dasom',
                'reply_text' : reply_text,
                'user_uid': 'mthJGpS1Zva4GvhZVp5E1VdozM42'
            }
            axios.post(URL, reply_data).then(() => this.props.getDB());
            reply_textarea.value = '';
        }
    }
    
    /**
     * 수정 버튼 눌렀을 때 저장/취소 버튼 표시
     * 
     * @param {any} index 
     * @memberof ReadReply
     */
    toggleReplyEditBtns (index) {
        if(!this.state.reply_editable) {
            const el =  document.getElementsByClassName('read-reply-item')[index];
            const reply_text = el.getElementsByClassName('read-reply-text')[0];
            this.setState(update(this.state, {
                'reply_editable' : {$set: !this.state.reply_editable},
                'reply_index' : {$set: index},
                'original_reply_text' : {$set: reply_text.innerHTML}
            }));
        } else {
            this.setState(update(this.state, {
                'reply_editable' : {$set: !this.state.reply_editable},
                'reply_index' : {$set: index},
                'original_reply_text' : {$set: ''}
            }));
        }
    }
    /**
     * 댓글 삭제
     * 
     * @param {any} key 
     * @memberof ReadReply
     */
    deleteReply(key) {
        let URL = 'https://traveler-in-blog.firebaseio.com/lists/' + this.props.item.key + '/reply/' + key + '.json'
        axios.delete(URL).then(() => this.props.getDB());
    }
    /**
     * 댓글 수정 저장.
     * 
     * @param {any} index 
     * @param {any} key 
     * @returns 
     * @memberof ReadReply
     */
    saveEditedReplyText (index, key) {
        const el =  document.getElementsByClassName('read-reply-item')[index];
        const reply_text = el.getElementsByClassName('read-reply-text')[0];
        if (reply_text.innerHTML.trim() === '') {
            this.props.handleErrorMessage('reply-edit', '※내용을 입력해주세요.')
            return;
        } else {
            let URL = 'https://traveler-in-blog.firebaseio.com/lists/' + this.props.item.key + '/reply/' + key + '.json'
            axios.patch(URL, {'reply_text': reply_text.innerHTML}).then(() => this.props.getDB())
            this.toggleReplyEditBtns(-1);
            this.props.handleErrorMessage('', '')
        }
    }
    /**
     * 댓글 수정에서 엔터를 누르면 저장.
     * 
     * @param {any} index 
     * @param {any} key 
     * @returns 
     * @memberof ReadReply
     */
    replyEditEnterCheck(index, key) {
        if(event.keyCode === 13) {
            this.saveEditedReplyText(index, key);
            return;
        }
    }
    render() {
        const item = this.props.item
        // 이건 로그인한 사용자의 uid (수정필요: 로그인기능 구현하면 로그인한 사용자의 uid를 localstorage에서 받아와야한다.) 
        const user_id = "mthJGpS1Zva4GvhZVp5E1VdozM42";
        // 리플 공백인 상태에서 등록 눌렀을 경우의 에러 메세지 
        const reply_submit_error_message = this.props.error_message.error_type ==="reply-submit" ? 
                <span className="reply-submit-error-message"> {this.props.error_message.message} </span> : "";
        const read_reply_input = !user_id ? (
            <div className="read-reply-login">
                <p> 로그인 후 댓글을 작성해주세요. </p>
                <a href=""> 트레블로 시작하기 </a>
            </div>) : (
            <div className="read-reply-input">
                <h2 className="read-reply-title"> 댓글작성 </h2>
                <textarea className="read-reply-textarea" placeholder="댓글을 입력해주세요."/> 
                <button className="read-reply-submit" type="button" onClick={this.addReply}>등록</button>
                { reply_submit_error_message}
            </div>
        );
        const read_reply_list = !item.reply ? "" : (
            Object.keys(item.reply).sort((a, b) => item.reply[b].date - item.reply[a].date ).map((key, index) => {
                // 날짜 표시 형식 변환
                const convert_reply_date = item.reply[key].date.slice(0,4) + "." + item.reply[key].date.slice(4,6) + "." + item.reply[key].date.slice(6,8);
                //  저장 취소 버튼
                const edit_btns = user_id === item.reply[key].user_uid && this.state.reply_editable && this.state.reply_index === index ? (
                    <div className="read-reply-edit-btns">
                        <button className="read-reply-edit-save" type="button" onClick={() => this.saveEditedReplyText(index, key)}>저장</button>
                        <button className="read-reply-edit-cancel" onClick={this.toggleReplyEditBtns} type="button">취소</button> 
                    </div>
                ) : ""
                // 수정 삭제 버튼 
                const reply_btns = user_id === item.reply[key].user_uid && !this.state.reply_editable ? (
                    <div className="read-reply-item-btns">                         
                        <button className="read-reply-edit" onClick={() => this.toggleReplyEditBtns(index)} type="button">수정</button>
                        <button className="read-reply-delete" onClick={() => this.deleteReply(key)}type="button">삭제</button>
                    </div>
                ) : "";
                // 수정 에러 메세지
                const edit_error_message = this.props.error_message.error_type ==="reply-edit" && this.state.reply_index === index ? 
                        <span className="reply-edit-error-message"> {this.props.error_message.message} </span> : "";
                return (
                <li className="read-reply-item" key={key}>
                    <div className="read-reply-item-title">
                        <p className="read-reply-item-author"> {'by. '+item.reply[key].name} </p>
                        <p className="read-reply-item-date"> {convert_reply_date} </p>
                        {/* 수정/삭제 버튼 */}
                        {reply_btns}
                        {/* 수정 눌렀을떄 저장/취소 버튼 */}
                        {edit_btns}
                    </div>
                    <p className="read-reply-text" 
                        suppressContentEditableWarning="true" 
                        contentEditable={this.state.reply_index === index && this.state.reply_editable} 
                        onKeyUp={() => this.replyEditEnterCheck(index, key)}> 
                        {item.reply[key].reply_text}
                    </p> 
                    {edit_error_message}
                    <hr/>
                </li>
                );
            })
        )
        return(
            <div className="read-reply">
                {/* 로그인 한경우 인풋창 / 안 한경우 로그인으로 연결 */}
                {read_reply_input}
                <ul className="read-reply-list">
                    {/* 댓글 목록 */}
                    {read_reply_list}
                </ul>
            </div>
        );
    }
}

ReadReply.propTypes = propTypes;
ReadReply.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        app_lists: state.list_db
    }
  }
export default connect(mapStateToProps)(ReadReply);
