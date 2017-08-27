import React from 'react';
import AmpComponent from '../../AmpComponent';
import { styled } from 'styletron-react';
import withTheme from '../../../util/withTheme';
import formatDate from '../../../util/formatDate';

const Container = styled('div', {
  margin: '0 auto',
  padding: '10px',
  width: '87vw',
  position: 'relative',
  top: '-15vw',
  background: 'white',
  lineHeight: 1,
  '@media screen and (min-width: 1024px)': {
    top: 0,
    width: 'inherit',
  },
});

const Time = withTheme(
  styled('time', ({ theme }) => ({
    display: 'block',
    margin: '0vw 0vw 5vw 0vw',
    color: theme.mausgrau,
    '@media screen and (min-width: 1024px)': {
      margin: '0 0 2vw 0',
    },
  }))
);

const Breadcrumbs = withTheme(
  styled('p', ({ theme, category }) => ({
    marginBottom: '5vw',
    color: theme[category].color,
    '@media screen and (min-width: 1024px)': {
      marginBottom: '2vw',
    },
  }))
);

const A = withTheme(
  styled('a', ({ theme, category }) => ({
    color: theme[category].color,
  }))
);

const Author = styled('div', {
  paddingTop: '4vw',
  height: '25vw',
  width: '25vw',
  margin: '0 auto',
  '@media screen and (min-width: 1024px)': {
    width: '10vw',
    height: '10vw',
  },
});

const AuthorName = styled('span', {
  display: 'block',
  fontSize: '3vw',
  textAlign: 'center',
  marginTop: '2vw',
  '@media screen and (min-width: 1024px)': {
    fontSize: '1vw',
  },
});

const AuthorPicture = withTheme(
  styled(AmpComponent('amp-img'), ({ theme }) => ({
    boxShadow: `0px 2px 7px 0px ${theme.mausgrau}`,
    borderRadius: '100%',
  }))
);

const Headline = withTheme(
  styled('h1', ({ theme }) => ({
    marginBottom: '5vw',
    color: theme.mausgrau,
    '@media screen and (min-width: 1024px)': {
      fontSize: '5vw',
    },
  }))
);

const Subline = withTheme(
  styled('h2', ({ theme, category }) => ({
    backgroundColor: theme[category].subline,
    fontSize: '5vw',
    color: 'white',
    padding: '2vw',
    margin: '0 0 3vw 0',
    '@media screen and (min-width: 1024px)': {
      fontSize: '2vw',
      padding: '1vw',
    },
  }))
);
styled('h2', {});

export default ({
  config,
  category,
  date,
  headline,
  subline,
  attribution,
  author,
  alt,
}) =>
  <Container>
    <Breadcrumbs category={category.toLowerCase()}>
      <A category={category.toLowerCase()} href="/">
        Start
      </A>
      {' > '}
      <A
        category={category.toLowerCase()}
        href={`/${config.categories[category]}/`}
      >
        {category}
      </A>
    </Breadcrumbs>
    <Time dateTime={formatDate(date, 'YYYY-MM-DD', 'en')}>
      {formatDate(date, 'DD. MMMM YYYY', 'de')}
    </Time>
    <Headline>
      {headline}
    </Headline>
    <Subline category={category.toLowerCase()}>
      {subline}
    </Subline>
    <Author>
      <AuthorPicture
        width={4}
        height={4}
        src={`/${config.assets}/${config.authors[author].avatar}`}
        alt={alt}
        attribution={attribution}
        layout="responsive"
      />
    </Author>
    <AuthorName>
      {config.authors[author].name}
    </AuthorName>
  </Container>;
