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
import ThemeProvider from './util/ThemeProvider.js';

import theme from './theme.js';

const fs = require('fs');
const staticStyles = fs.readFileSync('./styles.css');

const H2 = styled('h2', {
  color: 'lightblue',
  fontSize: '20px',
});

const compile = marksy({
  createElement,
  elements: {
    h2: ({ id, children }) =>
      <H2>
        {children}
      </H2>,
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
  const { tree: articleTree } = compile(text);

  const appMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Publication frontmatter={frontmatter} config={config}>
          {articleTree}
        </Publication>
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={frontmatter}
        config={config}
        styles={staticStyles + styletron.getCss()}
        body={appMarkup}
        usedShortcodes={usedShortcodes}
      />
    ) +
    '</html>';

  console.timeEnd('render time');
  return html;
}

const http = require('http');
const url = require('url');
const path = require('path');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(render(content, frontmatter));
  } else {
    const filename = path.join(
      process.cwd(),
      'static',
      unescape(url.parse(req.url).pathname)
    );
    const stream = fs.createReadStream(filename);
    stream.on('error', function(error) {
      console.log('Caught', error);
      res.statusCode = 404;
      res.end();
    });
    stream.pipe(res);
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
