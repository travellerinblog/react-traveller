import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { connect } from 'react-redux';
// 컴포넌트
import ListSort from './ListSort';
import ListSearch from './ListSearch';
import ListItems from './ListItems';
import ListPages from './ListPages';
import ListFooter from './ListFooter';

const propTypes = {
};
const defaultProps = {
};


class List extends Component {
    constructor(props) {
        super(props);
        this.handleListSortByLastest = this.handleListSortByLastest.bind(this);
        this.handleListSortByPoppular = this.handleListSortByPoppular.bind(this);
        this.listCheckSortType = this.listCheckSortType.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        //DB값이 바뀌면 렌더를 다시 하도록 함.
        if (nextProps.app_lists === this.props.app_lists) {
          return false;
        } else {
            setTimeout(this.listCheckSortType, 2000);
            return true;
        }
    }
    componentDidMount() {
        setTimeout(this.listCheckSortType, 2000);
    }

    /**
     * @description 렌더할 때, 이전에 정렬했던 타입을 확인 후 리스트를 재정렬(디폴트 최신순)
     * @property {string} list_sort_type - 이전에 리스트를 정렬한 타입(인기순/최신순) 
     * @returns Sort Type에 맞는 메소드 
     * @memberof List
    * */
    listCheckSortType() {
        const list_sort_type = this.props.sorted_list.type;
        switch (list_sort_type) {
            case "LIST_SORT_BY_LATEST":
                return this.handleListSortByLastest();
            case "LIST_SORT_BY_POPULAR":
                return this.handleListSortByPoppular();
            default:
                return this.handleListSortByLastest();
        }
    }


    /**
     * @description 글 목록을 최신순으로 정렬하는 메소드
     * @property {object} lists - DB에서 가져온 list의 값들
     * @property {array} list_item_sorted_array - 최신순으로 정렬한 배열
     * @memberof List
     */
    handleListSortByLastest() {
        const lists = this.props.app_lists;
        //작성일(write_date)을 기준으로 정렬한다.
        let list_item_sorted_array = lists.sort((a, b)=> b.write_date - a.write_date);
        this.props.listSortByLastest(list_item_sorted_array);
    }


    /**
     * @description 글 목록을 인기순으로 정렬하는 메소드
     * @property {object} lists - DB에서 가져온 list의 값들
     * @property {array} list_item_sorted_array - 인기순으로 정렬한 배열
     * @memberof List
     */
    handleListSortByPoppular() {
        const lists = this.props.app_lists;
        // 인기순(view)을 기준으로 정렬한다.
        let list_items_sorted_array = lists.sort((a,b) => b.view - a.view);
        this.props.listSortByPopular(list_items_sorted_array);
    }
    render() {
        return(
          <div className="List">
            <h1>당신의 다음 목적지는 어디인가요?</h1>
            <ListSearch/>
            <ListSort onSortByLastest={this.handleListSortByLastest} onSrotByPopular={this.handleListSortByPoppular}/>
            <ListItems/>
            <ListPages/>
            <ListFooter/>
          </div>
        );
    }
}
List.propTypes = propTypes;
List.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        app_lists: state.getDB.DB_lists,
        sorted_list: state.list
    }
}

export default connect(mapStateToProps, actions)(List);