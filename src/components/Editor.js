import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('Editor', theme => ({
  container: {
    height: '100%',
    // padding: '1em .5em',
  },
  textArea: {
    display: 'block',
    width: '100%',
    maxWidth: '100%',
    minHeight: '90%',
    border: 0,
    outline: 'none',
    fontSize: '12pt',
    background: 'transparent',
  },
}));

class Editor extends Component {
  handleEdit = ({ target }) => {
    const val = target.value;
    this.props.onEdit(val, {
      start: target.selectionStart,
      end: target.selectionEnd,
    });
  };

  handleCaretPosition = ({ target }) => {
    this.props.onCaretPosition({
      start: target.selectionStart,
      end: target.selectionEnd,
    });
  };

  render() {
    const { classes, text } = this.props;

    return (
      <div className={classes.container}>
        <textarea
          value={text}
          className={classes.textArea}
          onChange={this.handleEdit}
          onClick={this.handleCaretPosition}
          onFocus={this.handleCaretPosition}
          onKeyUp={this.handleCaretPosition}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Editor);
