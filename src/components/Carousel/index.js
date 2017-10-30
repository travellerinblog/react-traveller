import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery/dist/jquery.min';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 초기에만 구동하도록 하는 로직을 제어하기 위한 변수
      init_flag: false,
      // 마우스가 클릭 되었는지
      clicked_mouse_flag: false,
      // 현재 보여지는 페이지 
      page: 0,
      // 총 페이지의 숫자
      max_page: 0,
      // mouse가 현재 움직인 좌표
      mouse_move_x: 0,
      // 마우스가 움직이는 방향
      mouse_move_direction: '',
      // 마우스 클릭한 좌표
      posX: 0,
      // carousel_wrapper의 부모의 넓이
      parent_width: 0
    }

    this._setWindowResizeEvent = this._setWindowResizeEvent.bind(this);
  }
  
  
  /**
   * 
   * @func _onClickPrevBtn prevBtn을 클릭하면 page 스태이트를 -1 줄여주는 함수.
   * @func _onClickNextBtn nextBtn을 클릭하면 page 스태이트를 1 증가시켜주는 함수.
   * @func _onMouseDown 마우스를 눌렀을 때 clicked_mouse_flag(마우스를 감지하는 변수)를 true로 바꿔주는 함수.
   * @func _onMouseUp 마우스를 눌렀을 때 clicked_mouse_flag(마우스를 감지하는 변수)를 false로 바꿔주는 함수.
   * @func _onMouseMove 마우스를 움직였을 때 mouse_move_x가 현재 마우스 포인터 보다 크면 direction을 next 아니면 prev로 바꿔주는 함수.
   * @func _setPageState direction이 next면 state의 페이지를 1증가 prev면 1감소시키는 함수. 
   * 
   */

  _onClickPrevBtn = () => {
    this._setPageState('prev');
  }
  
  _onClickNextBtn = () => {
   this._setPageState('next');
  }

  _onMouseDown = (e) => {
    if( this.state.clicked_mouse_flag ) {
      this._component_mouseMoveCarousel(e.clientX);
    }
    this.setState({
      clicked_mouse_flag: true,
      posX: e.clientX
    })
  }
  _onMouseUp = () => {

    this._setPageState(this.state.mouse_move_direction);
    this.setState({
      clicked_mouse_flag: false,
      mouse_move_direction: '',
      posX: 0
    })
  }
  _onMouseMove = (e) => {
    
    let direction = '', clientX = e.clientX;

    
    if( this.state.clicked_mouse_flag ) {

      this._component_mouseMoveCarousel(clientX);
      
      if( this.state.posX > clientX ) {
        direction = 'next';
      } else {
        direction = 'prev';    
      }
      
    }
    this.setState({
      mouse_move_direction: direction
    })
  }

  _setPageState = (direction) => {
    
    let page = 0;

    switch(direction) {
      case 'next':
        page = this.state.page + 1;
        break;
      case 'prev':
        page = this.state.page - 1;
        break;
      default:
        return;
    }
    
    if( page < 0 || this.state.max_page < page) {
      return;
    }

    this.setState({
      page: page
    })
  }

  /**
   * 
   * @func componentDidMount carousel 태그들이 마운트 된 후 carousel 부모의 넓이를 가져와서 state에 저장
   * @func componentDidUpdate page state가 변경되면 캐러샐을 움직여줌.
   * @func componentWillUnmount Carousel이 unmount될 때 resize이벤트를 해제시켜주는 함수.
   */


  componentDidMount = () => {
    this._component_setResizeCarouselViews();
    if( !this.state.init_flag ) {
      
      this.setState({
        init_flag: !this.state.init_flag
      })
    }

    $(window).on('resize', this._setWindowResizeEvent);

  }
  componentDidUpdate = (prevProps, prevState) => {
    if( this.state.page > this.state.max_page ) {
      this._component_moveCarousel(this.state.max_page);
      // this.setState({
      //   page: this.state.max_page
      // })
    } else {
      this._component_moveCarousel(this.state.page);
    }
  }
  componentWillUnmount = () => {
    $(window).off('resize', this._setWindowResizeEvent);
  }

  /**
   * @func _setWindowResizeEvent 윈도우 이벤트에 적용할 로직들의 모임.
   * @func _component_getCarouselItems carousel item들의 정보가 담겨있는 props를 받아 rendering시켜주는 함수.
   * @func _component_setResizeCarouselViews 브라우저가 resize가 될 때마다 캐러샐의 componentSize를 변경시킴.
   * @func _component_setComponentSize 마운트 된 캐러샐(ul, li)의 사이즈를 지정.
   * @func _component_moveCarousel 캐러샐을 움직여주는 함수
   */

   
  _setWindowResizeEvent() {
    this._component_setResizeCarouselViews();
  }

  /*
    get Data Model
    carousel_item_info: {
      src: '',
      title: '',
      time: '',
      etc: {
        user_name: '',
        country: '',
        view_count: 0
      }
    }
  */
  _component_getCarouselItems = (info) => {
    console.log('Carousel info: ', info)
    if( !info ) {
      return '데이터가 없습니다.';
    }

    return info.map((data, index) => {
      return (
        <li key={index}>
          <a>
            <figure>
              <div>
                <img 
                  src={data.src} 
                  alt="이미지에 대한 상세설명은 하단의 내용 참고." 
                />
              </div>
              <figcaption>
                <Title title={data.title}/>
                <Time time={data.time}/>
                <Etc etc={data.etc}/>
              </figcaption>
            </figure>
          </a>
        </li>
      );
    });
  }
  
  _component_setComponentSize = (parent, view) => {
    let parent_width = parseInt(parent.css('width'));
    let ul = $(this.refs.carouselWrapper).find('.carousel-list > ul'),
        li = ul.find('li');
    
    let max_page = li.length / view;
    if( max_page === parseInt(max_page) ) {
      max_page -= 1;
    }
    this.setState({
      parent_width: parent_width,
      max_page: parseInt(max_page)
    })


    ul.css('width', ((parent_width * li.length) / view) + 'px');
    li.each((index, item)=>{
      $(item).css('width', (parent_width / view) + 'px');
    });
  }

  _component_setResizeCarouselViews = () => {
    let window_width = $(window).width(),
        parent = $(this.refs.carouselWrapper).parent();

    if( window_width > 1200 ) {
      this._component_setComponentSize(parent, 4);
    } else if( window_width <= 1199 && window_width >= 768 ) {
      this._component_setComponentSize(parent, 3);
    } else if(window_width < 768) {
      this._component_setComponentSize(parent, 1);
    }
  }


  _component_moveCarousel = (page) => {
    let ul = $(this.refs.carouselWrapper).find('.carousel-list > ul'),
        move_size = this.state.parent_width;
    
    ul.stop( true, true ).animate({ left: -(move_size * page) + 'px' }, 500);
  }

  _component_mouseMoveCarousel = (clientX) => {


    let depth = 80, posX = this.state.posX,
        ul = $(this.refs.carouselWrapper).find('.carousel-list > ul');

    let distance = Math.abs(posX - clientX);

    if( this.state.mouse_move_direction === 'next') {
      ul.stop(true, true).animate({ left: parseInt(ul.css('left')) - distance + 'px' });
    } else {
      ul.stop(true, true).animate({ left: parseInt(ul.css('left')) + distance + 'px' });
    }
  }

  render() {

    return (
      <div 
        className="carousel-wrapper" 
        ref="carouselWrapper"
        >
        <div 
          className="carousel-list"
          onMouseDown={ (e) => { e.stopPropagation(); this._onMouseDown(e) } }
          onMouseUp={ (e) => { e.stopPropagation(); this._onMouseUp() } }
          onMouseMove={ (e) => { e.stopPropagation(); this._onMouseMove(e) } }
        >
          <ul>
            {this._component_getCarouselItems(this.props.carousel_item_info)}
          </ul>
        </div>
        <button 
          type="button" 
          className="carousel-btn prev"
          onClick={ () => { this._onClickPrevBtn(); } }
          
        ></button>
        <button 
          type="button" 
          className="carousel-btn next"
          onClick={ () => { this._onClickNextBtn(); } }
        ></button>
      </div>
    )
  }
}



const Title = ({title}) => {

    return ( <h3 className="title">{title}</h3> );
}


const Etc = ({etc}) => {
  const renderEtc = () => {
    if( etc ) {
      return (
        <em>
          {etc.country} | {etc.user_name} | {etc.view_count}
        </em>
      )
    } else {
      return '';
    }
  }
  return ( renderEtc() );
}


const Time = ({time}) => {

  const renderTime = () => {
    if( time ) {
      return (<time dateTime={time}>{time}</time>);
    } else {
      return '';
    }
  }
    return ( renderTime() );
}


Carousel.propTypes = {
  carousel_item_info: PropTypes.array
}
Title.propTypes = {
  title: PropTypes.string
}
Etc.propTypes = {
  etc: PropTypes.object
}
Time.propTypes = {
  time: PropTypes.string
}