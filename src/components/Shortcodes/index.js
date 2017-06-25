import React from 'react';
import PropTypes from 'prop-types';
import Youtube from './Youtube';
import Soundcloud from './Soundcloud';
import Vimeo from './Vimeo';
import Instagram from './Instagram';

const Shortcodes = props => {
  const { onShortcode } = props;
  return (
    <div>
      <Youtube onShortcode={onShortcode} />
      <Soundcloud onShortcode={onShortcode} />
      <Vimeo onShortcode={onShortcode} />
      <Instagram onShortcode={onShortcode} />
    </div>
  );
};

Shortcodes.propTypes = {
  onShortcode: PropTypes.func.isRequired,
};

export default Shortcodes;
