import React, { Component } from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
// props 로 받아 올 값, list item의 개수 
const list_items_amount = 13; 
// page를 표시해야하는 수 (아이템수/한페이지에 표시되는수);
const list_pages_amount = Math.ceil(list_items_amount/12);
/**
 * 표시해야할 페이지 수 <li> 요소를 생성
 * @type {function}
 * @param {number} i - 페이지 수 
 * @property {array} list_pages - 출력해줄 페이지 숫자 (1, 2, ...) 
 * 
 */
const listMakePagesArray = (i = list_pages_amount) => {
  let list_pages = [];
  do { 
    list_pages.unshift(i);
  } while(--i) 
  return (
    // 배열의 값들을 <li>요소 안에 넣어준다. 
    list_pages.map((item, index) => {
      return (
        <li className="list-page-num" key={index}>
          <a href=""> { item } </a>
        </li>
      )
    })
  )
}
// 생성한 <li>요소를 변수에 담아준다.
// 즉시 실행함수로 담을 수 있나?
const list_pages_render = listMakePagesArray();
class ListPages extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="list-pages">
              <a className="list-pages-first" href=""> 처음 </a>
              <a className="list-pages-last" href=""> 마지막 </a>
              <ul className="list-pages">
                {list_pages_render}
              </ul>
              <a className="list-pages-prev" href=""> 이전 </a>
              <a className="list-pages-next" href=""> 다음 </a>
            </div>
        );
    }
}

ListPages.propTypes = propTypes;
ListPages.defaultProps = defaultProps;
export default ListPages;