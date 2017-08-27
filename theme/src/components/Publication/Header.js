import React from 'react';
import { oneLine } from 'common-tags';
export default () =>
  <header
    dangerouslySetInnerHTML={{
      __html: oneLine`
    <div on="tap:menu" role="button" tabindex="0" class="header--hamburger">
      <svg class="header--hamburger-svg" viewBox="0 0 250 250">
        <path
          d="M 0 0 L 0 45 L 250 45 L 250 0 L 0 0 z M 0 75 L 0 120 L 250 120 L 250 75 L 0 75 z M 0 150 L 0 195 L 250 195 L 250 150 L 0 150 z "
          id="rect3785"
        />
      </svg>
    </div>
    <div id="nausika--headerlogo">
      <a href="/">
        <svg class="nausika--logo-header-svg">
          <use xlinkHref="#nausika--bubble-use" />
          <use xlinkHref="#nausika--logotext-use" />
        </svg>
      </a>
    </div>
    `,
    }}
  />;
