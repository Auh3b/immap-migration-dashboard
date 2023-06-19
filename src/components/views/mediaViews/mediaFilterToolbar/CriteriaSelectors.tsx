import { _FilterTypes } from '@carto/react-core';
import {
  Checkbox,
  FormControl,
  FormLabel,
  ListItemText,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { FilterTypes } from 'utils/filterFunctions';
import getStringSearchValue from 'utils/getStringSearchValue';

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

export function CriteriaSelectors() {
  return (
    <>
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
    </>
  );
}

const useSelectorStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
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
        const valueFormatter = Object.fromEntries(
          withRegExp.map((strExp: string) => [
            strExp,
            labels[Number(getStringSearchValue(strExp))],
          ]),
        );

        dispatch(
          addMediaFilter({
            source,
            column,
            type,
            values: withRegExp,
            owner: id,
            valueFormatter,
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
    [criteria, dispatch, source, id, column, labels],
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCriteria(event.target.value as number[]);
    onCategoriesChange(event.target.value);
  };

  return (
    <FormControl variant='outlined' className={classes.formControl}>
      <FormLabel component='legend'>{title}</FormLabel>
      <Select
        id={`${title}-criteria-select`}
        multiple
        value={criteria}
        onChange={handleChange}
        MenuProps={MenuProps}
        renderValue={(selected: any[]) =>
          selected.map((d) => (labels ? labels[d] : d)).join(', ')
        }
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
