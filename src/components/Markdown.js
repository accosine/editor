import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

class Markdown extends Component {
  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: marked(this.props.text),
        }}
      />
    );
  }
}

Markdown.propTypes = {
  text: PropTypes.string,
};

export default Markdown;
