import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/Menu/MenuItem';
import List from 'material-ui/List';
import { Link } from 'react-router-dom';

const styleSheet = createStyleSheet('Dresser', {
  list: {
    width: 550,
    flex: 'initial',
    color: 'red',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
});

//TODO: Remove 'ACTIONS', pass direct access to function via props
class Dresser extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Drawer className={classes.list} open={this.props.open}>
          <div>
            <List disablePadding>
              <Link to='/editor'>
                <MenuItem onClick={() => this.props.ACTIONS.handleClose()}>
                  Editor
                </MenuItem>
              </Link>
            </List>
            <List className={classes.list} disablePadding>
              <Link to='/articles'>
                <MenuItem onClick={this.props.ACTIONS.handleClose}>
                  Articles
                </MenuItem>
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
};

export default withStyles(styleSheet)(Dresser);
