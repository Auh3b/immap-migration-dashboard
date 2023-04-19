import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import ReactEchart from 'echarts-for-react';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { useMemo, useRef, useState } from 'react';
import MethodFunc from '../utils/methodType';
import { SERVICES_KEY, SERVICE_STAT_COLUMNS } from './utils/services';
import { graphic } from 'echarts';
import { UNICEF_COLORS } from 'theme';

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
        serviceEntry[otherColumns.country],
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
      const filterData = _data.filter((d: any) => selectedService === d[0]);
      setData(filterData);
      return;
    }

    setData(_data);
  }, [_data, selectedService]);

  const regions = useMemo(
    () => data && Array.from(new Set(data.map((d: any) => d[2]))),
    [data],
  );

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
        {data &&
          !isLoading &&
          regions &&
          regions.map((groupName) => {
            return (
              <ConnectDotChart
                key={groupName}
                data={data}
                groupName={groupName}
              />
            );
          })}
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

function ConnectDotChart({ data: _data, groupName }: any) {
  const theme = useTheme();
  const DATA_DIMENSIONS = [
    'service',
    'country',
    'region',
    'organisation',
    'personas',
    'org/service',
    'Capacidad diaria',
    'Personas atendidas ayer',
    'Promedio diario',
  ];

  const data = useMemo(
    () => _data.filter((d: any) => d[2] === groupName),
    [_data],
  );

  console.log(data);

  const option = useMemo(
    () => ({
      title: {
        show: true,
        text: groupName,
        // top: 'center',
        // left: 'center',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'category',
        axisLabel: {
          width: 150,
          overflow: 'break',
          formatter: (value: string) => {
            const newLabel = value.split(' - ');
            return `${newLabel[0]} \n ${newLabel[1]}`;
          },
        },
      },
      xAxis: {
        type: 'value',
      },
      dataZoom: {
        type: 'inside',
      },
      dataset: {
        dimensions: DATA_DIMENSIONS,
        source: data,
      },
      series: [
        {
          type: 'scatter',
          encode: {
            y: DATA_DIMENSIONS[5],
            x: DATA_DIMENSIONS[6],
          },
        },
        {
          type: 'scatter',
          encode: {
            y: DATA_DIMENSIONS[5],
            x: DATA_DIMENSIONS[7],
          },
        },
        {
          type: 'scatter',
          encode: {
            y: DATA_DIMENSIONS[5],
            x: DATA_DIMENSIONS[8],
          },
        },
      ],
      tooltip: {
        show: true,
        position: 'top',
        padding: [theme.spacing(0.5), theme.spacing(1)],
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 12,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
        //@ts-ignore
        formatter({ data }) {
          return `<span 
            style='min-width: 35px; display: flex; flex-direction: column;'
            >
            <span 
              style='display: flex; justify-content: space-between; align-items: center;'
              >
              <span>Servicio</span>
              <span>${data[0]}</span>
            </span>
            <span 
              style='display: flex; justify-content: space-between; align-items: center;'
              >
              <span>Organización</span>
              <span>${data[3]}</span>
            </span>
            <span 
              style='display: flex; justify-content: space-between; align-items: center;'
              >
              <span>Personas</span>
              <span>${data[4]}</span>
            </span>
          </span>`;
        },
      },
    }),
    [data],
  );
  return (
    <ReactEchart
      option={option}
      style={{ height: '500px' }}
      opts={{ renderer: 'svg' }}
    />
  );
}
