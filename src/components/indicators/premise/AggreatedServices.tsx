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
import theme, { UNICEF_COLORS } from 'theme';
import { ascending } from 'd3';
import CustomWidgetWrapper from 'components/common/customWidgets/CustomWidgetWrapper';

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
  <CustomWidgetWrapper title={title} isLoading={isLoading}>
    <Grid item className={classes.main}>
      <Grid className={classes.content} direction='column' container>
        <ServiceSelector
          data={serviceSelection}
          selectService={setSelectedService}
        />
        <ChartLegend />
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
  </CustomWidgetWrapper>
  );
}

const useSelectSyles = makeStyles((theme)=>({
  root:{
    width: '50%',
    alignSelf:'flex-start',
  }
}))

function ServiceSelector({ data, selectService }: any) {
  const classes = useSelectSyles()
  const currentService = useRef<string>('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    currentService.current = event.target.value as string;
    selectService(event.target.value as string);
  };
  return (
    <Grid item className={classes.root}>
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

  const option = useMemo(
    () => ({
      title: {
        show: true,
        text: groupName,
      },
      grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'category',
        name: 'Organización/Servicio',
        nameLocation: 'end',
        nameTextStyle: {
          fontWeight: 'bold',
          align: 'center',
          verticalAlign: 'middle',
        },
        boundaryGap: true,
        axisLabel: {
          hideOverlap: true,
          width: 200,
          overflow: 'break',
        },
      },
      xAxis: {
        type: 'value',
        name: 'Personas',
        nameGap: 30,
        nameLocation: 'middle',
        nameTextStyle: {
          align: 'center',
          verticalAlign: 'middle',
          fontWeight: 'bold',
        },
        axisLabel: {
          hideOverlap: true,
        },
      },
      dataset: {
        dimensions: DATA_DIMENSIONS,
        source: data,
      },
      series: [
        {
          type:'custom',
          renderItem:(params: any, api: any)=>{
            const categoryIndex = api.value(5)
            const p1 = api.coord([api.value(6), categoryIndex])
            const p2 = api.coord([api.value(7), categoryIndex])
            const p3 = api.coord([api.value(8), categoryIndex]) 
            const points = [p1,p2,p3].sort((a,b) => ascending(a[0], b[0]))
            return ({
              type: 'polyline',
              shape: {
                points,
              },
              style: api.style({
                stroke: UNICEF_COLORS[6]
              })
            })
          }
        },
        {
          type: 'scatter',
          encode: {
            y: DATA_DIMENSIONS[5],
            x: DATA_DIMENSIONS[6],
          },
          itemStyle: {
            color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[6]),
          },
        },
        {
          type: 'scatter',
          encode: {
            y: DATA_DIMENSIONS[5],
            x: DATA_DIMENSIONS[7],
          },
          itemStyle: {
            color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[7]),
          },
        },
        {
          type: 'scatter',
          encode: {
            y: DATA_DIMENSIONS[5],
            x: DATA_DIMENSIONS[8],
          },
          itemStyle: {
            color: STAT_CATEGORY_COLORS.get(DATA_DIMENSIONS[8]),
          },
        },
        
      ],
      tooltip: {
        show: true,
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
        formatter({ data, encode }) {
          const {x: dimensionIndex} = encode
          return `<span 
            style='min-width: 35px;  display: flex; flex-direction: column;'
            >
            <span 
              style='display: flex; justify-content: space-between; gap: 10px; align-items: center;'
              >
              <span>Servicio</span>
              <span>${data[0]}</span>
            </span>
            <span 
              style='display: flex; justify-content: space-between; gap: 10px; align-items: center;'
              >
              <span>Organización</span>
              <span>${data[3]}</span>
            </span>
            <span 
              style='display: flex; justify-content: space-between; gap: 10px; align-items: center;'
              >
              <span>Personas</span>
              <span>${data[dimensionIndex]}</span>
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
      style={{ height: '1000px' }}
      opts={{ renderer: 'svg' }}
    />
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
