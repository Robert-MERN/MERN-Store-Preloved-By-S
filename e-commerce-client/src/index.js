import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <PersistGate persistor={persistor} >
      <Provider store={store} >
        <App />
      </Provider>
    </PersistGate>,
  document.getElementById('root')
);
