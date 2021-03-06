import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  container: {
    height: '100%',
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
    resize: 'none',
    padding: 10,
  },
};

class Editor extends Component {
  handleEdit = ({ target }) => {
    const text = target.value;
    this.props.onEdit(text, {
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
          autoFocus
          value={text}
          className={classes.textArea}
          onChange={this.handleEdit}
          onClick={this.handleCaretPosition}
          onKeyUp={this.handleCaretPosition}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onCaretPosition: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Editor);
