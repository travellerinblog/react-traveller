import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import * as firebase from "firebase";
import {connect} from 'react-redux';

// import { BrowserRouter as Router, Link, Match, Miss } from 'react-router-dom';

import Main from './Main/';
import List from './List/List';

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
		// state에 DB값 넣기.
		DB.on('value', snapshot => {
			this.props.fetchDB(snapshot.val());
		})
	}

	render() {
		return (
			<div>
				<Main />
			</div>
		);
	}
}


App.propTypes = {
}
App.defaultProps = {
}

export default connect(null, actions)(App);