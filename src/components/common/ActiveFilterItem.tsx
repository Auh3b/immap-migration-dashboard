import { Grid, IconButton, Typography, makeStyles } from '@material-ui/core';
import { FilterItem } from 'utils/filterFunctions';
import CloseIcon from '@material-ui/icons/Close';

export interface ActiveFilterItemProps extends FilterItem {
  name: string;
  source: string;
  removeItem: RemoveItem;
}

type RemoveItem = (filterItem: Partial<ActiveFilterItemProps>) => void;

const useFilterStyles = makeStyles((theme) => ({
  menuText: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemClose: {
    marginLeft: theme.spacing(2),
    borderRadius: '100%',
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white,
    },
  },
}));

export default function ActiveFilterItem(props: ActiveFilterItemProps) {
  const classes = useFilterStyles();
  const { id: owner, source, name, values, type, column, removeItem } = props;
  return (
    <Grid container alignItems='center' justifyContent='space-between'>
      <div className={classes.menuText}>
        <Typography variant='overline'>{name.replace('_', ' ')}</Typography>
        <Typography variant='overline'>
          {values.map((d: string) => d.replaceAll('-', '/')).join(' - ')}
        </Typography>
      </div>
      <IconButton
        className={classes.itemClose}
        onClick={() => {
          removeItem({ id: owner, column, source });
        }}
      >
        <CloseIcon />
      </IconButton>
    </Grid>
  );
}
