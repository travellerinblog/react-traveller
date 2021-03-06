import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import {Link} from 'react-router-dom';

// 컴포넌트
import ListSort from './ListSort';
import ListSearch from './ListSearch';
import ListItems from './ListItems';
import ListPages from './ListPages';
import ListFooter from './ListFooter';


class List extends Component {   
    // 라우터 히스토리 사용을 위해.
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            'type': "",
            'list': [],
            'search_flag': '',
            'page_amount': 1,
            'page_index': 0,
            'is_sort_selected': false
        }
        this.autocomplete = {};
        this._initGoogle = this._initGoogle.bind(this);
        this._listCheckSortType = this._listCheckSortType.bind(this);
        this._listPageSetting = this._listPageSetting.bind(this);
        this._llistSelectorOnClick = this._llistSelectorOnClick.bind(this);
        this._setSortSelectorRef = this._setSortSelectorRef.bind(this); 
        this._handleClickOutside = this._handleClickOutside.bind(this);
        this._getListLocationSearch = this._getListLocationSearch.bind(this);
        this._checkRouterPath = this._checkRouterPath.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) { 
        if(this.props.history.location.pathname !== this.props.location.pathname) {
            console.log('history')
            this._checkRouterPath();
        }
        // 스토어의 페이지 인덱스와 스테이트의 인덱스를 동일하게 해줌.
        if ((this.props.app_lists).length !== 0 && nextProps.sorted_list.page_index !== this.state.page_index) {
            this.setState(nextProps.sorted_list);
        } 
        // DB 갱신된 경우, 변경된 DB로 정렬 후 state를 변경한다.
        if ((this.props.app_lists).length !== 0 && nextProps.app_lists!==this.props.app_lists) {
            this._listCheckSortType(nextProps.app_lists);
        }
        return true; 
    }
    componentDidMount() {
        // 컴포넌트에 접근하였을 때 최상위로 이동
        window.scrollTo(0,0);
        
        // 메인을 통해서 List로 들어오지 않은경우(새로고침, 주소직접입력 등) DB를 가져온다.
        if(Object.keys(this.props.app_lists).length === 0) {
            this.props.handleGetDB()
            setTimeout(this._listCheckSortType, 2000);
        
        } else {
            this._listCheckSortType();
        }
        
        // google 초기화 
        this._initGoogle();

        // 페이지 세팅(수정필요: setTimeout)
        setTimeout(this._listPageSetting, 2500);

        // 포커스 나갔을 때 이벤트
        document.addEventListener('mousedown', this._handleClickOutside);

        // 라우터 ... path값과 쿼리에 따라서 list item이 달라져야 한다능.... OMG
        // console.log(this.props.location);
    }
    // google 초기화 
    _initGoogle() {
        const google = window.google; 
        // 자동 완성을 연결할 input창 
        const input = document.getElementsByClassName('list-search-input')[0]; 
        this.autocomplete = new google.maps.places.Autocomplete(input, { types: ['(regions)'] }); 
        this.autocomplete.addListener('place_changed', this._getListLocationSearch); 
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
    _getListLocationSearch() { 
        // 아직 autocomplate 값이 설정 되지 않았을 떄는 종료
        // 검색된 상태에서 글에 들어갔다 돌아왔을 때의 문제 해결.
        if(this.autocomplete.getPlace === undefined) {
            return;
        }
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
            this.props.throwErrorMessage('search','※ 지역을 선택해 주세요.'); 
            return; 
        } 
        // 사용자가 지역을 선택하지 않은 경우 에러 메세지 삭제
        this.props.throwErrorMessage('',''); 

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
        this._listPageSetting();
        // state에 반영
        this.setState(this.props.sorted_list)
        const router_path = '/List/SerachBox?' + search_place;
        // 라우터 설정
        this.context.router.history.push(router_path);
    }    

    /**
     * 렌더할 때, 이전에 정렬했던 타입을 확인 후 리스트를 재정렬(디폴트 최신순)
     * @property {string} list_sort_type - 이전에 리스트를 정렬한 타입(인기순/최신순/검색) 검색인 경우 기존의 
     * @returns Sort Type에 맞는 메소드 
     * @memberof List
    * */
    _listCheckSortType(nextProps) {
        const sorted_list = JSON.parse(JSON.stringify(this.props.sorted_list));
        console.log('sorted_list:',sorted_list);
        const app_lists = nextProps !== undefined ? JSON.parse(JSON.stringify(nextProps)) : JSON.parse(JSON.stringify(this.props.app_lists));
        const list_sort_type = sorted_list && sorted_list.type !== "" ? sorted_list.type : "" ;
        let after_dispatch_list = {}
        let lists = [];
        switch (list_sort_type) {
            case "LIST_SORT_BY_LATEST":
            case "LIST_TAG_SEARCH":
                // serach_flag 가 'search'인 경우는 전체 리스트가 아니라, 검색한 리스트(지금 화면에 보여지고 있는)를 가지고 정렬해야한다.
                lists = sorted_list.search_flag === 'search' ? sorted_list.list : app_lists
                // setState를 하기 위해 정렬된 list를 반환받는다.
                after_dispatch_list = this.props.handleListSortByLastest(lists);
                this.setState(update(this.state, {
                    'list' : {$set: after_dispatch_list},
                }));
                return ;
                case "LIST_SORT_BY_POPULAR":
                lists = sorted_list.search_flag === 'search' ? sorted_list.list : app_lists
                after_dispatch_list = this.props.handleListSortByPopular(lists);
                this.setState(update(this.state, {
                    'list' : {$set: after_dispatch_list},
                }));
                return ;
            case "LIST_LOCATION_SEARCH":
                this._getListLocationSearch();
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
    _listPageSetting() {
        this.props.handleListPageCount(this.props.sorted_list);
        this.setState(this.props.sorted_list);
    }

    /**
     * 최신순/인기순 선택창 토글
     * 
     * @memberof List
     */
    _llistSelectorOnClick() {
        this.setState(update(this.state, {
            'is_sort_selected' : {$set: !this.state.is_sort_selected}
        }));
    }

    /**
     * 외부요소를 누르면 최신순/인기순 선택창 닫힘.
     * 
     * @memberof List
     */
    _setSortSelectorRef(node) {
        // node는 ref가 연결된 list-sort-box div
        this.sortSelectorRef = node;
    }
    _handleClickOutside(event) {
        // list-sort-box가 클릭된 요소를 포함하고 있지 않다면 setState를 실행해서 보이고있는 것을 닫아준다.
        if (this.sortSelectorRef && !this.sortSelectorRef.contains(event.target)) {
            this.setState(update(this.state, {
                'is_sort_selected' : {$set: false}
            }));
        }
    }

    _checkRouterPath(){
        const path_name = this.props.history.location.pathname
        switch (path_name) {
            case '/List/All':
                const after_dispatch_list = this.props.handleListSortByLastest(this.props.app_lists);
                this.setState(update(this.state, {
                    'list' : {$set: after_dispatch_list},
                }));
            return;
            default:
                break;
        }
    }
    render() {
        const list_sort_selector_render = this.state.is_sort_selected ? 
            <ListSort onListSortByLastest={() => {
                    this.props.handleListSortByLastest(this.state.list);
                    // 선택창 닫기.
                    this.setState(update(this.state, {
                        'is_sort_selected' : {$set: !this.state.is_sort_selected}
                    }));
                }} 
                onListSortByPopular={() => {
                    this.props.handleListSortByPopular(this.state.list);
                    //선택창 닫기.
                    this.setState(update(this.state, {
                        'is_sort_selected' : {$set: !this.state.is_sort_selected}
                    }));
                }}/> : '';
        const list_selected_sort_item = this.props.sorted_list.type === "LIST_SORT_BY_POPULAR" ? "인기순" : "최신순";
        return(
        <div className = "list-container">
          <div className="list">
            <h2 className="list-title"><Link to="/List/All"> 당신의 다음 목적지는 어디인가요? </Link> </h2>
            <div className="list-search-sort-box">
                <ListSearch/>
                <div className="list-sort-box" ref={this._setSortSelectorRef}>
                    <button className="list-selected-item list-sort-btn" type="button" onClick={this._llistSelectorOnClick}>{list_selected_sort_item}</button>
                    {list_sort_selector_render}
                </div>
            </div>
            <ListItems list_state={this.state} getDB={this.props.handleGetDB}/>
            <ListPages list_state={this.state}/>
          </div>
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
    throwErrorMessage: PropTypes.func
};
const defaultProps = {
    app_lists: {},
    sorted_list: {},
    errors: {},
    handleListSortByLastest:  () => console.warn('handleListSortByLastest is not defined'),
    handleListSortByPopular:  () => console.warn('handleListSortByPopular is not defined'),
    handleListLocationSearch: () =>  console.warn('handleListLocationSearch is not defined'),
    throwErrorMessage:  () => console.warn('throwErrorMessage is not defined')
};
export default List;