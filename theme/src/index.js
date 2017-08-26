import React, { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider, styled } from 'styletron-react';
import matter from 'gray-matter';
import marksy from 'marksy';
import shortcodes from './shortcodes';
import config from '../config';
import Head from './components/Head';
import Publication from './components/Publication';

const H1 = styled('h1', {
  color: 'lightblue',
  fontSize: '20px',
});

const compile = marksy({
  createElement,
  elements: {
    h1: ({ id, children }) =>
      <H1>
        {children}
      </H1>,
  },
});

const { data: frontmatter, content } = matter.read('./test.md');

const Layout = ({ styles, body, frontmatter, usedShortcodes }) => [
  <Head
    path={`${config.categories[frontmatter.collection]}/${frontmatter.slug}`}
    frontmatter={frontmatter}
    config={config}
    styles={styles}
    usedShortcodes={usedShortcodes}
  />,
  <body dangerouslySetInnerHTML={{ __html: body }} />,
];

function render(article, frontmatter) {
  console.time('render time');
  const styletron = new Styletron();
  const { text, usedShortcodes } = shortcodes(article, styletron);
  const { tree } = compile(text);

  const appMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <Publication frontmatter={frontmatter} config={config}>
        {tree}
      </Publication>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={frontmatter}
        config={config}
        styles={styletron.getCss()}
        body={appMarkup}
        usedShortcodes={usedShortcodes}
      />
    ) +
    '</html>';

  console.timeEnd('render time');
  return html;
}

const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(render(content, frontmatter));
  } else {
    res.statusCode = 404;
    res.end();
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
