import React from 'react';
import PropTypes from 'prop-types';
import { oneLine } from 'common-tags';

import AmpComponent from '../AmpComponent';
import Analytics from './Analytics';
import SvgSpritemap from './SvgSpritemap';
import Header from './Header';
import Sharebuttons from './Sharebuttons';
import Menu from './Menu';
import Footer from './Footer';
import CoverBox from './CoverBox';

const AmpImg = AmpComponent('amp-img');

const Publication = ({
  children,
  config,
  frontmatter: {
    date,
    collection,
    attribution,
    author,
    picture,
    alt,
    headline,
    subline,
    lightbox,
  },
}) => [
  <Analytics />,
  <SvgSpritemap />,
  <Header />,
  <main id="main" role="main">
    <figure>
      <AmpImg
        width={4}
        height={3}
        src={`/${config.media}/${config.images.small.prefix}${picture}`}
        srcset={oneLine`/${config.media}/${config.images.large
          .prefix}${picture} ${config.images.large.size},
                  /${config.media}/${config.images.medium
          .prefix}${picture} ${config.images.medium.size},
                  /${config.media}/${config.images.small
          .prefix}${picture} ${config.images.small.size}`}
        alt={alt}
        attribution={attribution}
        layout="responsive"
      />
      <figcaption className="article-caption">
        {attribution}
      </figcaption>
    </figure>
    <CoverBox
      config={config}
      category={collection}
      author={author}
      alt={alt}
      attribution={attribution}
      headline={headline}
      subline={subline}
      date={date}
    />
    <Sharebuttons />
    <div className="ad--container">
      <amp-ad
        width={300}
        height={250}
        type="doubleclick"
        data-slot="/35289663/nausika.de_(Code)"
      />
    </div>
    <article>
      {children}
    </article>
    <Sharebuttons />
  </main>,
  <aside />,
  <Footer config={config} />,
  lightbox ? <amp-image-lightbox id="lightbox1" layout="nodisplay" /> : null,
  <Menu />,
];

Publication.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Publication;
