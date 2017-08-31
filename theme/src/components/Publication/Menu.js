import React from 'react';
import PropTypes from 'prop-types';
import { oneLine } from 'common-tags';
import { injectStyle } from 'styletron-utils';
import { styled } from 'styletron-react';
import RecklesslySetInnerHTML from '../../util/RecklesslySetInnerHTML';
import AmpComponent from '../AmpComponent';

const Sidebar = styled(AmpComponent('amp-sidebar'), {
  width: '75vw',
  background: '#fff',
  '@media screen and (min-width: 1024px)': {
    width: '35vw',
  },
});

const Ul = styled('ul', {
  color: '#333',
  fontSize: '6vw',
  textTransform: 'uppercase',
  textAlign: 'center',
  '@media screen and (min-width: 1024px)': {
    fontSize: '2vw',
  },
});

const Li = styled('li', {
  padding: '1vw 0',
  '@media screen and (min-width: 1024px)': {
    padding: '0.3vw 0',
    listStyle: 'none',
  },
});

const A = styled('a', {
  color: 'inherit',
  textDecoration: 'initial',
  padding: 'inherit',
});

const Menu = ({ styletron, config: { categories } }) => {
  const menuLogo = injectStyle(styletron, {
    height: '19vw',
    width: '35vw',
    display: 'block',
    margin: '0 auto',
    '@media screen and (min-width: 1024px)': {
      height: '8vw',
    },
  });

  return (
    <Sidebar id="menu" layout="nodisplay">
      <div>
        <RecklesslySetInnerHTML Element="nav">
          {oneLine`<div on="tap:menu.close" role="button" tabindex="0">
            <svg class="${menuLogo}">
            <use xlink:href="#nausika--logotext-use" />
          </svg>
        </div>`}
        </RecklesslySetInnerHTML>
        <Ul>
          <Li>
            <A href="/">Start</A>
          </Li>
          <hr />
          {Object.keys(categories).map((category, index) => (
            <Li key={index}>
              <A href={`/${categories[category]}`}>{category}</A>
            </Li>
          ))}
        </Ul>
      </div>
    </Sidebar>
  );
};

Menu.propTypes = {
  styletron: PropTypes.object.isRequired,
};

export default Menu;
