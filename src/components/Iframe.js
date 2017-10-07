import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  container: {
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
    background: 'white',
  },
};

class Iframe extends Component {
  renderTimeout = null;

  componentDidMount() {
    this.updateIframe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.html !== this.props.html) {
      this.updateIframe();
    }
  }
  createIframe = () => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('class', this.props.classes.iframe);
    iframe.setAttribute('title', 'preview');
    return iframe;
  };

  updateIframe = () => {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }

    this.renderTimeout = setTimeout(() => {
      this.container.innerHTML = '';
      const iframe = this.createIframe();
      this.container.appendChild(iframe);

      const iframeDocument = iframe.contentDocument;
      iframeDocument.open();
      iframeDocument.write('');
      iframeDocument.write(this.props.html);
      iframeDocument.close();
    }, this.props.renderDelay);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container} ref={ref => (this.container = ref)} />
    );
  }
}

Iframe.defaultProps = {
  renderDelay: 750,
};

Iframe.propTypes = {
  html: PropTypes.string.isRequired,
  renderDelay: PropTypes.number.isRequired,
};
export default withStyles(styleSheet)(Iframe);
