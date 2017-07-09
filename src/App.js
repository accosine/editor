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
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className="app">
        <Navigation {...this.props} />
        <SplitScreen />
      </div>
    );
  }
}

export default withStyles(styleSheet)(App);
