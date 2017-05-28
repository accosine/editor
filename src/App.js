import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import MarkdownEditor from './components/MarkdownEditor';
import Navigation from './components/Navigation';
// import './App.css';

const styleSheet = createStyleSheet('App', theme => ({
  app: {
    // height: '100vh'
  },
}));

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        <MarkdownEditor />
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
