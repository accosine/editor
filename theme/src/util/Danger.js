import React, { Children } from 'react';
import ReactDOMServer from 'react-dom/server';

export default ({ children, Element }) =>
  <Element
    dangerouslySetInnerHTML={{
      __html: Children.map(
        children,
        child =>
          React.isValidElement(child)
            ? ReactDOMServer.renderToStaticMarkup(child)
            : child
      ).join(''),
    }}
  />;
