import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';

import MediaManager from './MediaManager';
import MediaManagerTabs from './MediaManager/Tabs';
import MediaManagerActions from './MediaManager/Actions';

const styleSheet = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const imagePickerStyleSheet = {
  container: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
  },
};

class FrontMatterImagePicker extends Component {
  state = {
    open: false,
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, onInsert } = this.props;
    return (
      <div className={classes.container}>
        <Button dense onClick={this.openDialog} className={classes.button}>
          Img
        </Button>
        {this.state.open
          ? <Dialog
              fullScreen
              open={this.state.open}
              onRequestClose={this.closeDialog}
              transition={<Slide direction="up" />}
            >
              <MediaManager
                onInsert={selected => {
                  onInsert(selected);
                  this.closeDialog();
                }}
                onCancel={this.closeDialog}
              >
                <DialogContent>
                  <MediaManagerTabs />
                </DialogContent>
                <DialogActions>
                  <MediaManagerActions />
                </DialogActions>
              </MediaManager>
            </Dialog>
          : null}
      </div>
    );
  }
}

const StyledFrontMatterImagePicker = withStyles(imagePickerStyleSheet)(
  FrontMatterImagePicker
);

const FrontMatterTextfield = ({ id, onChange, classes, ...props }) =>
  <TextField
    className={classes.textField}
    id={id}
    label={id}
    value={props[id]}
    onChange={event => onChange({ [id]: event.target.value })}
    margin="normal"
  />;

// TODO: add date and date modified to frontmatter

const FrontMatter = props =>
  <div className={props.classes.container}>
    <StyledFrontMatterImagePicker
      onInsert={selected => {
        props.onChange({ picture: selected.name });
        props.onChange({ attribution: selected.attribution });
        props.onChange({ alt: selected.alt });
      }}
    />
    <FrontMatterTextfield id="title" {...props} />
    <FrontMatterTextfield id="author" {...props} />
    <FrontMatterTextfield id="description" {...props} />
    <FrontMatterTextfield id="collection" {...props} />
    <FrontMatterTextfield id="headline" {...props} />
    <FrontMatterTextfield id="subline" {...props} />
    <FrontMatterTextfield id="layout" {...props} />
    <FrontMatterTextfield id="type" {...props} />
    <FrontMatterTextfield id="picture" {...props} />
    <FrontMatterTextfield id="attribution" {...props} />
    <FrontMatterTextfield id="alt" {...props} />
    <FrontMatterTextfield id="slug" {...props} />
  </div>;

FrontMatter.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(FrontMatter);
