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
  ampReadyPromise = new Promise(resolve => {
    (window.AMP = window.AMP || []).push(resolve);
  });

  componentDidMount() {
    this.attachAmpDoc(this.props.html);
  }

  componentWillReceiveProps(nextProps) {
    // this.closeAmpDoc();
    this.attachAmpDoc(nextProps.html);
  }

  componentWillUnmount() {
    this.closeAmpDoc();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.html !== this.props.html;
  // }

  attachAmpDoc = html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(ampDoc(html), 'text/html');
    console.log(doc);

    // const oldShadowRoot = this.shadowRoot;
    // this.shadowRoot = document.createElement('div');
    // if (oldShadowRoot) {
    //   this.container.replaceChild(this.shadowRoot, oldShadowRoot);
    // } else {
    //   this.container.appendChild(this.shadowRoot);
    // }
    // this.ampedDoc = this.shadowRoot.createShadowRoot();
    // console.log(this.ampedDoc)
    // this.ampedDoc.textcontent = html;
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
      console.log(this.ampedDoc);
      const prom = this.ampedDoc.ampdoc.whenReady();
      const bla = () => {
        document.getElementById('give').blur();
        setTimeout(function(){
          const ff = document.getElementById('give');
          ff.focus();
          console.log(ff);
        }, 100);
      }
      prom.then(bla())
    });
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

export default Amp;
