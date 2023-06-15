import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  makeStyles,
  withStyles,
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
  valueFormatter?: Record<string | number, string>;
  removeFilter?: Function;
}

const useFilterStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: '0.5px solid #F3F3F3',
    borderRadius: theme.shape.borderRadius,
  },
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
      backgroundColor: 'rgba(0,0,0,0)',
      color: theme.palette.error.main,
    },
  },
}));

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
  const filterValues = getValueFormat(
    type,
    values.map((d) => (valueFormatter ? valueFormatter[d] : d)),
  );
  return (
    <Grid container wrap='nowrap' direction='column' className={classes.root}>
      <Grid item container justifyContent='space-between' alignItems='center'>
        <Typography variant='overline' style={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <IconButton className={classes.itemClose} onClick={handleRemove}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider orientation='horizontal' />
      <FilterValues values={filterValues} />
    </Grid>
  );
}

function FilterValues({ values }: { values: string | string[] }) {
  return (
    <Grid item wrap='wrap' container style={{ marginTop: 6 }}>
      {typeof values === 'string' ? (
        <FilterValue value={values} />
      ) : (
        values.map((value) => <FilterValue key={value} value={value} />)
      )}
    </Grid>
  );
}

const StyledChip = withStyles((theme) => ({
  label: {
    maxWidth: '150px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))(Chip);

function FilterValue({ value }: { value: string }) {
  return (
    <Tooltip title={value}>
      {/* @ts-ignore */}
      <StyledChip label={value} style={{ margin: 4 }} />
    </Tooltip>
  );
}

function getValueFormat(type: string, values: any[]): string | string[] {
  switch (type) {
    case FilterTypes.BETWEEN: {
      const value = values[0];
      return value
        .map((d: string) => timeFormat('%d/%m/%Y')(new Date(d)))
        .join(' - ');
    }
    default: {
      return values//.map((d: string) => d.replaceAll('-', '/'));
    }
  }
}
