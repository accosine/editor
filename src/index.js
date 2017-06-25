import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import './index.css';

ReactDOM.render(
  <MuiThemeProvider><App /></MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
