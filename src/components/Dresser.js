import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/Menu/MenuItem';
import List from 'material-ui/List';
import { Link } from 'react-router-dom';

const styleSheet = {
  list: {
    width: 550,
    flex: 'initial',
    color: 'red',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
};

//TODO: Remove 'ACTIONS', pass direct access to function via props
class Dresser extends Component {
  render() {
    const { classes, onDrawerClose } = this.props;

    return (
      <div>
        <Drawer
          className={classes.list}
          open={this.props.open}
          onRequestClose={onDrawerClose}
        >
          <div>
            <List disablePadding>
              <Link to="/editor">
                <MenuItem onClick={onDrawerClose}>Editor</MenuItem>
              </Link>
            </List>
            <List className={classes.list} disablePadding>
              <Link to="/articles">
                <MenuItem onClick={onDrawerClose}>Articles</MenuItem>
              </Link>
            </List>
            <hr />
          </div>
        </Drawer>
      </div>
    );
  }
}

Dresser.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Dresser);
