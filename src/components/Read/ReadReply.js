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
            'reply_content': {},
            'reply_editable': false,
            'reply_index': -1,
            'reply_key': '',
            'original_reply_text': ''
        }
        this._toggleReplyEditBtns = this._toggleReplyEditBtns.bind(this);
        this._saveEditedReplyText = this._saveEditedReplyText.bind(this);
        this._replyEditEnterCheck = this._replyEditEnterCheck.bind(this);
        this._cancelEditReplyText = this._cancelEditReplyText.bind(this);
        this._deleteReply = this._deleteReply.bind(this);
        this._addReply = this._addReply.bind(this);
        this._makeDateFormat = this._makeDateFormat.bind(this);
        this._resetState = this._resetState.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        if(nextProps.item.reply !== this.state.reply_content) {
            this.setState(update(this.state, {
                'reply_content' : {$set: nextProps.item.reply}
            }));
        }
        return true;
    }
    componentDidMount() {
        this.setState(update(this.state, {
            'reply_content' : {$set: this.props.item.reply}
        }));
        document.addEventListener('keyup', this._replyEditEnterCheck);
    }
    componentWillUnmount = () => {
        document.removeEventListener('keyup', this._replyEditEnterCheck);
      }
    /**
     * 댓글 추가
     */
    _addReply(enter_check) {
        const reply_textarea = document.getElementsByClassName('read-reply-textinput')[0];
        const reply_text = reply_textarea.value;
        const reply_date = this._makeDateFormat();
        if (reply_text.trim() === '') {
            this.props.handleErrorMessage('reply-submit', '※내용을 입력해주세요.')
            return;
        } else {
            const URL = 'https://traveler-in-blog.firebaseio.com/lists/' + this.props.item.key + '/reply.json'
            // 회원 가입 기능 추가 후 수정 필요.
            const reply_data = {
                'date' : reply_date,
                'id' : "dasom1012@gmail.com",
                'name': 'dasom',
                'reply_text' : reply_text,
                'user_uid': 'mthJGpS1Zva4GvhZVp5E1VdozM42'
            }
            axios.post(URL, reply_data).then(() => this.props.getDB());
            reply_textarea.value = '';
        }

        // 댓글 수정 중에 등록을 누른 경우.
        if (this.state.reply_editable === true) {
            this._resetState();
        }
    }
    /**
     * state의 값들을 초기화 한다. 
     * 
     * @memberof ReadReply
     */
    _resetState() {
        this.setState(update(this.state, {
            'reply_editable' : {$set: !this.state.reply_editable},
            'reply_index' : {$set: -1},
            'reply_key' : {$set: ''},
            'original_reply_text' : {$set: ''}
        }));
    }
    _makeDateFormat() {
        const times = new Date();
        const month = (times.getMonth() + 1) < 10 ? '0' + (times.getMonth() + 1).toString() : (times.getMonth() + 1).toString();
        const day = times.getDate() < 10 ? '0' + times.getDate() : times.getDate();
        const hours = times.getHours() < 10 ? '0' + times.getHours() : times.getHours();
        const minute = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes();
        const second = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds();
        return times.getFullYear() + month + day + hours + minute + second;
    }

    /**
     * 댓글 삭제
     * 
     * @param {any} key 
     * @memberof ReadReply
     */
    _deleteReply(key) {
        const URL = 'https://traveler-in-blog.firebaseio.com/lists/' + this.props.item.key + '/reply/' + key + '.json'
        axios.delete(URL).then(() => this.props.getDB());
    }

    /**
     * 수정 버튼 눌렀을 때 저장/취소 버튼 표시
     * 
     * @param {any} index 
     * @memberof ReadReply
     */
    _toggleReplyEditBtns (index, key) {
        if(!this.state.reply_editable) {
            const el =  document.getElementsByClassName('read-reply-item')[index];
            const reply_text = el.getElementsByClassName('read-reply-text')[0];
            this.setState(update(this.state, {
                'reply_editable' : {$set: !this.state.reply_editable},
                'reply_index' : {$set: index},
                'reply_key' : {$set: key},
                'original_reply_text' : {$set: reply_text.innerText}
            }));
        } else {
            this.setState(update(this.state, {
                'reply_editable' : {$set: !this.state.reply_editable},
                'reply_index' : {$set: index},
                'reply_key' : {$set: key},
                'original_reply_text' : {$set: ''}
            }));
        }
        // console.log(this['reply_text'+index]);
        // this['reply_text'+index].focus();
    }
    /**
     * 댓글 수정 저장.
     * 
     * @param {any} index 
     * @param {any} key 
     * @returns 
     * @memberof ReadReply
     */
    _saveEditedReplyText () {
        const index = this.state.reply_index;
        const key = this.state.reply_key;
        // enter를 쳤을 때, 두번 실행되는데 두번째 값은 ''이기 때문에 종료 시켜버림.
        if(key === '') {return false}
        const el =  document.getElementsByClassName('read-reply-item')[index];
        const reply_text = el.getElementsByClassName('read-reply-text')[0];
        if (reply_text.innerText.trim() === '') {
            this.props.handleErrorMessage('reply-edit', '※내용을 입력해주세요.')
            return;
        } else {
            let URL = 'https://traveler-in-blog.firebaseio.com/lists/' + this.props.item.key + '/reply/' + key + '.json'
            axios.patch(URL, {'reply_text': reply_text.innerText}).then(() => this.props.getDB())
            this._toggleReplyEditBtns(-1, '');
            this.props.handleErrorMessage('', '')
        }
    }
    /**
     * 댓글 수정하다가 취소
     * 
     * @param {any} index 
     * @param {any} key 
     * @memberof ReadReply
     */
    _cancelEditReplyText () {
        const el =  document.getElementsByClassName('read-reply-item')[this.state.reply_index];
        const reply_text = el.getElementsByClassName('read-reply-text')[0];
        reply_text.innerText = this.state.original_reply_text;
        this._toggleReplyEditBtns(-1, '');
    }
    /**
     * 댓글 수정에서 엔터를 누르면 저장.
     * 
     * @param {any} index 
     * @param {any} key 
     * @returns 
     * @memberof ReadReply
     */
    _replyEditEnterCheck(e) {
        e.preventDefault();
        e.stopPropagation();
        // reply_editable 값으로 댓글 등록인지 수정인지 구분
        if(this.state.reply_editable===true && e.keyCode === 13) {
            this._saveEditedReplyText();
            return false;
        } else if(this.state.reply_editable===false && e.keyCode === 13) {
            this._addReply();
            return false;   
        }
    }
    render() {
        const item = this.state.reply_content;
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
                <input type="text" className="read-reply-textinput" placeholder="댓글을 입력해주세요." onKeyUp = {(e) => _replyEditEnterCheck(e)}/> 
                <button className="read-reply-submit" type="button" onClick={this._addReply}>등록</button>
                { reply_submit_error_message}
            </div>
        );
        const read_reply_list = !item ? "" : (
            Object.keys(item).sort((a, b) => item[b].date - item[a].date ).map((key, index) => {
                // 날짜 표시 형식 변환
                const convert_reply_date = item[key].date.slice(0,4) + "." + item[key].date.slice(4,6) + "." + item[key].date.slice(6,8);
                //  저장 취소 버튼
                const edit_btns = user_id === item[key].user_uid && this.state.reply_editable && this.state.reply_index === index ? (
                    <div className="read-reply-edit-btns">
                        <button className="read-reply-edit-save" type="button" onClick={this._saveEditedReplyText}>저장</button>
                        <button className="read-reply-edit-cancel" onClick={this._cancelEditReplyText} type="button">취소</button> 
                    </div>
                ) : ""
                // 수정 삭제 버튼 
                const reply_btns = user_id === item[key].user_uid && !this.state.reply_editable ? (
                    <div className="read-reply-item-btns">                         
                        <button className="read-reply-edit" onClick={() => this._toggleReplyEditBtns(index, key)} type="button">수정</button>
                        <button className="read-reply-delete" onClick={() => this._deleteReply(key)}type="button">삭제</button>
                    </div>
                ) : "";
                // 수정 에러 메세지
                const edit_error_message = this.props.error_message.error_type ==="reply-edit" && this.state.reply_index === index ? 
                        <span className="reply-edit-error-message"> {this.props.error_message.message} </span> : "";
                return (
                <li className="read-reply-item" key={key}>
                    <div className="read-reply-item-title">
                        <p className="read-reply-item-author"> {'by. '+item[key].name} </p>
                        <p className="read-reply-item-date"> {convert_reply_date} </p>
                        {/* 수정/삭제 버튼 */}
                        {reply_btns}
                        {/* 수정 눌렀을떄 저장/취소 버튼 */}
                        {edit_btns}
                    </div>
                    <p className="read-reply-text" 
                        suppressContentEditableWarning="true" 
                        contentEditable={this.state.reply_index === index && this.state.reply_editable}
                        autoFocus
                        ref={(ref)=> { this['reply_text'+index] = ref;}}
                        onKeyUp = {(e) => _replyEditEnterCheck(e)}
                        > 
                        {item[key].reply_text}
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
