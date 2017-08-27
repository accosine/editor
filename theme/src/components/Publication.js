import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { styled } from 'styletron-react';
import { oneLine } from 'common-tags';

import withTheme from '../util/withTheme';

import Analytics from './Analytics';
import SvgSpritemap from './SvgSpritemap';
import Header from './Header';
import Sharebuttons from './Sharebuttons';
import Menu from './Menu';
import Footer from './Footer';

const formatDate = (date, format, locale) =>
  moment(date).locale(locale).format(format);

const CoverBox = styled('div', {
  margin: '0 auto',
  padding: '10px',
  width: '87vw',
  position: 'relative',
  top: '-15vw',
  background: 'white',
  lineHeight: 1,
  '@media screen and (min-width: 1024px)': {
    top: 0,
    width: 'inherit',
  },
});

const AmpComponent = Element => ({ className, ...props }) =>
  <Element class={className} {...props} />;

const AmpImg = AmpComponent('amp-img');

const ArticleCover = styled(AmpImg, {});

const CoverBoxAuthorPicture = withTheme(
  styled(AmpImg, ({ theme }) => ({
    boxShadow: `0px 2px 7px 0px ${theme.mausgrau}`,
    borderRadius: '100%',
  }))
);

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
      <ArticleCover
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
    {/* <div className="cover-box"> */}
    <CoverBox>
      <p
        className={`cover-box--breadcrumbs cover-box--breadcrumbs--${collection.toLowerCase()}`}
      >
        <a href="/">Start</a>
        {' > '}
        <a href={`/${config.categories[collection]}/`}>
          {collection}
        </a>
      </p>
      <time
        className="published-date"
        dateTime={formatDate(date, 'YYYY-MM-DD', 'en')}
      >
        {formatDate(date, 'DD. MMMM YYYY', 'de')}
      </time>
      <h1 className="cover-box--article-headline">
        {headline}
      </h1>
      <h2 className="cover-box--article-subline">
        {subline}
      </h2>
      <div className="cover-box--author">
        <CoverBoxAuthorPicture
          width={4}
          height={4}
          src={`/${config.assets}/${config.authors[author].avatar}`}
          alt={alt}
          attribution={attribution}
          layout="responsive"
        />
      </div>
      <span className="cover-box--author-name">
        {config.authors[author].name}
      </span>
    </CoverBox>
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
  <Footer />,
  lightbox ? <amp-image-lightbox id="lightbox1" layout="nodisplay" /> : null,
  <Menu />,
];

Publication.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Publication;
