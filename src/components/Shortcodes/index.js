import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Youtube from './Youtube';
import Soundcloud from './Soundcloud';

const styleSheet = createStyleSheet('Shortcodes', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

const Shortcodes = (props) => {
  const { onShortcode, classes } = props;
  return (
    <div>
      <Youtube onShortcode={onShortcode} />
      <Soundcloud onShortcode={onShortcode} />
    </div>
  );
}

Shortcodes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Shortcodes);
