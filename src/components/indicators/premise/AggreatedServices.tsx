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
import MethodFunc from '../utils/methodType';
import { SERVICES_KEY, SERVICE_STAT_COLUMNS } from './utils/services';
import CustomWidgetWrapper from 'components/common/customWidgets/CustomWidgetWrapper';
import { filterItem, filterValues } from 'utils/filterFunctions';
import { _FilterTypes } from '@carto/react-core';

import CustomConnectDotChart from 'components/common/customWidgets/CustomConnectDotChart';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter, setViewState } from '@carto/react-redux';
import { featureCollection, point } from '@turf/helpers';
import { bbox } from '@turf/turf';
//@ts-ignore
import {WebMercatorViewport} from '@deck.gl/core';
import { initialState } from 'store/initialStateSlice';
import { removeTransition, setTransition } from 'store/mapSlice';

const otherColumns = {
  country: 'ubicacion_',
  region: 'lugar_enc',
  organisation: 'org_pert',
  persons: 'nna_atend',
  lat: 'lat',
  long: 'long',
};

const SERVICE_STAT_COLUMNS_NAME = [
  'Capacidad diaria',
  'Personas atendidas ayer',
  'Promedio diario',
];

const column: string = 'serv_tipo1';
const columnAlt: string = 'serv_tipo';

const COLUNM_MAP = new Map([
  [0, columnAlt],
  [3, Object.values(otherColumns)[1]],
]);

const method: MethodFunc = (input, column, params) => {
  let output: any[] = [];
  const { otherColumns } = params;

  for (let serviceEntry of input) {
    const services: number[] = serviceEntry[column]
      .split(',')
      .map((d: string) => +d);

    services.forEach((service) => {
      const serviceColumns = SERVICE_STAT_COLUMNS.get(service);
      let newEntry: any = [
        SERVICES_KEY.get(service),
        '',
        serviceEntry[otherColumns.region],
        serviceEntry[otherColumns.organisation],
        serviceEntry[otherColumns.persons],
        `${serviceEntry[otherColumns.organisation]} - ${SERVICES_KEY.get(
          service,
        )}`,
        [serviceEntry[otherColumns.long], serviceEntry[otherColumns.lat]],
      ];
      for (let i = 0; i < SERVICE_STAT_COLUMNS_NAME.length; i++) {
        newEntry = [...newEntry, serviceEntry[serviceColumns[i]] || 0];
      }
      output = [...output, newEntry];
    });
  }

  return output;
};

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
  error: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
}));

const id = 'aggregatedService';
const title =
  'Capacidad de atención y operación del punto de servicio o ayuda humanitaria';
const methodParams = {
  otherColumns,
};

export default function AggreatedServices({ dataSource }: BasicWidgetType) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<Record<string, filterItem>>({});
  const serviceSelection = Array.from(SERVICES_KEY.values());
  const classes = useStyles();
  const { data: _data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams,
  });

  const data = useMemo(() => {
    const filteredData = filterValues(_data, filters);
    return filteredData;
  }, [_data, filters]);

  const locationSelection = useMemo(() => {
    if (_data.length === 0) {
      return [];
    }
    return Array.from(
      new Set(
        _data.map((d) => {
          return d[2];
        }),
      ),
    );
  }, [_data]);

  const regions = useMemo(
    () => data && Array.from(new Set(data.map((d: any) => d[2]))),
    [data],
  );

  const handleServiceChange = useCallback(
    ({ id, field, currentSelection }) => {
      if (currentSelection) {
        dispatch(
          addFilter({
            id: dataSource,
            column: COLUNM_MAP.get(field),
            type: _FilterTypes.STRING_SEARCH,
            values: [currentSelection],
            owner: id,
          }),
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column: COLUNM_MAP.get(field),
            owner: id,
          }),
        );
      }
    },
    [dispatch],
  );

  const handleLocationChange = useCallback( ({ id, field, currentSelection, callbackProps })=>{
    if(currentSelection){
      const { data } = callbackProps
      const geojson = featureCollection(data.filter((d:any) => d[field] === currentSelection).map((d:any)=> point(d[6]))) 
      const [minLong, minLat, maxLong, maxLat] = bbox(geojson)
      const boundbox = [[minLong, minLat], [maxLong, maxLat]]
      const {latitude, longitude, zoom} = new WebMercatorViewport().fitBounds(boundbox)
      dispatch(setTransition(250))
      dispatch(setViewState({latitude,longitude,zoom}))
      setTimeout(()=>{
        dispatch(removeTransition())
      }, 1000)
      return;
    }
    
    const {latitude, longitude, zoom} = initialState.viewState
    dispatch(setTransition(250))
    dispatch(setViewState({latitude,longitude,zoom}))
    setTimeout(()=>{
      dispatch(removeTransition())
    }, 1000)
  }, [dispatch])

  return (
    <CustomWidgetWrapper expandable={false} title={title} isLoading={isLoading}>
      <Grid item className={classes.main}>
        <Grid className={classes.content} direction='column' container>
          <Grid container spacing={5} className={classes.selectors}>
            {/* Services Selector */}
            <Selector
              id='serviceSelector'
              field={0}
              data={serviceSelection}
              filters={filters}
              addFilter={setFilters}
              callback={handleServiceChange}
            />
            {/* Location Selector */}
            <Selector
              id='locationSelector'
              field={2}
              data={locationSelection}
              filters={filters}
              addFilter={setFilters}
              callback={handleLocationChange}
              callbackProps={{data}}
            />
            <ClearFiltersButton
              filtersCallback={() => Object.keys(filters).length > 0}
              clearCallback={() => setFilters({})}
            />
          </Grid>
          {data.length > 0 && !isLoading && regions ? (
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
            <Grid item className={classes.error}>
              <Typography>
                No hay datos disponibles con los filtros seleccionados
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </CustomWidgetWrapper>
  );
}

const useSelectSyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    alignSelf: 'flex-start',
  },
}));

function Selector({
  id,
  field,
  type = _FilterTypes.IN,
  data,
  filters,
  addFilter,
  callback,
  callbackProps
}: {
  id: string;
  field: string | number;
  type?: _FilterTypes;
  data: any[];
  filters: Record<string, filterItem>;
  addFilter: any;
  callback?: Function;
  callbackProps?: Record<string, unknown>;
}) {
  const classes = useSelectSyles();

  const currentSelection = useMemo(() => {
    const filter = filters[id];
    if (filter) {
      return filter.value;
    }

    return 0;
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;

    addFilter((prev: any) => {
      if (value) {
        const newFilter: any = { id, value, type, field };
        prev[id] = newFilter;
        return { ...prev };
      }
      delete prev[id];
      return { ...prev };
    });
  };

  useEffect(() => {
    if (callback) {
      callback({ id, type, field, currentSelection, callbackProps });
    }
  }, [currentSelection, callback]);

  return (
    <Grid item className={classes.root}>
      <FormControl>
        <InputLabel>
          <Typography variant='caption'>Select</Typography>
        </InputLabel>
        <Select value={currentSelection} onChange={handleChange}>
          <MenuItem value={0}>
            <Typography variant='overline'>All</Typography>
          </MenuItem>
          {data &&
            data.map((d: string, index: number) => (
              <MenuItem value={d} key={index}>
                <Typography variant='overline'>{d}</Typography>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  );
}
