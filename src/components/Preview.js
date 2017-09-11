import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import marked from 'marked';
// import shortcodes from '../util/shortcodes';
import Amp from './Amp';
import theme from 'nausika-theme';
import config from '../config.json';

const styleSheet = {
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
  },
};

class Preview extends PureComponent {
  setScrollPostition = pos => {
    console.log('set scroll of iframe');
    this.iframe.contentWindow.scrollTo(0, pos);
  };

  render() {
    const { text, frontmatter, classes } = this.props;
    // const { text, usedShortcodes } = shortcodes(this.props.text);
    // console.log(usedShortcodes);
    console.log(config, frontmatter);
    let rendered;
    try {
      rendered = theme(text, frontmatter, config);
      console.log(rendered);
    } catch (error) {
      rendered = error;
    }
    return (
      <iframe
        className={classes.iframe}
        title="ampdoc"
        ref={iframe => (this.iframe = iframe)}
        onLoad={() => this.setScrollPostition(1000)}
        srcdoc={rendered}
      />
    );
    // return <Amp html={rendered} />;
  }
}

Preview.propTypes = {
  text: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(Preview);
