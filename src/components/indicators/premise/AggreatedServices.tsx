import {
  Fab,
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
import { useMemo, useState } from 'react';
import MethodFunc from '../utils/methodType';
import { SERVICES_KEY, SERVICE_STAT_COLUMNS } from './utils/services';
import { UNICEF_COLORS } from 'theme';
import CustomWidgetWrapper from 'components/common/customWidgets/CustomWidgetWrapper';
import { filterItem, filterValues } from 'utils/filterFunctions';
import { _FilterTypes } from '@carto/react-core';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CustomConnectDotChart from 'components/common/customWidgets/CustomConnectDotChart';

const otherColumns = {
  country: 'ubicacion_',
  region: 'lugar_enc',
  organisation: 'org_pert',
  persons: 'nna_atend',
};

const SERVICE_STAT_COLUMNS_NAME = [
  'Capacidad diaria',
  'Personas atendidas ayer',
  'Promedio diario',
];

const STAT_CATEGORY_COLORS = new Map([
  ['Capacidad diaria', UNICEF_COLORS[5]],
  ['Personas atendidas ayer', UNICEF_COLORS[4]],
  ['Promedio diario', UNICEF_COLORS[0]],
]);

const column = 'serv_tipo1';

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
}));

const id = 'aggregatedService';
const title =
  'Capacidad de atención y operación del punto de servicio o ayuda humanitaria';
const methodParams = {
  otherColumns,
};

export default function AggreatedServices({ dataSource }: BasicWidgetType) {
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

  return (
    <CustomWidgetWrapper expandable={false} title={title} isLoading={isLoading}>
      <Grid item className={classes.main}>
        <Grid className={classes.content} direction='column' container>
          <Grid container spacing={5} className={classes.selectors}>
            <ServiceSelector
              data={serviceSelection}
              filters={filters}
              addFilter={setFilters}
            />
            <LocationSelector
              data={locationSelection}
              filters={filters}
              addFilter={setFilters}
            />
            <ClearFilters filters={filters} clearFilters={setFilters} />
          </Grid>
          <ChartLegend />
          {data &&
            !isLoading &&
            regions &&
            regions.map((groupName) => {
              return (
                <CustomConnectDotChart
                  key={groupName}
                  data={data}
                  groupName={groupName}
                />
              );
            })}
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

function ServiceSelector({ data, filters, addFilter }: any) {
  const id = 'serviceSelector';
  const field = 0;
  const type = _FilterTypes.IN;
  const classes = useSelectSyles();

  const currentService = useMemo(() => {
    const filter = filters[id];
    if (filter) {
      return filter.value;
    }

    return 0;
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    
    addFilter((prev:any)=>{
      if(value){
        const newFilter:any = {id, value, type, field}
        prev[id] = newFilter
        return {...prev}
      }
      delete prev[id]
      return {...prev}
    })
  };

  return (
    <Grid item className={classes.root}>
      <FormControl>
        <InputLabel>
          <Typography variant='caption'>Select</Typography>
        </InputLabel>
        <Select value={currentService} onChange={handleChange}>
          <MenuItem value={0}>
            <Typography variant='overline'>{'All'}</Typography>
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

function LocationSelector({ data, filters, addFilter }: any) {
  const id = 'locationSelector';
  const field = 2;
  const type = _FilterTypes.IN;
  const classes = useSelectSyles();
  const currentLocation = useMemo(() => {
    const filter = filters[id];
    if (filter) {
      return filter.value;
    }

    return 0;
  }, [filters]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    
    addFilter((prev:any)=>{
      if(value){
        const newFilter:any = {id, value, type, field}
        prev[id] = newFilter
        return {...prev}
      }
      delete prev[id]
      return {...prev}
    })
  };

  return (
    <Grid item className={classes.root}>
      <FormControl>
        <InputLabel>
          <Typography variant='caption'>Select</Typography>
        </InputLabel>
        <Select value={currentLocation} onChange={handleChange}>
          <MenuItem value={0}>
            <Typography variant='overline'>{'All'}</Typography>
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

const useClearStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(4) * -1,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      left: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  },
  text: {
    marginRight: theme.spacing(2),
  },
}));

function ClearFilters({ filters, clearFilters }: any) {
  const classes = useClearStyles();
  const hasFilters = useMemo(() => Object.keys(filters).length > 0, [filters]);
  const handleClearFilters = () => {
    clearFilters({});
  };
  return (
    <>
      {hasFilters && (
        <Fab
          onClick={handleClearFilters}
          size='large'
          variant='extended'
          className={classes.root}
        >
          <Typography
            color='inherit'
            variant='overline'
            className={classes.text}
          >
            Clear Filters
          </Typography>
          <ClearAllIcon />
        </Fab>
      )}
    </>
  );
}

const useLegendStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  legendItem: {
    gap: theme.spacing(2),
  },
  icon: {
    width: '10px',
    height: '10px',
    borderRadius: '100%',
  },
}));

function ChartLegend() {
  const classes = useLegendStyle();
  const legend = Array.from(STAT_CATEGORY_COLORS);
  return (
    <Grid item direction='column' container className={classes.root}>
      {legend.map(([title, color]) => (
        <Grid
          key={title}
          alignItems='center'
          item
          container
          className={classes.legendItem}
        >
          <span
            className={classes.icon}
            style={{ backgroundColor: color }}
          ></span>
          <Typography variant='overline'>{title}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
