import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import ReduxApp from "./components/redux_app";

// import { ReduxApp } from "./components/redux_app"

ReactDOM.render(
  // <ReduxApp />,
  <App />,
  document.querySelector('#root')
);
