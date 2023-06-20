import { _FilterTypes } from '@carto/react-core';
import {
  Grid,
  Tooltip,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
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

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(0.5),
  },
  grouped: {
    margin: theme.spacing(0.5),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
      borderLeft: '0.5px solid ' + grey[200],
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    width: 'auto',
    border: '0.5px solid ' + grey[200],
  },
  selected: {
    backgroundColor: theme.palette.background.paper + ' !important',
    boxShadow: theme.shadows[3],
    '& > span': {
      color: theme.palette.primary.main + ' !important',
      fontWeight: 'bold',
    },
  },
  label: {
    ...theme.typography.overline,
    fontSize: theme.typography.pxToRem(theme.spacing(1.5)),
    display: 'block',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))(ToggleButton);

const useSelectorStyles = makeStyles((theme) => ({
  root: {
    border: '0.5px solid ' + grey[200],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    ...theme.typography.subtitle1,
    color: grey[600],
    width: 200,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

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

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    newValue: number[],
  ) => {
    setCriteria(newValue);
    onCategoriesChange(newValue);
  };

  return (
    <Grid item className={classes.root}>
      <Tooltip title={title} arrow placement='bottom'>
        <Typography className={classes.title}>{title}</Typography>
      </Tooltip>
      {/* @ts-expect-error */}
      <StyledToggleButtonGroup
        value={criteria}
        //@ts-ignore
        onChange={handleChange}
        exclusive={false}
      >
        {criteriaOption.map((criterion: number) => (
          // @ts-ignore
          <StyledToggleButton key={title + criterion} value={criterion}>
            {labels ? labels[criterion] : criterion}
          </StyledToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Grid>
  );
}
