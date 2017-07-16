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
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dnd from './Dnd';

const styleSheet = createStyleSheet('Img', {
  container: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
    marginTop: '3vw',
  },
});

const TabContainer = props =>
  <div style={{ padding: 24 }}>
    {props.children}
  </div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const imgShortcode = imgurl => `[imgurl src=${imgurl}]`;

class Img extends Component {
  state = { open: false, imgurl: '', index: 0 };

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

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const { classes } = this.props;
    const { imgurl } = this.state;
    return (
      <div className={classes.container}>
        <Button raised onClick={this.openDialog} className={classes.button}>
          Img
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.closeDialog}
          transition={<Slide direction="up" />}
        >
          <DialogTitle>
            {'Bla bla bla'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Put images here</DialogContentText>
            <TextField
              label="Image URL"
              value={imgurl}
              onChange={event => this.setState({ imgurl: event.target.value })}
            />
            <Paper className={classes.root}>
              <Tabs
                index={this.state.index}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
              </Tabs>
            </Paper>
            {this.state.index === 0 &&
              <TabContainer>
                {'Item One'}
                <Dnd/>
              </TabContainer>}
            {this.state.index === 1 &&
              <TabContainer>
                {'Item Two'}
              </TabContainer>}
            {this.state.index === 2 &&
              <TabContainer>
                {'Item Three'}
              </TabContainer>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} primary>
              Cancel
            </Button>
            <Button onClick={this.onInsert} primary>
              Insert
            </Button>
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
