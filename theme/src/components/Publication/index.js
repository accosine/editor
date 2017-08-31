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
import AdContainer from '../AdContainer';

const AmpImg = AmpComponent('amp-img');

const Publication = ({
  children,
  styletron,
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
    slug,
    title,
    category,
  },
}) => [
  <Analytics accountId={config.googleanalytics} />,
  <SvgSpritemap styletron={styletron} />,
  <Header styletron={styletron} />,
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
    <Sharebuttons
      slug={slug}
      title={title}
      category={collection}
      config={config}
    />
    <AdContainer adnetwork={config.ads.adnetwork} adslot={config.ads.adslot} />
    <article>
      {children}
    </article>
    <Sharebuttons
      slug={slug}
      title={title}
      category={collection}
      config={config}
    />
  </main>,
  <aside />,
  <Footer config={config} />,
  lightbox ? <amp-image-lightbox id="lightbox1" layout="nodisplay" /> : null,
  <Menu config={config} />,
];

Publication.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Publication;
