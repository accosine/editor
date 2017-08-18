import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dnd from './Dnd';
import MediaManager from './MediaManager';
import connectFirebase from '../util/connect-firebase';

const styleSheet = {
  container: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
  },
};

const TabContainer = props =>
  <div style={{ padding: 24 }}>
    {props.children}
  </div>;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const imgShortcode = (img, carousel) =>
  `[image ${carousel
    ? 'fill'
    : `width=${img.width} height=${img.height}`} name='${img.name}']`;
const carouselShortcode = (imgs, settings) =>
  `[carousel${settings.autoplay
    ? ` autoplay delay=${settings.delay}`
    : ''}${settings.loop ? ' loop' : ''}${settings.controls
    ? ' controls'
    : ''}]\n${imgs
    .map(img => imgShortcode(img, true))
    .join('\n')}\n[/carousel]`;

class Img extends Component {
  state = {
    open: false,
    index: 0,
    selection: [],
    carouselSettings: {
      autoplay: false,
      loop: false,
      controls: true,
      delay: '3000',
    },
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  onSelection = images => {
    this.setState({ selection: images });
  };

  onCarouselSettings = carouselSettings => {
    this.setState({ carouselSettings });
  };

  onInsert = () => {
    const html =
      this.state.selection.length > 1
        ? carouselShortcode(this.state.selection, this.state.carouselSettings)
        : imgShortcode(this.state.selection[0]);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  handleChange = (event, index) => {
    this.setState({ index });
  };

  render() {
    const { classes } = this.props;
    const { index, carouselSettings } = this.state;
    return (
      <div className={classes.container}>
        <Button dense onClick={this.openDialog} className={classes.button}>
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
                value={this.state.index}
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
                <Dnd switchTab={this.handleChange} />
              </TabContainer>}
            {index === 1 &&
              <TabContainer>
                <MediaManager
                  onSelection={this.onSelection}
                  onCarouselSettings={this.onCarouselSettings}
                  carouselSettings={carouselSettings}
                />
              </TabContainer>}
            {index === 2 &&
              <TabContainer>
                {'Item Three'}
              </TabContainer>}
          </DialogContent>
          <DialogActions>
            <div>
              {index > 0 &&
                <Button
                  disabled={!this.state.selection.length}
                  onClick={this.onInsert}
                >
                  Insert
                </Button>}
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

export default withStyles(styleSheet)(connectFirebase(Img));
