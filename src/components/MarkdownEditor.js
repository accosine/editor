import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';

import Editor from './Editor';
import Markdown from './Markdown';
import Shortcodes from './Shortcodes';

const styleSheet = createStyleSheet('MarkdownEditor', theme => ({
  root: {
    flexGrow: 1,
    // marginTop: 30,
  },
  container: {
    height: '85vh',
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
}));

class MarkdownEditor extends Component {
  state = { text: 'Ohl stinkt', caretPosition: 0 };

  onEdit = (text, caretPosition) => {
    this.setState({ text, caretPosition });
  };

  onCaretPosition = caretPosition => {
    this.setState({ caretPosition });
  };

  onShortcode = shortcodeText => {
    console.log(shortcodeText)
    const { text, caretPosition } = this.state;
    const newText =
      text.slice(0, caretPosition) +
      shortcodeText +
      text.slice(caretPosition, text.length);
    this.setState({ text: newText });
  };

  render() {
    const { classes } = this.props;
    const { text, caretPosition } = this.state;

    return (
      <div className={classes.root}>
        <Grid container gutter={8}>
          <Grid item xs={12}>
            <Shortcodes onShortcode={this.onShortcode} />
          </Grid>
        </Grid>
        <Grid className={classes.container} container gutter={8}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography type="subheading" gutterBottom>
                Markdown
              </Typography>
              <Divider />
              <Editor
                text={text}
                onCaretPosition={this.onCaretPosition}
                onEdit={this.onEdit}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography type="subheading" gutterBottom>
                Preview
              </Typography>
              <Divider />
              <Markdown text={this.state.text} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(MarkdownEditor);
