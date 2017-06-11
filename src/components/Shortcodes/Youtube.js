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

const youtubeShortcode = (videoid) => `[youtube videoid=${videoid}]`;

const styleSheet = createStyleSheet('Youtube', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
}));

class Youtube extends Component {
  state = { open: false, videoid: '' };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, videoid: '' });
  };

  onInsert = () => {
    const html = youtubeShortcode(this.state.videoid);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { videoid } = this.state;
    return (
      <div className={classes.container}>
        <Button raised onClick={this.openDialog} className={classes.button}>
          YouTube
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.closeDialog}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location.
              This means sending anonymous location data
              to Google, even when no apps are running.
            </DialogContentText>
            <TextField
              label="YouTube Video ID"
              value={videoid}
              onChange={event => this.setState({ videoid: event.target.value })}
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

Youtube.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Youtube);
