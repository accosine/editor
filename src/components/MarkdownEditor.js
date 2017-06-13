import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Divider from "material-ui/Divider";
import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import classnames from "classnames";
import Editor from "./Editor";
import Preview from "./Preview";
import Shortcodes from "./Shortcodes";

const styleSheet = createStyleSheet("MarkdownEditor", theme => ({
  root: {
    flexGrow: 1,
    width: "98%",
    margin: "0 auto"
    // marginTop: 30,
  },
  container: {
    height: "85vh"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

class MarkdownEditor extends Component {
  state = {
    text: "Ohl stinkt",
    caretPosition: { start: 0, end: 0 },
    frontmatterExpanded: false
  };

  onEdit = (text, caretPosition) => {
    this.setState({ text, caretPosition });
  };

  onCaretPosition = caretPosition => {
    this.setState({ caretPosition });
  };

  onFrontmatterExpand = () => {
    this.setState({ frontmatterExpanded: !this.state.frontmatterExpanded });
  };

  onShortcode = shortcodeText => {
    // Get caret position, slice text till caret position, add shortcode in
    // between, append the rest of the slice and set state to new text.
    const { text, caretPosition } = this.state;
    const newText = text.slice(0, caretPosition.start) +
      shortcodeText +
      text.slice(caretPosition.end, text.length);
    this.setState({ text: newText });
  };

  render() {
    const { classes } = this.props;
    const { text, frontmatterExpanded } = this.state;

    return (
      <div className={classes.root}>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: frontmatterExpanded
          })}
          onClick={this.onFrontmatterExpand}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={frontmatterExpanded} transitionDuration="auto">
          <Grid container gutter={8}>
            <Grid item xs={12}>
              <Typography type="headline" gutterBottom>
                Frontmatter
              </Typography>
            </Grid>
          </Grid>
        </Collapse>
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
              <Preview text={this.state.text} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MarkdownEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(MarkdownEditor);
