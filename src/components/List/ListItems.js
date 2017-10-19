import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
const list_items = {
  // item1 : {
  //   title: 'item1',
  //   author: 'user1',
  //   view: 50,
  //   country: 'korea'
  // },
  // item2 : {
  //   title: 'item2',
  //   author: 'user2',
  //   view: 30,
  //   country: 'japan'
  // }
}
const list_searched_country = null;
// Object로 받아온 데이터를 Array로 변환
const list_items_convert = Object.keys(list_items).map(key => list_items[key]);
// Array의 값을 가지고 Render할 요소를 만든다.
const list_items_template = list_items_convert.map((item, index) => {
  // search된 나라 값을 가지고 item을 분류.
  // html 코드를 변수에 담을 방법은????
 if (list_searched_country === null){
   return (
    <li className='list-item' key={index}>
      <figure>
        <figcaption className='list-item-contents'>
          <h2 className="list-item-title">{item.title}</h2>
          <p className="list-item-content">작성자 {item.author} | 조회수 {item.view} | 나라 {item.country}</p>
        </figcaption>
      </figure>
    </li>
   );
 }
 else if(item.country === list_searched_country) {
    return (
      <li className='list-item' key={index}>
      <figure>
        <figcaption className='list-item-contents'>
          <h2 className="list-item-title">{item.title}</h2>
          <p className="list-item-content">작성자 {item.author} | 조회수 {item.view} | 나라 {item.country}</p>
        </figcaption>
      </figure>
    </li>
    );
  }
});

// 그냥 데이터가 없는 경우와 데이터를 불러오는 중인 경우를 나누어야 함.
const list_items_render = Object.keys(list_items).length ? list_items_template : '데이터가 없습니다.';

class ListItems extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <ul className="list-items">
              {list_items_render}
            </ul>
        );
    }
}
ListItems.propTypes = propTypes;
ListItems.defaultProps = defaultProps;
export default ListItems;