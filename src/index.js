import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';

import './scss/stylesheets.scss'; 
import App from './components/App';


// const store = createStore(reducers);
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
console.log(App);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
   document.querySelector('#App'));