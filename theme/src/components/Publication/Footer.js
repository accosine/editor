import React from 'react';
import { oneLine } from 'common-tags';

export default ({ config }) => [
  <footer>
    <div id="nausika--footerlogo">
      <a href="#main">
        <div className="nausika--logo-gurl">
          <amp-img
            width={'3'}
            height={'3'}
            src={`/${config.assets}/nausika-gurl.min.svg`}
            alt="Gurl you know it's true, uh uh uh, I love you!"
            attribution="All Rights Reserved"
            layout="responsive"
          />
        </div>
      </a>
      <a href="#main">
        <svg id="nausika--footersvg">
          <use xlinkHref="#nausika--logotext-use" />
        </svg>
      </a>
    </div>
    <ul>
      {/* <li>Newsletter</li> */}
      <li>Über uns</li>
      {/* <li>FAQ</li> */}
      {/* <li>Werbung</li> */}
      <li>
        <a href="/impressum/">Impressum</a>
      </li>
      <li>
        <a href="/datenschutz/">Datenschutz</a>
      </li>
      <li>
        <a href="/agb/">AGB</a>
      </li>
      {/* <li>App</li> */}
      <li>
        <a href="/rss/">RSS</a>
      </li>
      <li>
        <a href="https://www.facebook.com/nausikade">Facebook</a>
      </li>
      <li>
        <a href="https://www.twitter.com/nausikade">Twitter</a>
      </li>
    </ul>
  </footer>,
  <amp-user-notification
    layout="nodisplay"
    id="amp-user-notification1"
    dangerouslySetInnerHTML={{
      __html: oneLine`
    nausika nutzt Cookies in deinem Browser. Wir speichern darin allerlei Daten
    - aber keine Sorge, nichts Wildes. Mehr langweiliges bla bla über Cookies
    kannst du <a href="/datenschutz/">hier lesen...</a>
    <button on="tap:amp-user-notification1.dismiss">
      Cookies finde ich ganz ok
    </button>
      `,
    }}
  />,
];
