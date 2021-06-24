import React from 'react';
import { render } from 'react-dom';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import cardStyle from './scss/card.scss';
import navigationStyle from './scss/navigation.scss';
import mainStyle from './scss/styles.scss';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
