import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Ampdoc from './Ampdoc';
import { Helmet } from 'react-helmet';

// TODO: style must be universal (and injected from outside) for frontend useage
const styles = 'amp-carousel amp-img > img { object-fit: contain; }';

class Amp extends PureComponent {
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

  attachAmpDoc = html => {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }

    this.renderTimeout = setTimeout(() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(Ampdoc(html, styles), 'text/html');

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
    return [
      <Helmet>
        <script async="" src="https://cdn.ampproject.org/shadow-v0.js" />
      </Helmet>,
      <div className="amp-container" ref={ref => (this.container = ref)} />,
    ];
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
