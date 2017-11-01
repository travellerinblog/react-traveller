import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listDB, userDB } from '../../actions/';
import { Route, Link } from 'react-router-dom';

// import Carousel from '../Carousel/';
import Carousel from '../Carousel/Carousel';
import MainContent from './Main_content';
import Loading from './Loading';



class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.props.listDB();
    this.props.userDB();
  }
  
  
  getContentInfo = (class_name, title) => {
    return {
      class_name,
      title
    }
  }

  getWhereCarouselInfo = () => {
    var country_temp = [];

    this.props.list_db.forEach(data => {
      if( country_temp.length === 0 ) {
        country_temp.push(data);
      } else {
        var is_country = false;
        var data_country = data.location.country[0];

        for(var i = 0, len = country_temp.length; i < len; i++) {
          var country = country_temp[i].location.country[0];
          
          if( data_country === country ) {
            is_country = true;
            break;
          }
        }

        !is_country && country_temp.push(data);
      }
    });
    console.log('country_temp', country_temp);

    return country_temp.map((data, index) => {

      const src = data.title_img;
      const title = data.location.country[0];
      const tag = data.tag;
      const key = data.key;
      const what = 'where';
      return {
        src,
        title,
        tag,
        key,
        what
      }
    });
  }

  getBloglistCarouselInfo = () => {


    return this.props.list_db.map((data, index) => {
      
      const src = data.title_img;
      const title = data.title;
      const time = data.write_date;
      const name = data.name;
      const tag = data.tag;
      const country = data.location.country.join(' ');
      const view_count = data.view;
      const key = data.key;
      const what = 'bloglist';

      return {
        src,
        title,
        time,
        name,
        tag,
        country,
        view_count,
        key,
        what
      }
    });
  }

  render() {

    if( JSON.stringify(this.props.list_db) === '{}' ) {
      return (
        <Loading />
      );
    }
    const list_db = this.props.list_db.slice();
    const max_view_list = list_db.sort(function(prev, next) {
      return next.view - prev.view;
    })[0];
    const max_view_time = `${max_view_list.write_date.substring(0, 4)}-${max_view_list.write_date.substring(5, 6)}-${max_view_list.write_date.substring(7, 8)}`;

    return (
      <main>
        <div className="visual-container">
          <div className="visual">
            <video id="bgvid" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
              <source src="/src/assets/video.mp4" type="video/mp4"/>
            </video>
          </div>
          <div className="video-content">
            <p>
              <strong>여행의 새로운 패러다임</strong>
              <em>당신의 여행은 어땠나요? 저희 트레블로에게 알려주세요.</em>
              <button className="btn-start" type="button">
                시작하기
                {/* font awesome */}
              </button>
            </p>
          </div>
        </div>
        <div className="main-content">
          <section className="country">
            <div>
              <h3 className="title">어디로 갈래?</h3>
              {/* set Country */}
              <Link to={{pathname: '/List/', country: ''}}>더보기</Link>
            </div>
            <Carousel carousel_info={this.getWhereCarouselInfo()}/>
            {/* <Carousel carousel_item_info={this.state.carousel_item_info}/> */}

          </section>
          <section className="bloglist">
            <div>
              <h3 className="title">나 여기 왔다 갔다!</h3>
              {/* set Key */}
              <Link to={{pathname: '/Read/', key: ''}}>더보기</Link>
            </div>
            <Carousel carousel_info={this.getBloglistCarouselInfo()}/>
          </section>
          <section className="recommend">
            <h3>우리가 강추한다</h3>
            <div className="recommend-img">
              <img src={max_view_list.title_img} alt="test"/>
            </div>
            <div>
              <h4>{max_view_list.title}</h4>
              <p className="recommend-info">
                {max_view_time} | {max_view_list.location.country[0]} | {max_view_list.name}
              </p>
              <p className="recommend-content">
                {max_view_list.contents[1].value}
              </p>
            </div>
          </section>
        </div>
      </main>
    )
  }
}


const mapStateToProps = ({ list_db, user_db }) => {
  return { list_db, user_db }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( { listDB, userDB } , dispatch );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);