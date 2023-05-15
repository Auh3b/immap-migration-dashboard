import { Typography, TypographyVariant, makeStyles } from '@material-ui/core';
import React, { CSSProperties } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export interface MainColumnTitleProps {
  title?: string;
  type?: TypographyVariant;
  styles?: CSSProperties;
}

export default function MainColumnTitle({
  title,
  type,
  styles,
}: MainColumnTitleProps) {
  const classes = useStyles();
  return title ? (
    <Typography
      variant={type ?? 'subtitle1'}
      className={classes.root}
      style={styles}
    >
      {title}
    </Typography>
  ) : (
    <></>
  );
}
