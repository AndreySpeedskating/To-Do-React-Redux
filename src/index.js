import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import reducer from './rootRedux'
import {Provider} from 'react-redux'

const loggerMiddleware = store => next => action => {
    const result = next(action)
    console.log('Middleware', store.getState())
    return result
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware))

const application = (
    <Provider store = {store}>
            <App/>
    </Provider>
)

ReactDOM.render(
  <React.StrictMode>
      {application}
  </React.StrictMode>,
  document.getElementById('root')
);


