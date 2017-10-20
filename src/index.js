import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './scss/stylesheets.scss'; 
import {createStore} from 'redux';
import reducers from './reducers';
import {Provider} from 'react-redux';


const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.querySelector('#App'));