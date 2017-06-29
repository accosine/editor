import React from 'react';
import PropTypes from 'prop-types';
import Youtube from './Youtube';
import Soundcloud from './Soundcloud';
import Vimeo from './Vimeo';
import Instagram from './Instagram';
import Gfycat from './Gfycat';
import FitText from './FitText';

// import Facebook from './Facebook';
// import FacebookComments from './FacebookComments';
// import FacebookLike from './FacebookLike';
// import Pinterest from './Pinterest';
// import Twitter from './Twitter';
// import Playbuzz from './Playbuzz';

// import Accordion from './Accordion';
// import AppBanner from './AppBanner';
// import Carousel from './Carousel';
// import Iframe from './Iframe';
// import Lightbox from './Lightbox';
// import Img from './Img';
// import ImageLightbox from './ImageLightbox';

const Shortcodes = props => {
  const { onShortcode } = props;
  return (
    <div>
      <Youtube onShortcode={onShortcode} />
      <Soundcloud onShortcode={onShortcode} />
      <Vimeo onShortcode={onShortcode} />
      <Instagram onShortcode={onShortcode} />
      <Gfycat onShortcode={onShortcode} />
      <FitText onShortcode={onShortcode} />
      {/*
      <FacebookComments onShortcode={onShortcode} />
      */}
      {/*
      <Facebook onShortcode={onShortcode} />
      */}
      {/*
      <FacebookLike onShortcode={onShortcode} />
      */}
      {/*
      <Pinterest onShortcode={onShortcode} />
      */}
      {/*
      <Playbuzz onShortcode={onShortcode} />
      */}
      {/*
      <Twitter onShortcode={onShortcode} />
      */}
      {/*
      <Accordion onShortcode={onShortcode} />
      */}
      {/*
      <AppBanner onShortcode={onShortcode} />
      */}
      {/*
      <Carousel onShortcode={onShortcode} />
      */}
      {/*
      <Iframe onShortcode={onShortcode} />
      */}
      {/*
      <Lightbox onShortcode={onShortcode} />
      */}
      {/*
      <Img onShortcode={onShortcode} />
      */}
      {/*
      <ImageLightbox onShortcode={onShortcode} />
      */}
    </div>
  );
};

Shortcodes.propTypes = {
  onShortcode: PropTypes.func.isRequired,
};

export default Shortcodes;
