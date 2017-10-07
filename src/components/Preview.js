import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FixedButton from './FixedButton';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import FullscreenExitIcon from 'material-ui-icons/FullscreenExit';
import theme from 'nausika-theme';
import config from '../config.js';

import DevicePreview from './DevicePreview';
import Iframe from './Iframe';

// config.media = process.env.REACT_APP_FIREBASE_STORAGE_URL;
// config.mediasuffix = process.env.REACT_APP_FIREBASE_STORAGE_SUFFIX;

const styleSheet = {
  container: {
    width: '100%',
    height: '90%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
    background: 'white',
  },
};

class Preview extends PureComponent {
  state = {
    fullscreen: false,
  };

  render() {
    const { text, frontmatter, classes } = this.props;
    const { fullscreen } = this.state;
    let rendered;
    try {
      rendered = theme(text, frontmatter, config);
    } catch (error) {
      rendered = error;
    }
    return [
      <div key="1" className={classes.container}>
        {fullscreen ? (
          <FixedButton
            position="left"
            onClick={() => this.setState({ fullscreen: false })}
          >
            <FullscreenExitIcon />
          </FixedButton>
        ) : (
          [
            <Iframe key="1" html={rendered} />,
            <FixedButton
              key="2"
              position="left"
              onClick={() => this.setState({ fullscreen: true })}
            >
              <FullscreenIcon />
            </FixedButton>,
          ]
        )}
      </div>,
      fullscreen ? (
        <Dialog
          key="2"
          fullScreen
          open
          onRequestClose={() => this.setState({ fullscreen: false })}
          transition={<Slide direction="up" />}
        >
          <DevicePreview onClose={() => this.setState({ fullscreen: false })}>
            <iframe
              className={classes.iframe}
              title="ampdoc"
              srcDoc={rendered}
            />
          </DevicePreview>
        </Dialog>
      ) : null,
    ];
  }
}

Preview.propTypes = {
  text: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(Preview);
