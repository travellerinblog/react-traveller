import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import update from 'react-addons-update';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions'



const propTypes = {
    item: PropTypes.object
};
const defaultProps = {
    item: {}
};
class ReadTitle extends Component {
    // 라우터 히스토리 사용을 위해.
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            'show_ask_window': false 
        }
        this._getTagItems = this._getTagItems.bind(this);
        this._toggleAskWindow = this._toggleAskWindow.bind(this);
        this._deleteReadItem = this._deleteReadItem.bind(this);
        this._handleTagSearch = this._handleTagSearch.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }
    /**
     * 배열에 담겨있는 tag들을 화면에 출력하기 위한 HTML 요소로 분리.
     * 
     * @returns 각 태그를 가지고있는 <a> 요소
     * @memberof ReadTitle
     */
    _getTagItems() {
        // link로 변경하여 리스트에서 해당 태그를 찾아서, 출력 필요.
        return this.props.item.tag && this.props.item.tag.map((tag, index) => {
            return (<Link className="read-title-content" 
                          to={{pathname:"/List/Tag", search: "" + tag }} 
                          key={'tag'+ index}
                          onClick={() => {
                              this._handleTagSearch(tag);
                          }}
                          >
                          {'#' + tag + ' '}
                    </Link>)
        })
    }
    _handleTagSearch(tag) {
       const tag_list = this.props.app_lists.filter(list => {
           return list.tag.indexOf(tag) > -1;
        })
        this.props.listTagSearch(tag_list);
    }

    /**
     * 글 삭제 여부를 묻는 창 토글
     * 
     * @memberof ReadTitle
     */
    _toggleAskWindow() {
        this.setState(update(this.state, {
            'show_ask_window' : {$set: !this.state.show_ask_window},
        }));
    }
    
    /**
     * 현재보고 있는 글을 삭제 
     * @memberof ReadTitle
     */
    _deleteReadItem () {
            const URL = 'https://traveler-in-blog.firebaseio.com/lists/' + this.props.item.key + '.json'
            this._toggleAskWindow();
            // 글 삭제후 DB를 다시 불러온다.
            axios.delete(URL).then(() => this.props.getDB());
            // 메인으로 이동
            this.context.router.history.push("/");
    }
    render() {
        const item = this.props.item
        // 배열에 들어가 있는 tag들 분리.
        const read_tag_item_render = this._getTagItems();
        // 글쓴 날짜 표시 형식 변경
        const convert_write_date = item.write_date.slice(0,4) + "." + item.write_date.slice(4,6) + "." + item.write_date.slice(6,8)
       
        // 해당 글의 글쓴이 uid,
        const author_id = item.uid;
        // 이건 로그인한 사용자의 uid (수정필요: 로그인기능 구현하면 로그인한 사용자의 uid를 localstorage에서 받아와야한다.) 
        const user_id = item.uid;

        // 사용자와 글쓴이가 같으면 수정/삭제 버튼 표시.
        const read_edit_delete_render = author_id === user_id ? (
            <div className="read-title-buttons">
                {/* Editor로 연결하는 Path는 우창님과 상담후 수정 필요. */}
                <Link to={`/Editor/ ${item.uid} / ${item.key} `}>수정</Link>
                <button onClick={this._toggleAskWindow} type="button">삭제</button>
            </div>
        ) : "" ;

        // 삭제 여부를 묻는 창
        const read_ask_window_render = this.state.show_ask_window ? ( 
            <div className="read-delete">
                <p className="read-delete-comment">글을 삭제하시겠습니까?</p>
                <button type="button" onClick={this._toggleAskWindow} className="read-delete-cancel">취소</button>
                <button type="button" onClick={this._deleteReadItem} className="read-delete-excute">삭제</button>
            </div>) : "";

        return ( 
            <div className="read-title-box">
                <h2 className="read-title">{item.title}</h2>
                <div className="read-title-image">
                    <img src={item.title_img} alt={"블로그" + item.title + "의 타이틀 이미지"}/>
                </div>
                <div className="read-title-contents">
                    {read_tag_item_render}
                    <p className="read-title-content"> {'by.' + item.name + ' | ' + item.location.country[0] + ' | 조회수 ' + item.view} </p>
                    <p className="read-title-content"> { convert_write_date + ' | ' + item.start_date + ' ~ ' + item.end_date} </p> 
                </div>
                {read_edit_delete_render}
                {read_ask_window_render}
            </div>
        );
    }
}
ReadTitle.propTypes = propTypes;
ReadTitle.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        app_lists: state.list_db
    }
  }
  
export default connect(mapStateToProps, actions)(ReadTitle);
