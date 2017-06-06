import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import shortcodes from '../util/shortcodes';
import Amp from './Amp';

class Preview extends Component {
  render() {
    const { editorRef } = this.props;
    return <Amp editorRef={editorRef} html={shortcodes(marked(this.props.text))} />;
  }
}
// <div
//   dangerouslySetInnerHTML={{
//     __html: marked(this.props.text),
//   }}
// />

Preview.propTypes = {
  text: PropTypes.string,
};

export default Preview;
