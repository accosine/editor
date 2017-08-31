import React from 'react';
export default ({ accountId }) => (
  <amp-analytics type="googleanalytics" id="analytics1">
    <script
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          vars: {
            account: `${accountId}`,
          },
          triggers: {
            trackPageview: {
              on: 'visible',
              request: 'pageview',
            },
          },
        }),
      }}
    />
  </amp-analytics>
);
