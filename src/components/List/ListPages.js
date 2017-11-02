import React, { Component } from 'react';
import * as actions from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class ListPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.settingPage = this.settingPage.bind(this);
    }
    componentDidMount() {
        // 화면 크기가 달라졌을 때 page 다르게하기 
        window.addEventListener('resize', this.settingPage);
        // state에 현재 width 저장
        this.setState({
          'client_width': document.documentElement.clientWidth
        })
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
      const client_width = document.documentElement.clientWidth;
      let list_pages_amount = this.props.page_amount;
      // 페이지 수 만큼 배열에 숫자를 담아준다.
      if(!!list_pages_amount) {
            do { 
            list_pages.unshift(list_pages_amount);
          } while(--list_pages_amount)  
        }
      // <li>요소를 만든다. 
      const list_page_all =  list_pages.map((item, index) => {
        const page_class_name = this.props.active_index === index ? 'list-page-btn active-page' : 'list-page-btn'
        return (
          <li className="list-page-num" key={index}>
            <button className={page_class_name} onClick={() => { this.props.listPageIndexing(index)} } index={index}> { item } </button>
          </li>
        )});
      return list_page_all.filter((page, index) => {
        const active = this.props.active_index;
        if(client_width < 768) {
          if(this.state.client_width > 768) {
            this.setState({
              'client_width': document.documentElement.clientWidth
            })
          } 
          if(active === 0) {
            return index < 3;
          } else if (active > this.props.page_amount -2) {
            return index > this.props.page_amount -4;
          } else {
            return index >= active -1 && index <= active + 1;
          }
        } else if (client_width >= 768 && client_width < 1200) {
          if(this.state.client_width > 1200 || this.state.client_width < 768) {
            this.setState({
              'client_width': document.documentElement.clientWidth
            })
          } 
          if(active < 3) {
            return index < 5;
          } else if (active > (this.props.page_amount -4)) {
            return index > this.props.page_amount -6;
          } else {
            return index >= active -2 && index <= active + 2;
          }
        } else {
          if(this.state.client_width < 1200) {
            this.setState({
              'client_width': document.documentElement.clientWidth
            })
          } 
          if(active < 4) {
            return index < 9;
          } else if (active > (this.props.page_amount -8)) {
            return index > this.props.page_amount -10;
          } else {
            return index >= active -4 && index <= active + 4;
          }
        }
      })
      // return list_page_all;
    }
    render() {
      // settingPage에서 만들어둔 요소를 가져와서 화면에 렌더.
      const list_pages_render = this.settingPage();
      // 첫페이지, 이전 페이지로 가는 버튼들 acitve index가 첫 번째라면 표시하지 않는다. 
      const prev_btns = this.props.active_index === 0 ? '' : (
        <div className="list-pages-prev-btns">            
          <button className="list-pages-first list-page-btn" onClick={() => { this.props.listPageIndexing(0)} }> &lt;&lt; </button>
          <button className="list-pages-prev list-page-btn" onClick={() => { 
            const index = this.props.list_state.page_index === 0 ? 0 : this.props.list_state.page_index -1 ;
            this.props.listPageIndexing(index);
          }}> &lt; </button>
      </div>);
      // 마지막 페이지, 다음 페이지로 가는 버튼들 active_index가 마지막이라면 표시하지 않는다. 
      const next_btns = this.props.active_index === this.props.page_amount -1 ? '' : (
        <div className="list-pages-next-btns">
           <button className="list-pages-next list-page-btn"onClick={() => { 
              const index = this.props.list_state.page_index === this.props.page_amount-1 ? this.props.page_amount-1 : this.props.list_state.page_index + 1 ;
              this.props.listPageIndexing(index);
            }}> &gt; </button>
            <button className="list-pages-last list-page-btn" onClick={() => { this.props.listPageIndexing(this.props.page_amount-1)} } > &gt;&gt; </button>
        </div>
      )
      // 아직 데이터를 가져오기 전이라면 아무것도 출력하지 않는다.
        return this.props.list_state.type===""? '' : (
          <div className="list-pages-box">
              {prev_btns}
              <ul className="list-pages">
                { list_pages_render }
              </ul>
              {next_btns}
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
const mapStateToProps = (state) => {
  return {
    active_index : state.list.page_index,
    page_amount : state.list.page_amount
  }
}

export default connect(mapStateToProps, actions)(ListPages);

