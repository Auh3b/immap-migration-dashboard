import {
  Checkbox,
  Chip,
  Fab,
  FormControl,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useCallback, useMemo, useRef, useState } from 'react';
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
import { FilterTypes } from 'utils/filterFunctions';

const termsCriteriaOption = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const termsCriteriaLabels = {
  0: 'Otro',
  1: 'Migrante',
  2: 'Migrante irregulare',
  3: 'Refugiado',
  4: 'Migración',
  5: 'Migración forzada',
  6: 'Personas desplazada',
  7: 'Ruta Migratoria',
  8: 'Flujo Migratorio',
};
const placeCriteriaOption = [0, 1, 2, 3, 4, 5, 6, 7];
const placeCriteriaLabels = {
  0: 'Otro',
  1: 'Selva del darién',
  2: 'Darién',
  3: 'Frontera Colombia Panamá',
  4: 'Panamá',
  5: 'Necoclí',
  6: 'Tapón',
  7: 'Cruce del darién',
};
const subgroupCriteriaOption = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const subgroupCriteriaLabels = {
  0: 'Otro',
  1: 'Niña',
  2: 'Niño',
  3: 'Adolescente',
  4: 'Mujeres Embarazada',
  5: 'Mujere Embarazada',
  6: 'Venezolano',
  7: 'Haitiano',
  8: 'Ecuatariano',
  9: 'Chino',
  10: 'Colombiano',
  11: 'Peruano',
  12: 'Cubano',
};
const contextCriteriaOption = [0, 1, 2, 3];
const contextCriteriaLabels = {
  0: 'Otro',
  1: 'Tráfico',
  2: 'Abuso',
  3: 'Sexual',
};
const temporalityCriteriaOption = [0, 1, 2];
const temporalityCriteriaLabels = {
  0: 'Otro',
  1: '2023',
  2: 'Marzo',
};

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
        <CriteriaSelector
          id='terms'
          title='Tema'
          source='meltwater'
          column='terms'
          filterType={FilterTypes.STRING_SEARCH}
          criteriaOption={termsCriteriaOption}
          labels={termsCriteriaLabels}
        />
        <CriteriaSelector
          id='places'
          title='Lugar'
          source='meltwater'
          column='places'
          filterType={FilterTypes.STRING_SEARCH}
          criteriaOption={placeCriteriaOption}
          labels={placeCriteriaLabels}
        />
        <CriteriaSelector
          id='subgroups'
          title='Sub-grupo'
          source='meltwater'
          column='subgroups'
          filterType={FilterTypes.STRING_SEARCH}
          criteriaOption={subgroupCriteriaOption}
          labels={subgroupCriteriaLabels}
        />
        <CriteriaSelector
          id='context'
          title='Contexto'
          source='meltwater'
          column='context'
          filterType={FilterTypes.STRING_SEARCH}
          criteriaOption={contextCriteriaOption}
          labels={contextCriteriaLabels}
        />
        <CriteriaSelector
          id='temporality'
          title='Temporabalidad'
          source='meltwater'
          column='temporality'
          filterType={FilterTypes.STRING_SEARCH}
          criteriaOption={temporalityCriteriaOption}
          labels={temporalityCriteriaLabels}
        />
        <div className={classes.filters}>
          <ClearFiltersButton
            clearCallback={() => dispatch(clearMediaFilters())}
            disabled={disabled}
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
  }, [start, end]);

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

const useSelectorStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    // maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface CriteriaSelectorProps {
  id: string;
  title: string;
  column: string;
  source: string;
  filterType: FilterTypes;
  criteriaOption: number[];
  labels?: Record<number, string>;
}

function CriteriaSelector(props: CriteriaSelectorProps) {
  const {
    id,
    title,
    column,
    source,
    filterType: type,
    criteriaOption,
    labels,
  } = props;
  const classes = useSelectorStyles();
  const [criteria, setCriteria] = useState<number[]>([]);
  const dispatch = useDispatch();

  const onCategoriesChange = useCallback(
    (categories) => {
      if (categories.length) {
        const withRegExp =
          type === _FilterTypes.STRING_SEARCH
            ? categories.map((d: any) => `^(.*,|)${d}(,.*|)$`)
            : categories;
        dispatch(
          addMediaFilter({
            source,
            column,
            type,
            values: withRegExp,
            owner: id,
          }),
        );
      } else {
        dispatch(
          removeMediaFilter({
            source,
            column,
            owner: id,
          }),
        );
      }
    },
    [criteria, dispatch, source, id, column],
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCriteria(event.target.value as number[]);
    onCategoriesChange(event.target.value);
  };
  console.log(id, criteriaOption);
  return (
    <FormControl>
      <InputLabel id={`${title}-criteria`}>{title}</InputLabel>
      <Select
        id={`${title}-criteria-select`}
        multiple
        value={criteria}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
        renderValue={(selected: any[]) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={labels ? labels[value] : value}
                className={classes.chip}
              />
            ))}
          </div>
        )}
      >
        {criteriaOption.map((criterion: number) => (
          <MenuItem key={criterion} value={criterion}>
            <Checkbox checked={criteria.indexOf(criterion) > -1} />
            <ListItemText primary={labels ? labels[criterion] : criterion} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
