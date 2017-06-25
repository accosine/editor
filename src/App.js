import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SplitScreen from './components/SplitScreen';
import Navigation from './components/Navigation';

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
        <SplitScreen />
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
