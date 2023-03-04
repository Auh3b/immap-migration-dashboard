import { makeStyles, Typography } from '@material-ui/core';

const useNoteStyle = makeStyles((theme) => ({
  note: {
    fontWeight: 300,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    BorderBottom: `${theme.palette.common.black} 1px solid`,
  },
}));

export default function WidgetNote({ note }: { note: string }) {
  const classes = useNoteStyle();
  return (
    <Typography
      variant='caption'
      className={classes.note}
      display='block'
      gutterBottom
    >
      {note}
    </Typography>
  );
}
