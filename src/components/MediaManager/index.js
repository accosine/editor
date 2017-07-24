import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const storageurl = process.env.REACT_APP_FIREBASE_STORAGE_URL;
const storagesuffix = process.env.REACT_APP_FIREBASE_STORAGE_SUFFIX;

const styleSheet = createStyleSheet('MediaManager', {
  demo: {
    flexDirection: 'column',
  },
  articlecard: {
    width: '50vw',
  },
});

class MediaManager extends Component {
  constructor(props) {
    super(props);

    this.props.CONNECT(
      'images',
      this.props.DATABASE,
      this.props.REFS,
      this.props.ACTIONS
    );
    this.state = { images: '' };
  }

  componentDidMount() {
    // Add database change listener for each reference in the refs object
    console.log(this.props);
    this.props.REFS['images'].on('value', snapshot => {
      this.setState({ images: snapshot.val() });
    });
  }

  componentWillUnmount() {
    // Remove all database change listeners
    this.props.REFS['images'].off();
  }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Grid container className={classes.root}>
          <h2>Images</h2>
          <Grid item xs={12}>
            <Grid
              align={'center'}
              container
              className={classes.demo}
              direction={'column'}
              justify={'center'}
              gutter={16}
            >
              {Object.keys(this.state.images).map((key, index) =>
                <Paper
                  key={index}
                  className={classes.articlecard}
                  elevation={4}
                >
                  {index} {key}
                  <img
                    src={
                      storageurl + this.state.images[key].name + storagesuffix
                    }
                  />
                  <span>{this.state.images[key].attribution}</span>
                  <span>{this.state.images[key].caption}</span>
                  <span>{this.state.images[key].alt}</span>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MediaManager.defaultProps = {
  user: { avatar: '' },
};

MediaManager.propTypes = {};

export default withStyles(styleSheet)(MediaManager);
