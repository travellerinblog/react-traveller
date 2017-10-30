import React, { Component } from 'react';
import PropTypes from 'prop-types';

import $ from '../../../node_modules/jquery/dist/jquery.min';

export default class Carousel extends Component {
  
  // 1. 데이터를 받아 렌더링하기
  // 2. mount된 후 component를 변화

  constructor(props) {
    super(props);

    this.state = {
      parent_width: 0,
      view: 0,
      current_page: 0
    }
  }


  getRender = (info) => {

    return info.map((data, index)=> {
      // data: src, title, time, name, view_count, country
      const alt = data.tag.join(' ');
      const time = data.time;
      if (index > 10) {
        return '';
      }
      return (
        <li key={data.title}>
          <figure>
            <div className="carousel-img-box">
              <img src={data.src} alt={alt} />
            </div>
            <Figcaption 
              title={data.title} 
              time={data.time} 
              name={data.name}  
              view_count={data.view_count}
              country={data.country}
            />
          </figure>
        </li>
      );
    });
  }

  setCarouselCompStyle = () => {
    const parent = this.refs.carousel.parentNode;
    const ul = parent.querySelector('ul');
    const li = ul.querySelectorAll('li');

    const parent_width = parseInt(window.getComputedStyle(parent).width);
    const view = this.getResizeViewCount();

    ul.style.width = ((parent_width * li.length) / view) + 'px';  

    for(let i = 0, len = li.length; i < len; i++) {
      li[i].style.width = parent_width / view + 'px';
    }
  }
  getParentWidth = () => {
    return parseInt(window.getComputedStyle(this.refs.carousel.parentNode).width);
  }
  getMaxPages = () => {
    const parent = this.refs.carousel.parentNode;
    const li = parent.querySelectorAll('li');
    const view = this.getResizeViewCount();
    
    // if( view === 1 ) {
    //   return li.length - 1;
    // }
    // return parseInt(li.length / view)
    return li.length - view;
  }
  setCurrentPage = () => {
    const max_page = this.getMaxPages();
    const view = this.getResizeViewCount();

    if( this.state.current_page > max_page ) {
      this.setState({
        current_page: max_page
      })
    }
    // console.log(max_page - view);
    // if( this.state.current > (max_page - view) ) {
      
    //   this.setState({
    //     current_page: max_page - view - 1
    //   })
    // } 
  }
  getResizeViewCount = (browser_width) => {
    browser_width = browser_width || window.innerWidth;
    let view = 0;
    const depth = 30;
    
    if(browser_width >= 1200) {
      view = 4;
    } else if (browser_width >= 768 && browser_width < 1200) {
      view = 3;
    } else if (browser_width < 768) {
      view = 1;
    }

    return view;
  }

  bind = () => {
    const carousel = this.refs.carousel;
    const prev_btn = carousel.querySelector('.move-btn.prev');
    const next_btn = carousel.querySelector('.move-btn.next');

    window.addEventListener('resize', this.resizeEventFns);
  }

  resizeEventFns = () => {
    const browser_width = window.innerWidth;
    this.setCarouselCompStyle();
    this.setCurrentPage();
    this.moveCarousel(this.state.current_page);
  }

  carouselMoveFn = (direction) => {
    const carousel = this.refs.carousel;
    const ul = carousel.querySelector('ul');

    const max_page = this.getMaxPages();
    let page = this.state.current_page;

    console.log(max_page);
    if(direction === 'prev') {
      page -= 1;

      if(page < 0) {
        page = max_page;
      }
      
    } else if(direction === 'next') {
      page += 1;

      if( page > max_page) {
        page = 0;
      }
    }

    
    this.moveCarousel(page);

    this.setState({
      current_page: page
    });

    console.log(page);

  }
  moveCarousel = (page) => {
    const ul = this.refs.carousel.querySelector('ul');
    const parent_width = this.getParentWidth();
    const view = this.getResizeViewCount();

    $(ul).stop(true, true).animate({ left: -(parent_width / view * page) + 'px' }, 300);
  }
  
  componentDidMount = () => {
    this.setCarouselCompStyle();
    this.bind();
  }
  
  render() {
    
    return (
      <div className="carousel" ref="carousel">
        <ul>
          {this.getRender(this.props.carousel_info)}
        </ul>
        <button 
          type="button" 
          className="move-btn prev"
          onClick={() => { this.carouselMoveFn('prev') }}
          ></button>
        <button 
          type="button" 
          className="move-btn next"
          onClick={() => { this.carouselMoveFn('next') }}
          ></button>
      </div>
    )
  }
}

const Figcaption = ({title, time, name, view_count, country}) => {

    return (
      <figcaption>
        <h4>{title}</h4>
        <Time time={time}/>
        <DetailInfo name={name} view_count={view_count} country={country}/>
      </figcaption>
    );
}
const Time = ({time}) => {
    if( !time ) {
      return '';
    }
    const year = time.substring(0, 4);
    const month = time.substring(5, 6);
    const day = time.substring(7, 8);
    const full_time = year + '-' + month + '-' + day;
    return (
      <time datetime={full_time}>{full_time}</time>
    );
}
const DetailInfo = ({name, view_count, country}) => {

    if( !name || !view_count || !country ) {
      return '';
    }
    return (
      <div>
        {name} | {country} | 조회수 {view_count} 
      </div>
    );
}


Carousel.propTypes = {
  prop: PropTypes
}