import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('Login', {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
});

const Login = props => {
  const { classes, isAuthenticated, Authenticate }  = props;
  const authed = isAuthenticated();

  if (authed) {
    return (
      <div className={classes.row}>
        <Avatar
          alt=''
          src={props.user.avatar}
          className={classes.avatar}
        />
      </div>
    );
  } else {
    return (
      <Button onClick={event => Authenticate()} contrast>
        Login
      </Button>
    );
  }
};

Login.defaultProps = {
  user: { avatar: '' },
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Login);
