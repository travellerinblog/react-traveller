import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import update from 'react-addons-update';

// 컴포넌트
import ListSort from './ListSort';
import ListSearch from './ListSearch';
import ListItems from './ListItems';
import ListPages from './ListPages';
import ListFooter from './ListFooter';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'type': "",
            'list': [],
            'search_flag': '',
            'page_amount': 1,
            'page_index': 0
        }
        this.autocomplete = {};
        this.initGoogle = this.initGoogle.bind(this);
        this.listCheckSortType = this.listCheckSortType.bind(this);
        this.listPageSetting = this.listPageSetting.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) { 
        // 스토어의 페이지 인덱스와 스테이트의 인덱스를 동일하게 해줌.
        if (nextProps.sorted_list.page_index !== this.state.page_index) {
            this.setState(nextProps.sorted_list);
        } 
        // DB 갱신된 경우
        if (nextProps.app_lists!==this.props.app_lists) {
            this.listCheckSortType(nextProps.app_lists);
        }
        return true; 
    }
    componentDidMount() {
        // DB값 가져오기(수정필요: setTimeout)
        setTimeout(this.listCheckSortType, 2000);
        
        // google 초기화 
        this.initGoogle();

        // 페이지 세팅(수정필요: setTimeout)
        setTimeout(this.listPageSetting, 2500);
        
    }
    // google 초기화 
    initGoogle() {
        const google = window.google; 
        // 자동 완성을 연결할 input창 
        const input = document.getElementsByClassName('list-search-input')[0]; 
        this.autocomplete = new google.maps.places.Autocomplete(input, { types: ['(regions)'] }); 
        this.autocomplete.addListener('place_changed', this.getListLocationSearch.bind(this)); 
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
    getListLocationSearch() { 
        const lists = JSON.parse(JSON.stringify(this.props.app_lists)); 
        const compare_address_type = ["country",  
                                      "administrative_area_level_1", 
                                      "administrative_area_level_2", 
                                      "administrative_area_level_3", 
                                      "administrative_area_level_4", 
                                      "administrative_area_level_5", 
                                      "colloquial_area", 
                                      "locality"]; 
        const get_place = this.autocomplete.getPlace(); 

        // 사용자가 지역을 선택하지 않은 경우. 에러 표시
        if(!get_place.address_components) { 
            this.props.throwSearchErrorMessage('search','지역을 선택해 주세요.'); 
            return; 
        } 
        // 사용자가 지역을 선택하지 않은 경우 에러 메세지 삭제
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
        // dispatch!
        this.props.handleListLocationSearch(sorted_list_item_array);
        // 검색 후 다시 페이지의 개수를 구한다. 
        this.listPageSetting();
        // state에 반영
        this.setState(this.props.sorted_list)
    }    


    /**
     * 렌더할 때, 이전에 정렬했던 타입을 확인 후 리스트를 재정렬(디폴트 최신순)
     * @property {string} list_sort_type - 이전에 리스트를 정렬한 타입(인기순/최신순/검색) 검색인 경우 기존의 
     * @returns Sort Type에 맞는 메소드 
     * @memberof List
    * */
    listCheckSortType(nextProps) {
        const sorted_list = JSON.parse(JSON.stringify(this.props.sorted_list));
        const app_lists = nextProps !== undefined ? JSON.parse(JSON.stringify(nextProps)) : JSON.parse(JSON.stringify(this.props.app_lists));
        const list_sort_type = sorted_list && sorted_list.type !== "" ? sorted_list.type : "" ;
        let after_dispatch_list = {}
        let lists = [];
        switch (list_sort_type) {
            case "LIST_SORT_BY_LATEST":
            // (수정필요: lists 변수에 담을 값, DB 변경된 경우 app_lists를 가져와야 한다.)
                lists = sorted_list.search_flag === 'search' ? sorted_list.list : app_lists
                after_dispatch_list = this.props.handleListSortByLastest(lists);
                this.setState(update(this.state, {
                    'list' : {$set: after_dispatch_list}
                }));
                return ;
                case "LIST_SORT_BY_POPULAR":
                lists = sorted_list.search_flag === 'search' ? sorted_list.list : app_lists
                after_dispatch_list = this.props.handleListSortByPopular(lists);
                this.setState(update(this.state, {
                    'list' : {$set: after_dispatch_list}
                }));
                return ;
            case "LIST_LOCATION_SEARCH":
                this.getListLocationSearch();
                return ;
            default:
                lists = app_lists;
                this.props.handleListSortByLastest(lists);
                this.setState(this.props.sorted_list);
                return ;
        }
    }
    /**
     * 리스트 아이템 개수로 표시한 페이지 수 계산.
     * 
     * @memberof List
    * */
    listPageSetting() {
        this.props.handleListPageCount(this.props.sorted_list);
        this.setState(this.props.sorted_list);
    }
    render() {
        return(
          <div className="list">
            <h1 className="list-title">당신의 다음 목적지는 어디인가요?</h1>
            <div className="list-search-sort-wrap">
                <ListSearch/>
                <ListSort onListSortByLastest={() => this.props.handleListSortByLastest(this.state.list)} onListSortByPopular={() => this.props.handleListSortByPopular(this.state.list)} />
            </div>
            <ListItems list_state={this.state}/>
            <ListPages list_state={this.state}/>
            <ListFooter/>
          </div>
        );
    }
}
const propTypes = {
    app_lists: PropTypes.object,
    sorted_list: PropTypes.object,
    errors: PropTypes.object,
    handleListSortByLastest: PropTypes.func,
    handleListSortByPopular: PropTypes.func,
    handleListLocationSearch: PropTypes.func,
    throwSearchErrorMessage: PropTypes.func
};
const defaultProps = {
    app_lists: {},
    sorted_list: {},
    errors: {},
    handleListSortByLastest:  () => console.warn('handleListSortByLastest is not defined'),
    handleListSortByPopular:  () => console.warn('handleListSortByPopular is not defined'),
    handleListLocationSearch: () =>  console.warn('handleListLocationSearch is not defined'),
    throwSearchErrorMessage:  () => console.warn('throwSearchErrorMessage is not defined')
};
export default List;