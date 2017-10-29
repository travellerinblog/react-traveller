import React, { Component } from 'react';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class ListPages extends Component {
    constructor(props) {
        super(props);
        this.settingPage = this.settingPage.bind(this);
    }
    /**
     * List Pages 컴포넌트에서 보여줄 요소들을 정의한다.
     * @property {array} list_pages - 페이지 값들이 들어갈 배열 [1, 2, 3 ...]
     * @property {number} list_pages_amount - 출력해야할 페이지 수
     * @returns - 화면에 출력할 <li>요소
     * @memberof ListPages
     */
    settingPage () {
      const list_pages = [];
      let list_pages_amount = this.props.list_state.page_amount;
      // 페이지 수 만큼 배열에 숫자를 담아준다.
      if(!!list_pages_amount) {
            do { 
            list_pages.unshift(list_pages_amount);
          } while(--list_pages_amount)  
        }
      // <li>요소를 만든다. 
      return list_pages.map((item, index) => {
        return (
          <li className="list-page-num" key={index}>
            <button onClick={() => { this.props.listPageIndexing(index)} } index={index}> { item } </button>
          </li>
        )});
    }
    render() {
      // settingPage에서 만들어둔 요소를 가져와서 화면에 렌더.
      const list_pages_render = this.settingPage();
      // 아직 데이터를 가져오기 전이라면 아무것도 출력하지 않는다.
        return this.props.list_state.type===""? '' : (
          <div className="list-pages">
            <button className="list-pages-first" onClick={() => { this.props.listPageIndexing(0)} }> 처음 </button>
            <button className="list-pages-prev" onClick={() => { 
              const index = this.props.list_state.page_index === 0 ? 0 : this.props.list_state.page_index -1 ;
              this.props.listPageIndexing(index);
            }}> 이전 </button>
              <ul className="list-pages">
                { list_pages_render }
              </ul>
            <button className="list-pages-next"onClick={() => { 
              const index = this.props.list_state.page_index === this.props.list_state.page_amount-1 ? this.props.list_state.page_amount-1 : this.props.list_state.page_index + 1 ;
              this.props.listPageIndexing(index);
            }}> 다음 </button>
            <button className="list-pages-last" onClick={() => { this.props.listPageIndexing(this.props.list_state.page_amount-1)} } > 마지막 </button>
        </div>
        );
    }
}
const propTypes = {
  list_state: PropTypes.object,
  listPageIndexing: PropTypes.func
}

const defaultProps = {
  list_state: {},
  listPageIndexing: () => console.warn('handleListPageIndex is not defined')
}

export default connect(undefined, actions)(ListPages);

