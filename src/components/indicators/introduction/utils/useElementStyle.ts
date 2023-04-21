import { makeStyles } from '@material-ui/core';

const usePieStyles = makeStyles((theme) => ({
  pieContainer: {
    [theme.breakpoints.down('lg')]: {
      height: '150px',
    },
  },
}));

export default function useElementStyle() {
  const pieStyles = usePieStyles();

  return {
    ...pieStyles,
  };
}
