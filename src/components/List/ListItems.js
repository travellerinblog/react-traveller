import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const propTypes = {
  app_lists: PropTypes.object,
  lists: PropTypes.object
};
const defaultProps = {
  app_lists: {},
  lists: {}
};

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.listItemsSetting = this.listItemsSetting.bind(this);
  }
  /**
   * DB에서 가져온 값을 가지고 render할 HTML 태그를 정의
   * 
   * @memberof ListItems
  * */
  listItemsSetting() {
    // DB에서 받아온 lists Object
    const list_items = this.props.sorted_list;
    // list_searched_country google api랑 연결해서 받아 올 값.
    const list_searched_country = null;
    // Array의 값을 가지고 Render할 요소를 만든다.
    const list_items_template = list_items.list && list_items.list.map((item, index) => {
      // render에서 출력 해줄 태그
      const template = (
        <li className='list-item' key={index}>
        <figure>
          <figcaption className='list-item-contents'>
            <h2 className="list-item-title">{item.title}</h2>
            <p className="list-item-content">작성자 {item.author} | 조회수 {item.view} | 나라 {item.country} | 작성일 {item.write_date}</p>
          </figcaption>
        </figure>
      </li>
      );
    // search된 나라 값을 가지고 item을 분류.
      // 아무것도 검색하지 않은 경우
     if (list_searched_country === null){
       return template;
     }
      // 검색한 값이랑 item의 country가 같은 경우
     else if(item.country === list_searched_country) {
        return template;
      }
    });
    // 그냥 데이터가 없는 경우와 데이터를 불러오는 중인 경우를 나누어야 함.
    if (!list_items_template) {
      return (
       <li className="list-item-loading" key="loading data">
        잠시만 기다려주세요.
       </li>
      );
    } else {
      return list_items.list.length ? list_items_template : '데이터가 없습니다.';
    }
  }
  render() {
    const list_items_render = this.listItemsSetting();
      return(
          <ul className="list-items">
            {list_items_render}
          </ul>
      );
  }
}
ListItems.propTypes = propTypes;
ListItems.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
      app_lists: state.getDB.lists,
      sorted_list: state.list
  }
}
export default connect(mapStateToProps)(ListItems);