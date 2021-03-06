import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styleSheet = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
});

const youtubeShortcode = videoid => `[youtube videoid=${videoid}]`;

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
        <Button dense onClick={this.openDialog} className={classes.button}>
          YouTube
        </Button>
        <Dialog open={this.state.open} onRequestClose={this.closeDialog}>
          <DialogTitle>
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <TextField
              label="YouTube Video ID"
              value={videoid}
              onChange={event => this.setState({ videoid: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button onClick={this.onInsert}>Insert</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Youtube.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Youtube);
