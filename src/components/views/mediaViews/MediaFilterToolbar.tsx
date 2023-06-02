import {
  ClickAwayListener,
  Fab,
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMediaFilter,
  clearMediaFilters,
  removeMediaFilter,
} from 'store/mediaSlice';
import { _FilterTypes } from '@carto/react-core';
import { dequal } from 'dequal';
import { deepOrange } from '@material-ui/core/colors';
import ClearFiltersButton from 'components/common/ClearFiltersButton';
import { UNICEF_COLORS } from 'theme';
import { Filters } from 'utils/filterFunctions';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import regionName from 'components/indicators/media/utils/getCountryByRegion';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  clear: {
    backgroundColor: deepOrange[500],
    color: 'white',
    '&:hover': {
      backgroundColor: deepOrange[800],
      color: 'white',
    },
  },
  filters: {
    width: '25%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
}));

export default function MediaFilterToolbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters);
  const disabled = useMemo(
    () => Object.keys(filters?.meltwater ?? {}).length === 0,
    [filters],
  );

  return (
    <Paper variant='outlined' className={classes.root}>
      <Grid
        container
        item
        wrap='nowrap'
        alignItems='center'
        justifyContent='space-between'
      >
        <DateFilter />
        <div className={classes.filters}>
          <ClearFiltersButton
            clearCallback={() => dispatch(clearMediaFilters())}
            disabled={disabled}
          />
          <ActiveFilters
            disabled={disabled}
            filters={filters?.meltwater ?? {}}
          />
        </div>
      </Grid>
    </Paper>
  );
}

function DateFilter({ filters }: any) {
  const id = 'fecha_filtro';
  const dispatch = useDispatch();
  const [start, setStart] = useState('2022-05-12');
  const [end, setEnd] = useState('2023-05-12');
  const currentDateFilter = useRef([start, end]);

  const showToggle = useMemo(() => {
    const newDate = [start, end];
    const oldDate = currentDateFilter.current;
    if (dequal(newDate, oldDate)) {
      return false;
    }

    return true;
  }, [start, end, currentDateFilter.current]);

  const handleApplyFilter = () => {
    dispatch(
      addMediaFilter({
        source: 'meltwater',
        column: 'date',
        values: [[start, end]],
        owner: id,
        type: _FilterTypes.BETWEEN,
      }),
    );
    currentDateFilter.current = [start, end];
  };

  return (
    <Grid container alignItems='center' item spacing={4}>
      <DatePicker id='start' label='start' value={start} setValue={setStart} />
      <DatePicker id='end' label='end' value={end} setValue={setEnd} />
      {showToggle && <ApplyDateFilter onClick={handleApplyFilter} />}
    </Grid>
  );
}

interface DatePickerProps {
  id?: string;
  value?: string;
  label?: string;
  setValue?: Function;
}

function DatePicker({ id, value, label, setValue }: DatePickerProps) {
  const date = useRef<string>(value);

  const handleDateChange = (event: any) => {
    const selectedValue = event.target.value;
    date.current = selectedValue;
    setValue(selectedValue);
  };

  return (
    <Grid item>
      <TextField
        id={id}
        label={label}
        type='date'
        defaultValue={date.current}
        onChange={handleDateChange}
      />
    </Grid>
  );
}

function ApplyDateFilter({ onClick }: any) {
  const classes = useStyles();
  return (
    <Fab className={classes.clear} onClick={onClick}>
      Apply
    </Fab>
  );
}

const useFilterStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
  },
  button: {
    padding: theme.spacing(2),
    borderRadius: '100%',
    border: ({ hasFilters }: any) =>
      hasFilters && `solid 1px ${theme.palette.grey[100]}`,
    color: ({ isOpen }: any) =>
      isOpen ? UNICEF_COLORS[0] : theme.palette.grey[100],
  },
}));

function ActiveFilters({
  filters,
  disabled,
}: {
  disabled: any;
  filters: Filters;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (disabled) {
      setAnchorEl(null);
    }
  }, [disabled]);

  const classes = useFilterStyles({
    isOpen: Boolean(anchorEl),
    hasFilters: !disabled,
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Tooltip title='Filtros'>
        <span>
          <IconButton
            className={classes.button}
            disabled={disabled}
            onClick={handleClick}
          >
            <FilterListIcon />
          </IconButton>
        </span>
      </Tooltip>
      <FilterMenu
        filters={filters}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </div>
  );
}

const useMenuStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  menuItem: {
    '&:hover': {
      backgroundColor: 'none !important',
    },
  },
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

function FilterMenu({
  filters,
  anchorEl,
  handleClose,
}: {
  filters: Record<string, unknown>;
  anchorEl: null | HTMLElement;
  handleClose: any;
}) {
  const classes = useMenuStyles();
  const dispatch = useDispatch();

  const handleRemove = ({ owner, column, source }: any) => {
    dispatch(
      removeMediaFilter({
        owner,
        column,
        source,
      }),
    );
  };

  return (
    <Popper
      id='mediaFilterMenu'
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement='bottom'
    >
      <Paper className={classes.paper}>
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList>
            {Object.entries(filters).map(
              ([name, { owner, type, values, column, source }]: any) => (
                <MenuItem key={name} className={classes.menuItem}>
                  <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <div className={classes.menuText}>
                      <Typography variant='overline'>
                        {name.replace('_', ' ')}
                      </Typography>
                      <Typography variant='overline'>
                        {type === _FilterTypes.BETWEEN
                          ? values[0]
                              .map((d: string) => d.replaceAll('-', '/'))
                              .join(' - ')
                          : values
                              .map((d: string) =>
                                owner === 'país'
                                  ? regionName.of(d.toUpperCase())
                                  : d,
                              )
                              .join(', ')}
                      </Typography>
                    </div>
                    <IconButton
                      className={classes.itemClose}
                      onClick={() => {
                        handleRemove({ owner, column, source });
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </MenuItem>
              ),
            )}
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Popper>
  );
}
