import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';

const store = configureStore();
import registerServiceWorker from './registerServiceWorker';

<Provider store={store}>
  <App />
</Provider>,
registerServiceWorker();
