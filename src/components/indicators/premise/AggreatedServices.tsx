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
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { ReactNode, useRef, useState } from 'react';
import MethodFunc from '../utils/methodType';
import TopLoading from 'components/common/TopLoading';
import { SERVICES_KEY, SERVICE_STAT_COLUMNS } from './utils/services';

const otherColumns = {
  country: 'ubicacion_',
  region: 'lugar_enc',
  organisation: 'org_pert',
  persons: 'nna_atend'
}

const SERVICE_STAT_COLUMNS_NAME = ['Capacidad diaria', 'Personas atendidas ayer', 'Promedio diario']

const column = 'serv_tipo1'

const method:MethodFunc =(input, column, params)=>{
  let output: any[] = []
  const {otherColumns} = params
  console.log(params)
  
  for (let serviceEntry of input){
    const services:number[] = serviceEntry[column].split(',').map((d:string)=> +d)

    services.forEach((service) => {
      const serviceColumns =  SERVICE_STAT_COLUMNS.get(service)
      for(let i = 0; i < serviceColumns.length; i++){
        const newEntry:any = {
          service: SERVICES_KEY.get(service),
          country: serviceEntry[otherColumns.country],
          region: serviceEntry[otherColumns.region],
          org: serviceEntry[otherColumns.organisation],
          personas: serviceEntry[otherColumns.persons],
          'org-service': `${serviceEntry[otherColumns.organisation]} - ${SERVICES_KEY.get(service)}`,
        }
        newEntry[SERVICE_STAT_COLUMNS_NAME[i]] = serviceEntry[serviceColumns[i]]
        output = [...output, newEntry]
      }
    });
  }
  
  return output
}

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),
  },
  title: {
    paddingBottom: theme.spacing(2),
  },
  menuItem: {},
}));

const id = 'aggregatedService'
const title =
  'Capacidad de atención y operación del punto de servicio o ayuda humanitaria';
const methodParams = {
  otherColumns
}


export default function AggreatedServices({ dataSource }: BasicWidgetType) {
  const [selectedService, setSelectedService] = useState('');
  const [data, setData] = useState([])
  const serviceSelection = Array.from(SERVICES_KEY.values())
  const classes = useStyles();
  const {
    data:_data,
    isLoading
  }= useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams
  })
  console.log(_data)
  return (
    <Grid item className={classes.main}>
      <Typography variant='subtitle1' className={classes.title}>
        {title}
      </Typography>
      <Divider />
      {isLoading && <TopLoading />}
      <Grid direction='column' container>
        <ServiceSelector data={serviceSelection} selectService={setSelectedService} />
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
          <MenuItem value={'All'}>
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