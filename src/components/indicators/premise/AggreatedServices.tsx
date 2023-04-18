import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ReactEchart from 'echarts-for-react';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { useMemo, useRef, useState } from 'react';
import MethodFunc from '../utils/methodType';
import { SERVICES_KEY, SERVICE_STAT_COLUMNS } from './utils/services';
import { EChartsOption, graphic } from 'echarts';

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
      for (let i = 0; i < serviceColumns.length; i++) {
        const newEntry: any = {
          service: SERVICES_KEY.get(service),
          country: serviceEntry[otherColumns.country],
          region: serviceEntry[otherColumns.region],
          org: serviceEntry[otherColumns.organisation],
          personas: serviceEntry[otherColumns.persons],
          'org-service': `${
            serviceEntry[otherColumns.organisation]
          } - ${SERVICES_KEY.get(service)}`,
        };
        newEntry[SERVICE_STAT_COLUMNS_NAME[i]] =
          serviceEntry[serviceColumns[i]];
        output = [...output, newEntry];
      }
    });
  }

  return output;
};

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),
  },
  title: {
    paddingBottom: theme.spacing(2),
  },
  menuItem: {},
  content: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const id = 'aggregatedService';
const title =
  'Capacidad de atención y operación del punto de servicio o ayuda humanitaria';
const methodParams = {
  otherColumns,
};

export default function AggreatedServices({ dataSource }: BasicWidgetType) {
  const [selectedService, setSelectedService] = useState('');
  const [data, setData] = useState(null);
  const serviceSelection = Array.from(SERVICES_KEY.values());
  const classes = useStyles();
  const { data: _data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams,
  });

  useMemo(() => {
    if (_data.length === 0) {
      return;
    }

    if (selectedService) {
      const filterData = _data.filter(
        ({ service }) => selectedService === service,
      );
      setData(filterData);
      return;
    }

    setData(_data);
  }, [_data, selectedService]);

  console.log(data);

  return (
    <Grid item className={classes.main}>
      <Typography variant='subtitle1' className={classes.title}>
        {title}
      </Typography>
      <Divider />
      <Grid className={classes.content} direction='column' container>
        <ServiceSelector
          data={serviceSelection}
          selectService={setSelectedService}
        />
        {data && !isLoading && <ConnectDotChart data={data} />}
      </Grid>
    </Grid>
  );
}

function ServiceSelector({ data, selectService }: any) {
  const currentService = useRef<string>('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    currentService.current = event.target.value as string;
    selectService(event.target.value as string);
  };
  return (
    <Grid item>
      <FormControl>
        <InputLabel>
          <Typography variant='caption'>Select</Typography>
        </InputLabel>
        <Select value={currentService.current} onChange={handleChange}>
          <MenuItem value={''}>
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

function ConnectDotChart({ data }: any) {
  const option = useMemo(
    () => ({
      yAxis: {
        data: data.map((d: any) => d['org-service']),
      },
      xAxis: {
        type: 'value',
      },
      series: {
        type: 'line',
        data: data.map((d: any) => Object.values(d).at(-1)),
      },
    }),
    [data],
  );
  return <ReactEchart option={option} />;
}
