import MethodFunc from './methodType';
import { SERVICES_KEY, SERVICE_STAT_COLUMNS } from '../premise/utils/services';
import { SERVICE_STAT_COLUMNS_NAME } from '../premise/AggreatedServices';

const getConnectDotServices: MethodFunc = (input, column, params) => {
  let output: any[] = [];
  const { otherColumns } = params;

  for (let serviceEntry of input) {
    const services: number[] = serviceEntry[column]
      .split(',')
      .map((d: string) => +d);

    for (let service of services) {
      const serviceColumns = SERVICE_STAT_COLUMNS.get(service);
      if (serviceColumns) {
        let newEntry: any[] = [
          service ?? 'Otro',
          null,
          serviceEntry[otherColumns.region],
          serviceEntry[otherColumns.organisation],
          serviceEntry[otherColumns.persons],
          `${serviceEntry[otherColumns.organisation]} - ${SERVICES_KEY.get(service) ?? 'Otro'}`,
          [serviceEntry[otherColumns.long], serviceEntry[otherColumns.lat]],
        ];
        let columnValues: any[] = [];
        for (let i = 0; i < SERVICE_STAT_COLUMNS_NAME.length; i++) {
          columnValues = [
            ...columnValues,
            serviceEntry[serviceColumns[i]] || 0,
          ];
        }
        const id = `${newEntry[3]}-${SERVICES_KEY.get(newEntry[0]) ?? 'Otro'}+${newEntry[2]} - ${newEntry.at(-1).join('-')}`;
        output = [...output, [...newEntry, ...columnValues, id]];
      }
    }
  }
  return output;
};

export default getConnectDotServices