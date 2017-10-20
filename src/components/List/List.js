import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import * as firebase from "firebase";

// 컴포넌트
import ListSort from './ListSort';
import ListSearch from './ListSearch';
import ListItems from './ListItems';
import ListPages from './ListPages';
import ListFooter from './ListFooter';

const propTypes = {
};
const defaultProps = {
};

// DB 관련 설정
const config = {
    apiKey: "AIzaSyBZeqdOpwcLz0WlvJPLzu0L6qGrzl0UhHY",
    authDomain: "traveler-in-blog.firebaseapp.com",
    databaseURL: "https://traveler-in-blog.firebaseio.com",
    projectId: "traveler-in-blog",
    storageBucket: "traveler-in-blog.appspot.com",
    messagingSenderId: "448524690938"
  };
firebase.initializeApp(config);
const DB = firebase.database().ref();


class List extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // state에 DB값 넣기.
        const data = DB.on('value', snapshot => {
            this.props.fetchDB(snapshot.val());
        })
    }
    render() {
        return(
          <div className="List">
            <h1>당신의 다음 목적지는 어디인가요?</h1>
            <ListSearch/>
            <ListSort/>
            <ListItems/>
            <ListPages/>
            <ListFooter/>
          </div>
        );
    }
}
List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default connect(null, actions)(List);