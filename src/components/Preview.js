import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import shortcodes from '../util/shortcodes';
import Amp from './Amp';

class Preview extends PureComponent {
  render() {
    const { text, usedShortcodes } = shortcodes(this.props.text);
    console.log(usedShortcodes);
    return <Amp html={marked(text)} />;
  }
}

Preview.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Preview;
