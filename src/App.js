import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/reducer/store';

import "./mainStyles.css";

export const App = () => {

  return (

      <Provider store={store}>
        <AppRouter />
      </Provider>

  )

};
