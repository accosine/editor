import React, { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider, styled } from 'styletron-react';
import matter from 'gray-matter';
import marksy from 'marksy';
import shortcodes from './shortcodes';

// import { DOMProperty } from 'react-dom/lib/ReactInjection'
// import { properties as DOMProperties } from 'react-dom/lib/DOMProperty'

// By default React limit the set of valid DOM elements and attributes
// (https://github.com/facebook/react/issues/140) this config whitelist
// Amp elements/attributes
// if (typeof DOMProperties.amp === 'undefined') {
//   DOMProperty.injectDOMPropertyConfig({
//     // Properties: { amp: DOMProperty.MUST_USE_ATTRIBUTE },
//     isCustomAttribute: attributeName => attributeName.startsWith('amp-'),
//   });
// }

import config from './config';
import Head from './components/Head';
import Publication from './components/Publication';

const H1 = styled('h1', {
  color: 'lightblue',
  fontSize: '20px',
});

const compile = marksy({
  createElement,
  elements: {
    h1({ id, children }) {
      return (
        <H1>
          {children}
        </H1>
      );
    },
  },
});

const { data: frontmatter, content } = matter.read('./test.md');

const Layout = ({ styles, body, frontmatter }) => [
  <Head
    path={`${frontmatter.category}/${frontmatter.slug}`}
    frontmatter={frontmatter}
    config={config}
    styles={styles}
  />,
  <body dangerouslySetInnerHTML={{ __html: body }} />,
];

function render(article, frontmatter) {
  const styletron = new Styletron();
  const { text } = shortcodes(article, styletron);
  const { tree } = compile(text);

  const appMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <Publication frontmatter={frontmatter} config={config}>
        {tree}
      </Publication>
    </StyletronProvider>
  );

  return (
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={frontmatter}
        config={config}
        styles={styletron.getCss()}
        body={appMarkup}
      />
    ) +
    '</html>'
  );
}

const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(render(content, frontmatter));
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
