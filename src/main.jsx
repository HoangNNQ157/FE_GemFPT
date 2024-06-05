import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';



ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
