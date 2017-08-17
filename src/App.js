import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SplitScreen from './components/SplitScreen';
import Articles from './components/Articles';
import Navigation from './components/Navigation';
import Dresser from './components/Dresser';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const styleSheet = {
  app: {
    // height: '100vh'
  },
};

const RenderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return RenderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

const PrivateRoute = ({ component, redirectTo, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return auth()
          ? RenderMergedProps(component, routeProps, rest)
          : <Redirect
              to={{
                pathname: redirectTo,
                state: { from: routeProps.location },
              }}
            />;
      }}
    />
  );
};

class App extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <Router>
        <div className="app">
          <Navigation {...rest} />
          <Dresser {...rest} />
          <PrivateRoute
            exact
            path="/editor"
            component={SplitScreen}
            redirectTo="/"
            auth={this.props.isAuthenticated}
            {...rest}
          />
          <PrivateRoute
            path="/editor/:slug"
            component={SplitScreen}
            redirectTo="/"
            auth={this.props.isAuthenticated}
            {...rest}
          />
          <PrivateRoute
            path="/articles"
            component={Articles}
            redirectTo="/"
            auth={this.props.isAuthenticated}
            {...rest}
          />
        </div>
      </Router>
    );
  }
}

export default withStyles(styleSheet)(App);
