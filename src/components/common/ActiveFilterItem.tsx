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
import { timeFormat } from 'd3';
import { useCallback } from 'react';

export interface ActiveFilterItemProps extends FilterItem {
  name: string;
  source: string;
  owner: string;
  valueFormatter?: (value: any) => any;
  removeFilter?: Function;
}

const useFilterStyles = makeStyles((theme) => ({
  menuText: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 150,
    marginBottom: theme.spacing(1),
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

const removeFilterFunction = Object.fromEntries([['']]);

export default function ActiveFilterItem(
  props: Partial<ActiveFilterItemProps>,
) {
  const dispatch = useDispatch();
  const classes = useFilterStyles();
  const {
    owner,
    source,
    name: _name,
    values,
    type,
    column,
    valueFormatter,
    removeFilter,
  } = props;
  const handleRemove = useCallback(() => {
    dispatch(
      removeFilter({
        owner,
        source,
        column,
      }),
    );
  }, [owner, source, column, removeFilter]);

  const name = _name.replaceAll('_', ' ');
  const value = getValueFormat(
    type,
    values.map((d) => (valueFormatter ? valueFormatter(d) : d)),
  );
  return (
    <Grid
      container
      alignItems='center'
      wrap='nowrap'
      justifyContent='space-between'
    >
      <div className={classes.menuText}>
        <Typography variant='overline' style={{ fontWeight: 600 }}>
          {name}
        </Typography>
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
      return value
        .map((d: string) => timeFormat('%d/%m/%Y')(new Date(d)))
        .join(' - ');
    }
    default: {
      return values.map((d: string) => d.replaceAll('-', '/')).join(', ');
    }
  }
}
