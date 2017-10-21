import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const propTypes = {
    app_lists: PropTypes.object,
};
const defaultProps = {
    app_lists: {},
};
class ListSort extends Component {
    constructor(props) {
        super(props);
        this.listSortByLastest = this.listSortByLastest.bind(this);
        this.listSortByPopular = this.listSortByPopular.bind(this);
    }
    componentWillMount() {
        // DB를 가져오고나서 실행시키기 위한 임시방편, 수정필요.
        setTimeout(this.listSortByLastest, 2000);
    }
    /**
     * @description 글 목록을 최신순으로 정렬하는 메소드
     * @property {object} lists - DB에서 가져온 list의 값들
     * @property {array} list_item_sorted_array - 최신순으로 정렬한 배열
     * @memberof List
     */
    listSortByLastest() {
        const lists = this.props.app_lists;
        // lists가 있다면(DB를 불러왔다면) Object를 Array로 만들고 작성일을 기준으로 정렬한다.
        let list_item_sortted_array = lists && Object.keys(lists)
            .map(key => Object.assign({}, {'key': key}, lists[key]))
            .sort((a, b)=> b.write_date - a.write_date);
        this.props.listSortByLastest(list_item_sortted_array);
    }
        /**
     * @description 글 목록을 인기순으로 정렬하는 메소드
     * @property {object} lists - DB에서 가져온 list의 값들
     * @property {array} list_item_sorted_array - 인기순으로 정렬한 배열
     * @memberof List
     */
    listSortByPopular() {
        const lists = this.props.app_lists;
        // Object로 받아온 데이터를 Array로 변환
        let list_items_sorted_array = Object.keys(lists)
            .map(key => Object.assign({}, {'key': key}, lists[key]))
            .sort((a,b) => b.view - a.view);
        this.props.listSortByPopular(list_items_sorted_array);
    }
    render() {
        return(
          <ul className="list-sort">
            <li><button type="button" onClick={this.listSortByLastest}>최신순</button></li>
            <li><button type="button" onClick={this.listSortByPopular}>인기순</button></li>
          </ul>
        );
    }
}
ListSort.propTypes = propTypes;
ListSort.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        app_lists: state.getDB.lists
    }
}

export default connect(mapStateToProps, actions)(ListSort);