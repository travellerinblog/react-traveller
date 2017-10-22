import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Editor from './Editor';

export default class App extends Component {
	constructor(props) {
 	 super(props);
  }
  
	render() {
		return (
			<div>
				<Editor />
			</div>
		);
	}
}


App.propTypes = {

}
App.defaultProps = {

}