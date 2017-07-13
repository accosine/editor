import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Login from './Login';

const styleSheet = createStyleSheet('Navigation', () => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}));

const Navigation = props => {
  const { classes, ...rest } = props;

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} >
        <Toolbar>
          <IconButton onClick={() => props.ACTIONS.handleToggle()}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" className={classes.flex}>
            Title
          </Typography>
          <Login {...rest}/>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Navigation);
