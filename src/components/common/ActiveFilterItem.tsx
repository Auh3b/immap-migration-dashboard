import {
  Grid,
  IconButton,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { FilterItem, FilterTypes } from 'utils/filterFunctions';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { removeIntroFilter } from 'store/introSlice';
import { timeFormat } from 'd3';

export interface ActiveFilterItemProps extends FilterItem {
  name: string;
  source: string;
  owner: string;
  valueFormatter?: (value: any) => any;
}

const useFilterStyles = makeStyles((theme) => ({
  menuText: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 150,
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
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const { owner, source, name: _name, values, type, column } = props;
  const handleRemove = () => {
    dispatch(
      removeIntroFilter({
        owner,
        source,
        column,
      }),
    );
  };

  const name = _name.replace('_', ' ');
  const value = getValueFormat(type, values)
  return (
    <Grid
      container
      alignItems='center'
      wrap='nowrap'
      justifyContent='space-between'
    >
      <div className={classes.menuText}>
        <Typography variant='overline'>{name}</Typography>
        <Tooltip title={value}>
          <Typography variant='overline' noWrap={true}>
            {value}
          </Typography>
        </Tooltip>
      </div>
      <IconButton className={classes.itemClose} onClick={handleRemove}>
        <CloseIcon />
      </IconButton>
    </Grid>
  );
}

function getValueFormat(type: string, values: any[]) {
  switch (type) {
    case FilterTypes.BETWEEN: {
      const value = values[0];
      return value.map((d: string) => timeFormat('%d/%m/%Y')(new Date(d))).join(' - ');
    }
    default:
      {
        return values.map((d: string) => d.replaceAll('-', '/')).join(' - ');
      }
  }
}
