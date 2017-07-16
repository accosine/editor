import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Input from 'material-ui/Input';

const styleSheet = createStyleSheet('FilePreview', theme => ({
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

class FilePreview extends Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.readAsDataURL(this.props.file);
    this.reader.onload = event => {
      this.setState({ loaded: true });
    };
  }

  render() {
    const { classes, file } = this.props;
    const { loaded } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.headline} type="headline">
                {file.name}
              </Typography>
              <Input placeholder="Name" className={classes.input} />
              <Input placeholder="Tags" className={classes.input} />
            </CardContent>
          </div>
          <div className={classes.cover}>
            {loaded
              ? <img className={classes.image} src={this.reader.result} />
              : <CircularProgress />}
          </div>
        </Card>
      </div>
    );
  }
}

FilePreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FilePreview);
