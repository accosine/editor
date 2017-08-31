import React, { Children } from 'react';
import ReactDOMServer from 'react-dom/server';
import decode from 'unescape';

export default ({ children, Element }) => (
  <Element
    dangerouslySetInnerHTML={{
      __html: Children.map(
        children,
        child =>
          React.isValidElement(child)
            ? decode(ReactDOMServer.renderToStaticMarkup(child))
            : child
      ).join(''),
    }}
  />
);
