import NoWidgetData from './../../common/customWidgets/NoWidgetData';
import ClearFiltersButton from 'components/common/ClearFiltersButton';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SERVICES_KEY } from './utils/services';
import CustomWidgetWrapper from 'components/common/customWidgets/CustomWidgetWrapper';
import { filterItem, filterValues } from 'utils/filterFunctions';
import { _FilterTypes } from '@carto/react-core';
import CustomConnectDotChart from 'components/common/customWidgets/CustomConnectDotChart';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, removeFilter } from '@carto/react-redux';
import { point } from '@turf/helpers';
import { initialState } from 'store/initialStateSlice';
import { RootState } from 'store/store';
import handleMapTransitions from './utils/handleMapTransitions';
import AggreatedServicesLegend from './utils/AggreatedServicesLegend';
import getViewport from './utils/getViewport';
import getFeatureCollection from './utils/getFeatureCollection';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const otherColumns = {
  country: 'ubicacion_',
  region: 'lugar_enc',
  organisation: 'org_pert',
  persons: 'nna_atend',
  lat: 'latitude',
  long: 'longitude',
};

export const SERVICE_STAT_COLUMNS_NAME = [
  'Capacidad diaria',
  'Personas atendidas ayer',
];

const column: string = 'serv_tipo1';

const COLUNM_MAP = new Map([
  [0, column],
  [3, Object.values(otherColumns)[1]],
]);

