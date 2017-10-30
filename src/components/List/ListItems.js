import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

/**
 * List Items 컴포넌트 : 화면에 보여줄 글을 정한다. 
 * @param {object} list_state - 상위 List 컴포넌트로부터 받은 값. list,type,page_index,page_amount 값을 가지고 있다.
 * @property {number} page_index - 현재 보여주고 있는 페이지의 idnex
 * @property {number} page_start - 글 목록의 몇 번째 아이템부터 보여줄지 정해주는 값.
 * @property {number} page_end - 글 목록의 몇 번쨰 아이템까지 보여줄지 정해주는 값.
 * @property {array} list_items_render - 페이지에 표시할 아이템
 */
const ListItems = ({list_state}) => {
  const page_index = list_state.page_index;
  const page_start = page_index * 12;
  const page_end = ((page_index + 1) * 12) - 1;
  let list_items_render = [];
  // 아직 데이터를 가지고 오고 있는 중 
  if(list_state.type==="") {
    list_items_render.push(
      <li className="list-item-loading list-item-message" key="loading data">
      잠시만 기다려주세요.
    </li>
    )
  } else if (list_state.list.length === 0 ) {
    // 데이터를 가져왔는데 list가 비어있는 경우.
    list_items_render.push(
      <li className="list-item-nothing list-item-message" key="no data">
        찾으시는 지역에 대한 정보가 없습니다.
    </li>
    )
  } else {
    // 화면에 보여줄 <li> 요소를 만든다.
    for(let i = page_start; i <= page_end; i++ ){
      // 만약에 i의 값이 list의 총 길이보다 크다면 loop 종료.
      if (i > list_state.list.length - 1) break;
      const date = list_state.list[i].write_date
      let link_path = '/Read/' + list_state.list[i].key;
      let date_convert = date.slice(0,4) + "." + date.slice(4,6) + "." + date.slice(6,8)
      list_items_render.push(
      <li className='list-item-box' key={list_state.list[i].key}>
        <Link to={link_path}>
          <figure className="list-item">
              <img className="list-item-image" src ={list_state.list[i].title_img} alt={list_state.list[i].title} />
              <figcaption className='list-item-contents'>
                <h2 className="list-item-title">{list_state.list[i].title}</h2>
                <p className="list-item-content">{date_convert} | {list_state.list[i].location.country} | {list_state.list[i].name} | 조회수 {list_state.list[i].view} </p>
              </figcaption>
          </figure>
        </Link>
      </li>
      )
    }
  }

  return (
    <ul className="list-items">
      { list_items_render }
    </ul>
  );
}
const propTypes = {
  list_state: PropTypes.object
}

const defaultProps = {
  list_state: {}
}

export default ListItems;