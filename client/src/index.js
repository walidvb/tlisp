import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));