import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import addSizeSuffix from '../../util/addSizeSuffix';

const storageurl = process.env.REACT_APP_FIREBASE_STORAGE_URL;
const storagesuffix = process.env.REACT_APP_FIREBASE_STORAGE_SUFFIX;

const styleSheet = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
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
  media: {
    height: 200,
  },
});

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  wasSelected = () => {
    return this.state.selected;
  };

  registerSelection = key => {
    this.setState({ selected: true });
    this.props.addSelection(key);
  };

  render() {
    const { classes, reference, image } = this.props;
    const selected = this.wasSelected();
    //TODO: Add class upon click for visual feedback

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardMedia
              className={classes.media}
              image={
                storageurl + addSizeSuffix(image.name, '-s') + storagesuffix
              }
            />
            <CardContent>
              <Typography type="headline" component="h2">
                {image.name}
              </Typography>
              <Typography component="p">
                {image.caption}
              </Typography>
              <Typography component="p">
                {image.attribution}
              </Typography>
              <Typography component="p">
                {image.alt}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                dense
                color="primary"
                disabled={selected}
                onClick={() => this.registerSelection(reference)}
              >
                Add
              </Button>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

ImageCard.defaultProps = {};

ImageCard.propTypes = {};

export default withStyles(styleSheet)(ImageCard);
