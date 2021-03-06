import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Login from './Login';

const styleSheet = {
  root: {
    // position: 'relative',
    // width: '100%',
  },
  appBar: {
    // position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const Navigation = props => {
  const { classes, onDrawerToggle, ...rest } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={onDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" className={classes.flex}>
            Title
          </Typography>
          <Login {...rest} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Navigation);
