import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import * as firebase from "firebase";
import {connect} from 'react-redux';
import update from 'react-addons-update';

// 컴포넌트
import List from './List/List';
import Editor from './Editor';

// firebase 관련 설정
const config = {
	apiKey: "AIzaSyBZeqdOpwcLz0WlvJPLzu0L6qGrzl0UhHY",
	authDomain: "traveler-in-blog.firebaseapp.com",
	databaseURL: "https://traveler-in-blog.firebaseio.com",
	projectId: "traveler-in-blog",
	storageBucket: "traveler-in-blog.appspot.com",
	messagingSenderId: "448524690938"
};
firebase.initializeApp(config);

//firebase DB 
const DB = firebase.database().ref();

class App extends Component {
	constructor(props) {
		super(props);
  }
	componentWillMount() {
		// DB에서 받은 값을 배열로 변환하여 전달.
		DB.on('value', snapshot => {
			const snap = snapshot.val();
			const lists = Object.keys(snap.lists).map(key => {
				const list_item = snap.lists[key];
				// Obejct.keys로 객체를 순환하면 key값이 배열에 들어가지 않기 떄문에, key값을 추가
				list_item.key = key;
				return list_item
			})
			const users = Object.keys(snap.users).map(key => snap.users[key]);
			const DB_data = {
				lists,
				users
			}
			this.props.fetchDB(DB_data);
		})
	}

	render() {
		return (
			<div>
				<List/>
				<Editor />
			</div>
		);
	}
}


App.propTypes = {
}
App.defaultProps = {
}

export default connect(null, actions)(App);