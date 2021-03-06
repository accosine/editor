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
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';

const styleSheet = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
});

const instagramShortcode = (id, isCaptioned) =>
  `[instagram id=${id}${isCaptioned ? ' captioned' : ''}]`;

class Instagram extends Component {
  state = { open: false, id: '', isCaptioned: false };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, id: '' });
  };

  onInsert = () => {
    const { id, isCaptioned } = this.state;
    const html = instagramShortcode(id, isCaptioned);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { id, isCaptioned } = this.state;
    return (
      <div className={classes.container}>
        <Button dense onClick={this.openDialog} className={classes.button}>
          Instagram
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
              label="Instagram Post ID"
              value={id}
              onChange={event => this.setState({ id: event.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isCaptioned}
                  onChange={(event, isCaptioned) =>
                    this.setState({ isCaptioned })}
                />
              }
              label="Captioned"
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

Instagram.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Instagram);
