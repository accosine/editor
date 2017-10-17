import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Slide from 'material-ui/transitions/Slide';
import Select from 'material-ui/Select';
import IconButton from 'material-ui/IconButton';
import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline';
import Chip from 'material-ui/Chip';

import MediaManager from './MediaManager';
import MediaManagerTabs from './MediaManager/Tabs';
import MediaManagerActions from './MediaManager/Actions';
import config from '../config';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

class ChipsArray extends React.Component {
  handleRequestDelete = data => () => {
    const chipData = [...this.props.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.props.onChange(chipData);
  };

  render() {
    const { classes, chipData } = this.props;

    return (
      <div className={classes.row}>
        {chipData.map((data, index) => {
          return (
            <Chip
              label={data}
              key={index}
              onRequestDelete={this.handleRequestDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

ChipsArray = withStyles(styles)(ChipsArray);

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
        {this.state.open ? (
          <Dialog
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
        ) : null}
      </div>
    );
  }
}

class ChipInput extends Component {
  state = {
    text: '',
  };

  handleChipAdd = () => {
    this.props.onChange([...this.props.chipData, this.state.text]);
    console.log('new chips', [...this.props.chipData, this.state.text]);
    this.setState({ text: '' });
  };

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleChipAdd();
    }
  };

  render() {
    const { text } = this.state;
    const { onChange, chipData, id } = this.props;
    return (
      <div>
        <TextField
          onKeyPress={this.onKeyPress}
          label={id}
          value={text}
          onChange={event => this.setState({ text: event.target.value })}
          margin="normal"
        />
        <IconButton onClick={this.handleChipAdd}>
          <AddCircleOutlineIcon />
        </IconButton>
        <ChipsArray chipData={chipData} onChange={onChange} />
      </div>
    );
  }
}

const StyledFrontMatterImagePicker = withStyles(imagePickerStyleSheet)(
  FrontMatterImagePicker
);

const FrontMatterTextfield = ({ id, onChange, classes, ...props }) => (
  <TextField
    className={classes.textField}
    id={id}
    label={id}
    value={props[id]}
    onChange={event => onChange({ [id]: event.target.value })}
    margin="normal"
  />
);

// TODO: add date and date modified to frontmatter

const FrontMatter = props => (
  <div className={props.classes.container}>
    <StyledFrontMatterImagePicker
      onInsert={selected => {
        props.onChange({ picture: selected.name });
        props.onChange({ attribution: selected.attribution });
        props.onChange({ alt: selected.alt });
      }}
    />
    <FrontMatterTextfield id="title" {...props} />
    <FormControl margin="normal">
      <InputLabel htmlFor="author">author</InputLabel>
      <Select
        value={props.author}
        onChange={event => props.onChange({ author: event.target.value })}
        input={<Input id="author" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(config.authors).map(author => (
          <MenuItem key={author} value={author}>
            {config.authors[author].name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FrontMatterTextfield id="description" {...props} />
    <FormControl margin="normal">
      <InputLabel htmlFor="category">category</InputLabel>
      <Select
        value={props.category}
        onChange={event => props.onChange({ collection: event.target.value })}
        input={<Input id="category" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(config.categories).map(category => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FrontMatterTextfield id="headline" {...props} />
    <FrontMatterTextfield id="subline" {...props} />
    <FormControl margin="normal">
      <InputLabel htmlFor="layout">layout</InputLabel>
      <Select
        value={props.layout}
        onChange={event => props.onChange({ layout: event.target.value })}
        input={<Input id="layout" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(config.layouts).map(layout => (
          <MenuItem key={layout} value={layout}>
            {layout}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl margin="normal">
      <InputLabel htmlFor="type">type</InputLabel>
      <Select
        value={props.type}
        onChange={event => props.onChange({ type: event.target.value })}
        input={<Input id="type" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(config.types).map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FrontMatterTextfield id="picture" {...props} />
    <FrontMatterTextfield id="attribution" {...props} />
    <FrontMatterTextfield id="alt" {...props} />
    <FrontMatterTextfield id="slug" {...props} />
    {props.type === 'rezension' ? (
      'rezension'
    ) : props.type === 'rezept' ? (
      <ChipInput
        id="ingredients"
        onChange={ingredients => props.onChange({ ingredients })}
        chipData={props.ingredients}
      />
    ) : props.type === 'video' ? (
      'video'
    ) : null}
  </div>
);

FrontMatter.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
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
