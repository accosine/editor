import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dnd from './Dnd';
import MediaManager from './MediaManager';

const styleSheet = createStyleSheet('Img', {
  container: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
  },
});

const TabContainer = props =>
  <div style={{ padding: 24 }}>
    {props.children}
  </div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const imgShortcode = img => `[image name='${img.name}']`;
const carouselShortcode = imgurl => `[imgurl name=${imgurl}]`;

class Img extends Component {
  state = { open: false, index: 0, selection: [] };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  onSelection = images => {
    this.setState({ selection: images });
  }

  onInsert = () => {
    const html = this.state.selection.length > 1 ? carouselShortcode(this.state.selection) : imgShortcode(this.state.selection[0]);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  handleChange = (event, index) => {
    this.setState({ index });
    console.log('this is the index' + index);
  };

  render() {
    const { classes } = this.props;
    const { index } = this.state;
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
          <DialogContent>
            <Paper className={classes.root}>
              <Tabs
                index={this.state.index}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Upload" />
                <Tab label="Images" />
                <Tab label="Search" />
              </Tabs>
            </Paper>
            {index === 0 &&
              <TabContainer>
                <Dnd switchTab={this.handleChange} {...this.props} />
              </TabContainer>}
            {index === 1 &&
              <TabContainer>
                <MediaManager onSelection={this.onSelection} {...this.props} />
              </TabContainer>}
            {index === 2 &&
              <TabContainer>
                {'Item Three'}
              </TabContainer>}
          </DialogContent>
          <DialogActions>
            <div>
              {index > 0 && <Button disabled={!this.state.selection.length} onClick={this.onInsert}>Insert</Button>}
              <Button onClick={this.closeDialog}>Cancel</Button>
            </div>
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
