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
import useMediaData from 'components/indicators/media/hooks/useMediaData';
import getSourceFilter from 'components/indicators/media/utils/getSourceFilter';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { FilterTypes } from 'utils/filterFunctions';
import { METHOD_NAMES } from '../utils/methodName';
import TopLoading from 'components/common/TopLoading';

const termsLabels = [
  'irregulares',
  'refugiados',
  'forzada',
  'personas desplazadas',
  'ruta',
  'flujo',
];

const placeLabels = [
  'selva del darién',
  'darién',
  'colombia',
  'frontera',
  'panamá',
  'necoclí',
  'tapón',
  'cruce del darién',
];

const demoLabels = ['niña', 'niño', 'adolescente', 'mujeres embarazada'];

const contextLabels = ['tráfico', 'abuso', 'sexual'];

const id = 'temas';
const source = 'meltwater';
const methodName = METHOD_NAMES.GET_KEYWORDS;
interface CriteriaObject {
  name: string;
  value: number;
}
export function CriteriaSelectors() {
  const { data, isLoading } = useMediaData({
    id,
    source,
    methodName,
  });
  const demo = useMemo(() => {
    if (!data.length) return [];
    return data.filter(({ name }: CriteriaObject) => demoLabels.includes(name));
  }, [data]);
  const context = useMemo(() => {
    if (!data.length) return [];
    return data.filter(({ name }: CriteriaObject) =>
      contextLabels.includes(name),
    );
  }, [data]);
  const place = useMemo(() => {
    if (!data.length) return [];
    return data.filter(({ name }: CriteriaObject) =>
      placeLabels.includes(name),
    );
  }, [data]);
  const terms = useMemo(() => {
    if (!data.length) return [];
    return data.filter(({ name }: CriteriaObject) =>
      termsLabels.includes(name),
    );
  }, [data]);

  return (
    <>
      <CriteriaSelector
        id='demo_criteria'
        title='Demográfica'
        source='meltwater'
        column='keywords'
        filterType={FilterTypes.WORD_CLOUD_IN}
        values={demo}
        isLoading={isLoading}
      />

      <CriteriaSelector
        id='places'
        title='Lugar'
        source='meltwater'
        column='keywords'
        filterType={FilterTypes.WORD_CLOUD_IN}
        values={place}
        isLoading={isLoading}
      />
      <CriteriaSelector
        id='terms'
        title='Terma'
        source='meltwater'
        column='keywords'
        filterType={FilterTypes.WORD_CLOUD_IN}
        values={terms}
        isLoading={isLoading}
      />
      {/* <CriteriaSelector
        id='context'
        title='Contexto'
        source='meltwater'
        column='context'
        filterType={FilterTypes.STRING_SEARCH}
        criteriaOption={contextCriteriaOption}
        labels={contextCriteriaLabels}
      /> */}
      <CriteriaSelector
        id='context'
        title='Contexto'
        source='meltwater'
        column='keywords'
        filterType={FilterTypes.WORD_CLOUD_IN}
        values={context}
        isLoading={isLoading}
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
    position: 'relative',
    width: '100%',
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
  values: CriteriaObject[];
  isLoading?: boolean;
}

function CriteriaSelector(props: CriteriaSelectorProps) {
  const { id, title, column, source, filterType: type, values } = props;
  const dispatch = useDispatch();
  const classes = useSelectorStyles();
  //@ts-ignore
  const filters = useSelector((state) => state.media.filters) || {};
  const criteria = useMemo(
    () => getSourceFilter(id, filters, source) || [],
    [filters, source, id],
  );

  const onCriteriaChange = useCallback(
    (options) => {
      if (options.length) {
        dispatch(
          addMediaFilter({
            owner: id,
            source,
            values: options,
            column,
            type,
          }),
        );
      } else {
        dispatch(
          removeMediaFilter({
            owner: id,
            source,
            column,
          }),
        );
      }
    },
    [values],
  );

  const handleChange = (
    _e: React.ChangeEvent<{ value: unknown }>,
    newValue: string[],
  ) => {
    onCriteriaChange(newValue);
  };

  return (
    <Grid item className={classes.root}>
      {props.isLoading && <TopLoading />}
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
        {values.map(({ name }) => (
          // @ts-ignore
          <StyledToggleButton key={name} value={name}>
            {name}
          </StyledToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Grid>
  );
}
