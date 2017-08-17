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
    height: '100vh',
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

const PrivateRoute = ({ component, redirectTo, ...rest }) =>
  <Route
    {...rest}
    render={routeProps =>
      rest.firebase.isAuthenticated()
        ? RenderMergedProps(component, routeProps, rest)
        : <Redirect
            to={{
              pathname: redirectTo,
              state: { from: routeProps.location },
            }}
          />}
  />;

class App extends Component {
  render() {
    const {
      classes,
      firebase,
      user,
      open,
      onDrawerToggle,
      onDrawerClose,
    } = this.props;
    return (
      <Router>
        <div className={classes.app}>
          <Navigation
            onDrawerToggle={onDrawerToggle}
            firebase={firebase}
            user={user}
          />
          <Dresser
            onDrawerClose={onDrawerClose}
            firebase={firebase}
            open={open}
          />
          <PrivateRoute
            exact
            path="/editor"
            component={SplitScreen}
            redirectTo="/"
            firebase={firebase}
          />
          <PrivateRoute
            path="/editor/:slug"
            component={SplitScreen}
            redirectTo="/"
            firebase={firebase}
          />
          <PrivateRoute
            path="/articles"
            component={Articles}
            redirectTo="/"
            firebase={firebase}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  firebase: PropTypes.shape({
    ACTIONS: PropTypes.object.isRequired,
    AUTH: PropTypes.object.isRequired,
    Authenticate: PropTypes.func.isRequired,
    CONNECT: PropTypes.func.isRequired,
    DATABASE: PropTypes.object.isRequired,
    REFS: PropTypes.object.isRequired,
    STORAGE: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styleSheet)(App);
