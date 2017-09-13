import React from 'react';
import addSizeSuffix from '../../addSizeSuffix';
export default ({
  config,
  path,
  frontmatter: { title, description, layout, picture },
}) => {
  const always = [
    <meta name="twitter:site" content={'@' + config.vanityurl} />,
    <meta name="twitter:title" content={title} />,
    <meta property="og:title" content={title} />,
    <meta property="og:locale" content="de_DE" />,
    <meta property="og:site_name" content={config.organization.name} />,
  ];

  switch (layout) {
    case 'publication':
      return [
        [
          <meta name="twitter:card" content="summary_large_image" />,
          <meta name="twitter:description" content={description} />,
          <meta
            name="twitter:image"
            content={`${config.media}${addSizeSuffix(
              picture,
              config.images.large.suffix
            )}${config.mediasuffix}`}
          />,
        ],
        [
          <meta property="og:description" content={description} />,
          <meta property="og:type" content="article" />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}/${path}/`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${addSizeSuffix(
              picture,
              config.images.large.suffix
            )}${config.mediasuffix}`}
          />,
        ],
        always,
      ];
    case 'category':
      return [
        [
          <meta name="twitter:card" content="summary" />,
          <meta
            name="twitter:image"
            content={`${config.media}${config.organization.logo
              .path}${config.mediasuffix}`}
          />,
          <meta
            name="twitter:description"
            content={config.organization.altname}
          />,
        ],
        [
          <meta
            property="og:description"
            content={config.organization.altname}
          />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}/${path}/`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${config.organization.logo
              .path}${config.mediasuffix}`}
          />,
        ],
        always,
      ];
    case 'start':
      return [
        [
          <meta name="twitter:card" content="summary" />,
          <meta
            name="twitter:image"
            content={`${config.media}${config.organization.logo
              .path}${config.mediasuffix}`}
          />,
          <meta
            name="twitter:description"
            content={config.organization.altname}
          />,
        ],
        [
          <meta
            property="og:description"
            content={config.organization.altname}
          />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${config.organization.logo
              .path}${config.mediasuffix}`}
          />,
        ],
        always,
      ];
    case 'basic':
      return [
        [
          <meta name="twitter:card" content="summary" />,
          <meta
            name="twitter:image"
            content={`${config.media}${config.organization.logo
              .path}${config.mediasuffix}`}
          />,
          <meta
            name="twitter:description"
            content={config.organization.altname}
          />,
        ],
        [
          <meta
            property="og:description"
            content={config.organization.altname}
          />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}/${path}/`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${config.organization.logo
              .path}${config.mediasuffix}`}
          />,
        ],
        always,
      ];
    default:
  }
};
