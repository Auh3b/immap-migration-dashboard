import { makeStyles, Typography } from '@material-ui/core';

const useNoteStyle = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    fontSize: theme.spacing(1.7),
    fontWeight: 400,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    BorderBottom: `${theme.palette.common.black} 1px solid`,
  },
}));

export default function WidgetNote({ note }: { note: string }) {
  const classes = useNoteStyle();
  return (
    <Typography
      className={classes.root}
      display='block'
      gutterBottom
    >
      {note}
    </Typography>
  );
}
