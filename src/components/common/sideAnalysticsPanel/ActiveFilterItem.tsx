import { ActiveFilterItemProps } from './sideAnalyticsPanelTypes';
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

const useFilterStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: '0.5px solid #F3F3F3',
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    maxWidth: 175,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 600
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
        id: source,
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
      <Grid item container wrap='nowrap' justifyContent='space-between' alignItems='center'>
        <Tooltip title={name} arrow>
          <Typography variant='overline' className={classes.title}>
            {name}
          </Typography>
        </Tooltip>
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
    <Tooltip title={value} arrow>
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
      return values; //.map((d: string) => d.replaceAll('-', '/'));
    }
  }
}
