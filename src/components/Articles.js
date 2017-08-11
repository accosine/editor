import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('Articles', {
  demo: {
    flexDirection: 'column',
  },
  articlecard: {
    width: '50vw',
  },
});

class Articles extends Component {
  constructor(props) {
    super(props);

    this.props.CONNECT(
      'articles',
      this.props.DATABASE,
      this.props.REFS,
      this.props.ACTIONS
    );
    this.state = { articles: '' };
  }

  componentDidMount() {
    // Add database change listener for each reference in the refs object
    console.log(this.props);
    this.props.REFS['articles'].on('value', snapshot => {
      this.setState({ articles: snapshot.val() });
    });
  }

  componentWillUnmount() {
    // Remove all database change listeners
    this.props.REFS['articles'].off();
  }

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Grid container className={classes.root}>
          <h2>Articles</h2>
          <Grid item xs={12}>
            <Grid
              align={'center'}
              container
              className={classes.demo}
              direction={'column'}
              justify={'center'}
              spacing={16}
            >
              {Object.keys(this.state.articles).map((key, index) =>
                <Paper
                  key={index}
                  className={classes.articlecard}
                  elevation={4}
                >
                  {index} {key}
                  {this.state.articles[key].slug}:{this.state.articles[key].title}
                </Paper>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Articles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Articles);
