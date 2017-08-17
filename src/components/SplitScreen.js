import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import classnames from 'classnames';
import Editor from './Editor';
import Button from 'material-ui/Button';
import SaveIcon from 'material-ui-icons/Save';
import { CircularProgress } from 'material-ui/Progress';
import Preview from './Preview';
import Shortcodes from './Shortcodes';
import Img from './Img';
import FrontMatter from './FrontMatter';
import green from 'material-ui/colors/green';

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
    width: '98%',
    margin: '0 auto',
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
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  saveButtonWrapper: {
    position: 'relative',
  },
  saveButton: {
    position: 'absolute',
  },
  progress: {
    top: -2,
    left: -2,
    position: 'absolute',
    color: green[500],
  },
  saveButtonContainer: {
    margin: 3 * theme.spacing.unit,
    position: 'fixed',
    bottom: 50,
    right: 50,
  },
});

class SplitScreen extends Component {
  constructor(props) {
    super(props);

    if (props.match.params.slug) {
      console.log('with slug', props.match.params.slug);
      this.props.CONNECT(
        `articles/${props.match.params.slug}`,
        this.props.DATABASE,
        this.props.REFS,
        this.props.ACTIONS
      );
    }
    this.state = {
      isSaving: false,
      content: '',
      caretPosition: { start: 0, end: 0 },
      frontmatterExpanded: props.match.params.slug ? false : true,
      title: '',
      author: '',
      description: '',
      collection: '',
      headline: '',
      subline: '',
      layout: '',
      type: '',
      picture: '',
      attribution: '',
      alt: '',
      slug: '',
    };
  }

  componentDidMount() {
    if (this.props.match.params.slug) {
      this.props.REFS[
        `articles/${this.props.match.params.slug}`
      ].on('value', snapshot =>
        this.setState({
          ...snapshot.val(),
        })
      );
    }
  }

  onEdit = (text, caretPosition) => {
    this.setState({ content: text, caretPosition });
  };

  onCaretPosition = caretPosition => {
    this.setState({ caretPosition });
  };

  onFrontmatterExpand = () => {
    this.setState({ frontmatterExpanded: !this.state.frontmatterExpanded });
  };

  onSave = () => {
    const {
      caretPosition,
      frontmatterExpanded,
      isSaving,
      ...article
    } = this.state;
    this.setState(
      {
        isSaving: true,
      },
      () => {
        this.props.REFS[`articles/${this.props.match.params.slug}`]
          .set(article)
          .then(() => this.setState({ isSaving: false }));
      }
    );
  };

  onShortcode = shortcodeText => {
    // Get caret position, slice text till caret position, add shortcode in
    // between, append the rest of the slice and set state to new text.
    const { content, caretPosition } = this.state;
    const newText =
      content.slice(0, caretPosition.start) +
      shortcodeText +
      content.slice(caretPosition.end, content.length);
    this.setState({ content: newText });
  };

  render() {
    const { classes, ...rest } = this.props;
    const {
      frontmatterExpanded,
      isSaving,
      content,
      title,
      author,
      description,
      collection,
      headline,
      subline,
      layout,
      type,
      picture,
      attribution,
      alt,
      slug,
    } = this.state;

    return (
      <div className={classes.root}>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: frontmatterExpanded,
          })}
          onClick={this.onFrontmatterExpand}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={frontmatterExpanded} transitionDuration="auto">
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Typography type="headline" gutterBottom>
                Frontmatter
              </Typography>
              <FrontMatter
                title={title}
                author={author}
                description={description}
                collection={collection}
                headline={headline}
                subline={subline}
                layout={layout}
                type={type}
                picture={picture}
                attribution={attribution}
                alt={alt}
                slug={slug}
                onChange={change => this.setState(change)}
              />
            </Grid>
          </Grid>
        </Collapse>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Shortcodes onShortcode={this.onShortcode}>
              <Img onShortcode={this.onShortcode} {...rest} />
            </Shortcodes>
          </Grid>
        </Grid>
        <Grid className={classes.container} container spacing={8}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography type="subheading" gutterBottom>
                Markdown
              </Typography>
              <Divider />
              <Editor
                text={content}
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
              <Preview text={content} />
            </Paper>
          </Grid>
        </Grid>

        <div className={classes.saveButtonContainer}>
          <div className={classes.saveButtonWrapper}>
            <Button
              onClick={this.onSave}
              disabled={isSaving}
              fab
              color="accent"
              className={classes.saveButton}
            >
              <SaveIcon />
            </Button>
            {isSaving &&
              <CircularProgress size={60} className={classes.progress} />}
          </div>
        </div>
      </div>
    );
  }
}

SplitScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SplitScreen);
