import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styleSheet = createStyleSheet(theme => ({
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
}));

const FrontMatterTextfield = ({ id, onChange, classes, ...props }) =>
  <TextField
    className={classes.textField}
    id={id}
    label={id}
    value={props[id]}
    onChange={event => onChange({ [id]: event.target.value })}
    margin="normal"
  />;

const FrontMatter = props =>
  <div className={props.classes.container}>
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

FrontMatter.PropTypes = {
  title: PropTypes.string.required,
  author: PropTypes.string.required,
  description: PropTypes.string.required,
  collection: PropTypes.string.required,
  headline: PropTypes.string.required,
  subline: PropTypes.string.required,
  layout: PropTypes.string.required,
  type: PropTypes.string.required,
  picture: PropTypes.string.required,
  attribution: PropTypes.string.required,
  alt: PropTypes.string.required,
  slug: PropTypes.string.required,
  onChange: PropTypes.func.required,
};

export default withStyles(styleSheet)(FrontMatter);
