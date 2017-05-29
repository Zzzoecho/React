import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Welcome from './Welcome'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root2')
);

ReactDOM.render(
  <Welcome/>,
  document.getElementById('root')
)