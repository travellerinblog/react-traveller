import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';

import './scss/stylesheets.scss'; 
import App from './components/App';


const store = createStore(reducers);

console.log(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.querySelector('#App'));