import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router';

import ConnectBar from './components/connect-bar';
import CommentsList from './components/comments-list';
import PresenterRoot from './components/presenter-root';
import { rootReducer } from './reducers';
import facebookConnector from './services/facebook';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

class App extends Component {
  render() {
    const facebook = facebookConnector();

    return (
      <div className="row mt-4">
        <div className="col-xs-4">
          <ConnectBar facebook={facebook} />
          <CommentsList facebook={facebook} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/presenter" component={PresenterRoot} />
    </Router>
  </Provider>
  , document.querySelector('.container'));
  