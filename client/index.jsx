import React from 'react';
import ReactDOM from 'react-dom';

/* this is the original App without redux*/
import App from './components/app';

/* this is the new App using redux */
import ReduxApp from './containers/redux_app'

/* this is the redux practice one, from components */
// import ReduxApp from "./components/redux_app";

ReactDOM.render(
  <ReduxApp />,
  // <App />,
  document.querySelector('#root')
);
