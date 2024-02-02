import MethodFunc from './methodType';
import { defaultFilterFunction } from './miscelleniousFunctions';

/**
 * Return an array of values for the Connect dot visual
 */
const getConnectDotServices: MethodFunc<any[]> = (input, column, params) => {
  let output: any[] = [];
  const {
    otherColumns,
    serviceStatColumns,
    servicesKey,
    serviceStatColumnLength,
  } = params;

  for (let serviceEntry of input) {
    const services: number[] = serviceEntry[column]
      .split('|')
      .map((d: string) => +d);

    for (let service of services) {
      const serviceColumns = serviceStatColumns[service];
      if (serviceColumns) {
        let newEntry: any[] = [
          service ?? 'Otro',
          null,
          serviceEntry[otherColumns.region],
          serviceEntry[otherColumns.principal],
          serviceEntry[otherColumns.implemetor],
          serviceEntry[otherColumns.persons],
          `${serviceEntry[otherColumns.principal]} - ${
            servicesKey[service] ?? 'Otro'
          }`,
          [serviceEntry[otherColumns.long], serviceEntry[otherColumns.lat]],
        ];
        let columnValues: any[] = [];
        for (let i = 0; i < serviceStatColumnLength; i++) {
          columnValues = [
            ...columnValues,
            serviceEntry[serviceColumns[i]] || 0,
          ];
        }
        const id = `${newEntry[3]}-${servicesKey[newEntry[0]] ?? 'Otro'}+${
          newEntry[2]
        } - ${newEntry[newEntry.length - 1].join('-')}`;
        output = [...output, [...newEntry, ...columnValues, id]];
      }
    }
  }
  // @ts-ignore
  return defaultFilterFunction(output, 8);
};

export default getConnectDotServices;
