import { styled } from 'styletron-react';
import withTheme from '../../util/withTheme';

const P = styled('p', {
  margin: '4vw 6vw 4vw 6vw',
  '@media screen and (min-width: 1024px)': {
    fontSize: '18px',
    lineHeight: '1.4',
  },
});

const H2 = withTheme(
  styled('h2', ({ theme }) => ({
    color: theme.mausgrau,
    margin: '5vw 6vw 2vw 6vw',
    '@media screen and (min-width: 1024px)': {
      fontSize: '3vw',
    },
  }))
);

export default {
  p: P,
  h2: H2,
};
