import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet('Img', {
  container: {
    display: 'inline',
  },
});

const imgShortcode = imgurl => `[imgurl src=${imgurl}]`;

class Img extends Component {
  state = { open: false, imgurl: '' };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, videoid: '' });
  };

  onInsert = () => {
    const html = imgShortcode(this.state.imgurl);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { imgurl } = this.state;
    return (
      <div className={classes.container}>
        <Button raised onClick={this.openDialog} className={classes.button}>
          Img
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.closeDialog}>
          <DialogTitle>{"Bla bla bla"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Put images here
            </DialogContentText>
            <TextField
              label="Image URL"
              value={imgurl}
              onChange={event => this.setState({ imgurl: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} primary>Cancel</Button>
            <Button onClick={this.onInsert} primary>Insert</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Img.defaultProps = {
  user: { avatar: '' },
};

Img.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Img);
