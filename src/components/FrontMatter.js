import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

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