const useStyles = makeStyles((theme) => ({
  main: {},
  menuItem: {},
  content: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  selectors: {
    position: 'relative',
  },
  clearButton: {
    position: 'fixed',
    opacity: 0.5,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 1,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const id = 'aggregatedService';
const title =
  'Capacidad de atención y operación del punto de servicio o ayuda humanitaria';
const methodName = EXTERNAL_METHOD_NAMES.GET_CONNECTED_DOT_SERVICES
const methodParams = {
  otherColumns,
};

export default function AggreatedServices({ dataSource }: BasicWidgetType) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<Record<string, filterItem> | null>(
    null,
  );
  const { width, height } = useSelector(
    (state: RootState) => state.carto.viewState,
  );
  const classes = useStyles();
  const { data: _data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    methodName,
    column,
    methodParams,
  });

  const data = useMemo(() => {
    const filteredData = filterValues(_data, filters ?? {});
    return filteredData;
  }, [_data, filters]);

  const regions = useMemo(
    () => data && Array.from(new Set(data.map((d: any) => d[2]))),
    [data],
  );
  const serviceSelection = useMemo(
    () => data && Array.from(new Set(data.map((d: any) => d[0]))),
    [data],
  );

  const handleServiceChange = useCallback(
    ({ column, currentSelection, callbackProps }) => {
      const { owner } = callbackProps;
      if (currentSelection) {
        dispatch(
          addFilter({
            id: dataSource,
            column: COLUNM_MAP.get(column),
            type: _FilterTypes.STRING_SEARCH,
            params:{
              useRegExp: true,
            },
            values: ['^(.*,|)'+currentSelection+'(,.*|)$'],
            owner,
          }),
        );
      }

      if (currentSelection === 'all') {
        dispatch(
          removeFilter({
            id: dataSource,
            column: COLUNM_MAP.get(column),
            owner,
          }),
        );
      }
    },
    [dispatch],
  );

  const handleLocationChange = useCallback(
    ({ column, currentSelection, callbackProps }) => {
      if (currentSelection && currentSelection !== 'all') {
        const { data, width, height } = callbackProps;
        const padding = 100;
        const geojson = getFeatureCollection({
          input: data,
          coordinateLocation: (value) => point(value[6]),
          filterFunction: (d) => d[column] === currentSelection,
        });

        const { latitude, longitude, zoom } = getViewport({
          geojson,
          padding,
          width,
          height,
        });

        handleMapTransitions({
          start: 1000,
          end: 1500,
          params: {
            latitude,
            longitude,
            zoom,
          },
          dispatch,
        });
        return;
      }

      if (filters && currentSelection === 'all') {
        const { latitude, longitude, zoom } = initialState.viewState;
        handleMapTransitions({
          start: 500,
          end: 1000,
          params: {
            latitude,
            longitude,
            zoom,
          },
          dispatch,
        });
      }
    },
    [dispatch, filters],
  );

  return (
    <CustomWidgetWrapper expandable={false} title={title} isLoading={isLoading}>
      <Grid item className={classes.main}>
        <Grid className={classes.content} direction='column' container>
          <Grid container spacing={5} className={classes.selectors}>
            {/* Services Selector */}
            <Selector
              id='serviceSelector'
              name='servicio'
              column={0}
              data={serviceSelection}
              filters={filters}
              labelFormatter={(value) => SERVICES_KEY.get(value)}
              addFilter={setFilters}
              callback={handleServiceChange}
              callbackProps={{ owner: id }}
            />
            {/* Location Selector */}
            <Selector
              id='locationSelector'
              name='ubicación'
              column={2}
              data={regions}
              filters={filters}
              addFilter={setFilters}
              callback={handleLocationChange}
              callbackProps={{ data, width, height }}
            />
            <ClearFiltersButton
              className={classes.clearButton}
              disabled={filters ? !Object.keys(filters).length : true}
              clearCallback={() => {
                setFilters({});
                const { latitude, longitude, zoom } = initialState.viewState;
                handleMapTransitions({
                  start: 500,
                  end: 1000,
                  params: {
                    latitude,
                    longitude,
                    zoom,
                  },
                  dispatch,
                });
              }}
            />
          </Grid>
          <AggreatedServicesLegend />
          {data.length && !isLoading && regions ? (
            regions.map((groupName) => {
              return (
                <CustomConnectDotChart
                  key={groupName}
                  data={data}
                  groupName={groupName}
                />
              );
            })
          ) : (
            <NoWidgetData />
          )}
        </Grid>
      </Grid>
    </CustomWidgetWrapper>
  );
}

const useSelectSyles = makeStyles(() => ({
  root: {
    width: '50%',
    alignSelf: 'flex-start',
  },
}));

function Selector({
  id,
  column,
  name,
  labelFormatter,
  type = _FilterTypes.IN,
  data,
  filters,
  addFilter,
  callback,
  callbackProps,
}: {
  id: string;
  name?: string;
  column: string | number;
  type?: _FilterTypes;
  data: any[];
  filters: Record<string, filterItem>;
  addFilter: any;
  labelFormatter?: (value: any) => unknown;
  callback?: Function;
  callbackProps?: Record<string, unknown>;
}) {
  const classes = useSelectSyles();

  const currentSelection = useMemo(() => {
    if (!filters) {
      return 'all';
    }

    const filter = filters[id];
    if (filter) {
      return filter.values[0];
    }

    return 'all';
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;

    addFilter((prev: any) => {
      if (prev) {
        if (!value) {
          return { ...prev };
        }
        if (value === 'all') {
          delete prev[id];
          return { ...prev };
        }
        if (value) {
          const newFilter: any = { id, values: [value], type, column };
          prev[id] = newFilter;
          return { ...prev };
        }
      } else {
        const newFilter: any = { id, values: [value], type, column };
        return Object.fromEntries([[id, newFilter]]);
      }
    });
  };

  useEffect(() => {
    if (callback) {
      callback({ id, type, column, currentSelection, callbackProps });
    }
  }, [currentSelection, callback]);

  return (
    <Grid item className={classes.root}>
      <FormControl>
        <InputLabel>
          <Typography variant='overline'>Seleccionar {name}</Typography>
        </InputLabel>
        <Select value={currentSelection} onChange={handleChange}>
          <MenuItem value={'all'}>
            <Typography variant='overline'>All</Typography>
          </MenuItem>
          {data &&
            data.map((d: string, index: number) => (
              <MenuItem value={d} key={index}>
                <Typography variant='overline'>
                  {labelFormatter ? labelFormatter(d) : d}
                </Typography>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
