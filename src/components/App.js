import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// 컴포넌트
import ListContainer from '../containers/ListContainer';
import ReadContainer from '../containers/ReadContainer';
import Editor from './Editor/index';
import Main from './Main/index';

class App extends Component {
	constructor(props) {
 	 super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path="/" component={Editor} />
						{/* <Route path="/List/:param" param="" component={ListContainer} />
						<Route path="/Read/:key" param="" component={ReadContainer} />
						<Route path="/Editor/" component={Editor} /> */}
					</Switch>
					{/* <Editor /> */}
				</div>
			</Router>
		);
	}
}


App.propTypes = {
}
App.defaultProps = {
}

export default App;