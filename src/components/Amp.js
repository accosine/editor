import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ampDoc = (articleText, styles) => `
<!doctype html>
<html amp lang="en">
  <head>
      <meta charset="utf-8">
      <title>Hello, AMPs</title>
      <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    </script>
      <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
      <style>
        ${styles}
      </style>
      <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
      <script async custom-element="amp-soundcloud" src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"></script>
    </head>
    <body>
      ${articleText}
    </body>
  </html>
`;

class Amp extends Component {
  ampedDoc = null;
  container = null;
  shadowRoot = null;
  renderTimeout = null;
  ampReadyPromise = new Promise(resolve => {
    (window.AMP = window.AMP || []).push(resolve);
  });

  componentDidMount() {
    this.attachAmpDoc(this.props.html);
  }

  componentDidUpdate(prevProps, prevState) {
    this.attachAmpDoc(this.props.html);
  }

  componentWillUnmount() {
    this.closeAmpDoc();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldUpdate', nextProps.html !== this.props.html);
    return nextProps.html !== this.props.html;
  }

  attachAmpDoc = html => {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }

    this.renderTimeout = setTimeout(() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(ampDoc(html), 'text/html');

      this.ampReadyPromise.then(amp => {
        // Replace the old shadow root with a new div element.
        const oldShadowRoot = this.shadowRoot;
        this.shadowRoot = document.createElement('div');
        if (oldShadowRoot) {
          this.container.replaceChild(this.shadowRoot, oldShadowRoot);
        } else {
          this.container.appendChild(this.shadowRoot);
        }
        this.ampedDoc = amp.attachShadowDoc(this.shadowRoot, doc, 'asdf');
        // reset focus to the previously focused element
        this.ampedDoc.ampdoc.whenReady().then(() => {
          const activeElement = document.activeElement;
          activeElement.blur();
          activeElement.focus();
        });
      });
    }, this.props.renderDelay);
  };

  closeAmpDoc = () => {
    if (typeof this.ampedDoc.close === 'function') {
      this.ampedDoc.close();
    }
  };

  render() {
    return (
      <div className="amp-container" ref={ref => (this.container = ref)} />
    );
  }
}

Amp.defaultProps = {
  renderDelay: 750,
};

Amp.propTypes = {
  html: PropTypes.string.isRequired,
  renderDelay: PropTypes.number.isRequired,
};

export default Amp;
