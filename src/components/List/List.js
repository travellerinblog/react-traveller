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
        this.setGoogleSearchBox = this.setGoogleSearchBox.bind(this);
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
        // DB값 가져오기.
        setTimeout(this.listCheckSortType, 2000);

        //구글 초기화
        this.setGoogleSearchBox();
    }

    /**
     * google Search Box 초기화
     * 
     * @memberof List
    * */
    setGoogleSearchBox() {
        const google = window.google;
        // 자동 완성을 연결할 input창
        const input = document.getElementsByClassName('list-search-input')[0];
        let autocomplete = new google.maps.places.Autocomplete(input, { types: ['(regions)'] });
        autocomplete.addListener('place_changed', this.handleListLocationSearch.bind(this, autocomplete));
    }

    /**
     * 렌더할 때, 이전에 정렬했던 타입을 확인 후 리스트를 재정렬(디폴트 최신순)
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
            case "LIST_LOCATION_SEARCH":
                return this.handleListLocationSearch();
            default:
                return this.handleListSortByLastest();
        }
    }

    /**
     * 도시/나라로 검색한 값이 있는 list를 찾는 메소드
     * @property {array} compare_address_type - google에서 제공하는 주소 유형, country, administrative_area_level_1~5, colloquial_area, locality
     * @property {object} get_place - 사용자가 입력한 지역에 대한 정보를 가지고 있는 객체
     * @property {number} place_type - 사용자가 입력한 값이 compare_address_type에 포함되어 있는지 확인
     * @property {string} search_place - list와 비교할 값
     * @property {array} sorted_list_item_array - 검색한 결과가 담겨진 배열
     * @param {object} autocomplete - getPlace() 메소드를 사용하기 위해 초기화 하면서 전달 받음
     * @memberof List
     */
    handleListLocationSearch(autocomplete) {
        const lists = this.props.app_lists;
        const compare_address_type = ["country", 
                                      "administrative_area_level_1",
                                      "administrative_area_level_2",
                                      "administrative_area_level_3",
                                      "administrative_area_level_4",
                                      "administrative_area_level_5",
                                      "colloquial_area",
                                      "locality"];

        const get_place = autocomplete.getPlace();
       
        if(!get_place.address_components) {
            console.log('check');
            this.props.throwSearchErrorMessage('search','지역을 선택해 주세요.');
            return;
        }
        this.props.throwSearchErrorMessage('','');
        const place_type = compare_address_type.indexOf(get_place.types[0]);

        let search_place = "" ;
        // 만약에 검색한 값이 나라/도/시 단위라면 그 값으로 검색을 하고, 아니라면(동/면/읍 등) 도시 이름으로 검색을 한다. 
        if (place_type > -1) {
            search_place = get_place.address_components[0].long_name
        } else {
            search_place = get_place.address_components.filter(comp => {
                return compare_address_type.indexOf(comp.types[0]) > -1;
            })[0].long_name;
        }
        // list의 location과 비교하여, 검색한 값이 있는 글만 가져오고 최신순으로 정렬
        const sorted_list_item_array = lists.filter(list => JSON.stringify(list.location).indexOf(search_place) > -1).sort((a,b) => b.write_date - a.write_date);
        this.props.listLocationSearch(sorted_list_item_array);
    }   

    /**
     *  글 목록을 최신순으로 정렬하는 메소드
     * @property {object} lists - DB에서 가져온 list의 값들
     * @property {array} sorted_list_item_array - 최신순으로 정렬한 배열
     * @memberof List
     */
    handleListSortByLastest() {
        const lists = this.props.sorted_list.type!=="" ? this.props.sorted_list.list : this.props.app_lists;
        //작성일(write_date)을 기준으로 정렬한다.
        let sorted_list_item_array = lists.sort((a, b)=> b.write_date - a.write_date);
        this.props.listSortByLastest(sorted_list_item_array);
    }

    /**
     *  글 목록을 인기순으로 정렬하는 메소드
     * @property {object} lists - DB에서 가져온 list의 값들
     * @property {array} sorted_list_item_array - 인기순으로 정렬한 배열
     * @memberof List
     */
    handleListSortByPoppular() {
        const lists = this.props.sorted_list.type!=="" ? this.props.sorted_list.list : this.props.app_lists;
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