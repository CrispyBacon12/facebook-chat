import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import ConnectBar from './components/connect-bar';
import CommentsList from './components/comments-list';
import { rootReducer } from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

class App extends Component {
  render() {
    return (
      <div className="row mt-4">
        <div className="col-xs-4">
          <ConnectBar />
          <CommentsList />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <App />
  </Provider>
  , document.querySelector('.container'));