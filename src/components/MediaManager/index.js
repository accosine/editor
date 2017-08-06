import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ImageCard from './ImageCard';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('MediaManager', theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    padding: theme.spacing.unit * 1,
  },
  card: {
    display: 'flex',
    width: '30vw',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '75%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
  },
  headline: {
    textOverflow: 'ellipsis',
  },
}));

class MediaManager extends Component {
  constructor(props) {
    super(props);

    this.props.CONNECT(
      'images',
      this.props.DATABASE,
      this.props.REFS,
      this.props.ACTIONS
    );
    this.state = {
      images: {},
      selected: [],
    };
  }

  componentDidMount() {
    // Add database change listener for each reference in the refs object
    console.log(this.props);
    this.props.REFS['images'].on('value', snapshot => {
      this.setState({ images: snapshot.val() || {} });
    });
  }

  componentWillUnmount() {
    // Remove all database change listeners
    this.props.REFS['images'].off();
  }

  addSelection = key => {
    console.log(key);
    this.setState({ selected: this.state.selected.concat([key]) });
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
      <div className={classes.container}>
        {Object.keys(this.state.images).length
            ? Object.keys(this.state.images).map((key, index) =>
              <div>
              <ImageCard addSelection={this.addSelection} image={this.state.images[key]} reference={key} {...rest} />
              </div>
            )
          : 'No images uploaded yet.'}
      </div>
    );
  }
}

MediaManager.defaultProps = {
  user: { avatar: '' },
};

MediaManager.propTypes = {};

export default withStyles(styleSheet)(MediaManager);
