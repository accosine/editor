import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('Shortcodes', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

const Shortcodes = (props) => {
  const { onShortcode, classes } = props;
  return (
    <div>
      <Button
        raised
        onClick={onShortcode.bind(null, '💩')}
        className={classes.button}
      >
        YouTube
      </Button>
      <Button
        raised
        onClick={()=>{if(window.AMP){document.getElementById('give').focus()}}}
        className={classes.button}>Vimeo</Button>
      <Button raised className={classes.button}>Soundcloud</Button>
      <Button raised className={classes.button}>Instagram</Button>
      <Button raised className={classes.button}>Twitter</Button>
    </div>
  );
}

Shortcodes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Shortcodes);
