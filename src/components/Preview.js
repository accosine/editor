import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import shortcodes from '../util/shortcodes';
import Amp from './Amp';

class Preview extends Component {
  render() {
    return <Amp html={shortcodes(marked(this.props.text))} />;
  }
}

Preview.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Preview;
