import React from 'react';
import ReactDOM from 'react-dom';
import withTracker from './utils/withTracker';
import './index.css';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const render = (Component) => {
  return ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route component={withTracker(Component)} />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}