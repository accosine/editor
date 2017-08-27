import React from 'react';
import moment from 'moment';

import RecklesslySetInnerHTML from '../../util/RecklesslySetInnerHTML';

import HeadPagination from './HeadPagination';
import SocialmediaMeta from './SocialmediaMeta';
import Schema from './Schema';
import SchemaSitename from './SchemaSitename';
import Font from './Font';
import StylesAmp from './StylesAmp';
import StylesCustom from './StylesCustom';
import ExtendedComponents from './ExtendedComponents';
import Favicons from './Favicons';
import AmpScript from '../AmpScript';

const formatDate = (date, format, locale) =>
  moment(date).locale(locale).format(format);

// TODO: stop using dangerouslySetInnerHTML when React 16 supports custom HTML
// attributes (amp-custom, amp-boilerplate, custom-element, ...
export default ({
  frontmatter: {
    title,
    date,
    collection,
    attribution,
    author,
    picture,
    alt,
    headline,
    subline,
    layout,
    lightbox,
  },
  styles,
  body,
  config,
  path,
  description,
  usedShortcodes,
}) =>
  <RecklesslySetInnerHTML Element="head">
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <title>{title}</title>
    {layout === 'start'
      ? <link rel="canonical" href={`${config.protocol}://${config.domain}`} />
      : null}{' '}
    {layout === 'publication'
      ? <link
          rel="canonical"
          href={`${config.protocol}://${config.domain}/${path}/`}
        />
      : null}
    {layout === 'category'
      ? <link
          rel="canonical"
          href={`${config.protocol}://${config.domain}/${path}/`}
        />
      : null}
    {layout === 'category' ? <HeadPagination /> : null}
    {layout === 'basic'
      ? <link
          rel="canonical"
          href={`${config.protocol}://${config.domain}/${path}/`}
        />
      : null}
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0"
    />
    <meta name="author" content={config.organization.name} />
    <meta name="copyright" content={config.organization.name} />
    <meta name="email" content={config.organization.email} />
    <meta name="date" content={formatDate(date, 'YYYY-MM-DD', 'de')} />
    <meta name="last-modified" content={formatDate(date, 'YYYY-MM-DD', 'de')} />
    <meta name="description" content={description} />
    <SocialmediaMeta
      path={path}
      config={config}
      frontmatter={{ picture, layout }}
    />
    <Schema />
    <SchemaSitename config={config} />
    <Font />
    <ExtendedComponents />
    <Favicons />
    <meta property="fb:pages" content={config.fbpageid} />
    <AmpScript name="analytics" />
    {'<script async src="https://cdn.ampproject.org/v0.js"></script>'}
    <AmpScript name="ad" />
    {usedShortcodes.map((name, index) => <AmpScript key={index} name={name} />)}
    <StylesAmp />
    <StylesCustom styles={styles} />
  </RecklesslySetInnerHTML>;
