import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from './List/List';


export default class App extends Component {
	constructor(props) {
 	 super(props);
  }
  
	render() {
		return (
			<div>
				hello dd
				<List/>
			</div>
		);
	}
}


App.propTypes = {

}
App.defaultProps = {

}