import React from 'react';
import Add from './redux_add';

/* redux imports */
import { Provier, Provider } from 'react-redux';
import store from '../store';

const ReduxApp = () => (
    <Provider store={store}>
      <Add />
    </Provider>
)

export default ReduxApp;
