import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import Amp from './Amp';

class Preview extends Component {
  render() {
    return <Amp html={marked(this.props.text)} />;
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
