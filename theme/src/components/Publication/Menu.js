import React from 'react';
import { oneLine } from 'common-tags';
import RecklesslySetInnerHTML from '../../util/RecklesslySetInnerHTML';

export default ({ config: { categories } }) =>
  <amp-sidebar id="menu" layout="nodisplay">
    <div className="menu">
      <RecklesslySetInnerHTML Element="nav">
        {oneLine`<div on="tap:menu.close" role="button" tabindex="0">
          <svg class="nausika--logo-menu-svg">
            <use xlink:href="#nausika--logotext-use" />
          </svg>
        </div>`}
        <ul>
          <li>
            <a href="/">Start</a>
          </li>
          <hr />
          {Object.keys(categories).map((category, index) =>
            <li key={index}>
              <a href={`/${categories[category]}`}>
                {category}
              </a>
            </li>
          )}
        </ul>
      </RecklesslySetInnerHTML>
    </div>
  </amp-sidebar>;
