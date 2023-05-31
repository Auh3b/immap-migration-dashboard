import MethodFunc from './methodType';

const getConnectDotServices: MethodFunc = (input, column, params) => {
  let output: any[] = [];
  const { otherColumns, serviceStatColumns, servicesKey, serviceStatColumnLength } = params;

  for (let serviceEntry of input) {
    const services: number[] = serviceEntry[column]
      .split(',')
      .map((d: string) => +d);

    for (let service of services) {
      const serviceColumns = serviceStatColumns[service];
      if (serviceColumns) {
        let newEntry: any[] = [
          service ?? 'Otro',
          null,
          serviceEntry[otherColumns.region],
          serviceEntry[otherColumns.organisation],
          serviceEntry[otherColumns.persons],
          `${serviceEntry[otherColumns.organisation]} - ${servicesKey[service] ?? 'Otro'}`,
          [serviceEntry[otherColumns.long], serviceEntry[otherColumns.lat]],
        ];
        let columnValues: any[] = [];
        for (let i = 0; i < serviceStatColumnLength; i++) {
          columnValues = [
            ...columnValues,
            serviceEntry[serviceColumns[i]] || 0,
          ];
        }
        const id = `${newEntry[3]}-${servicesKey[newEntry[0]] ?? 'Otro'}+${newEntry[2]} - ${newEntry.at(-1).join('-')}`;
        output = [...output, [...newEntry, ...columnValues, id]];
      }
    }
  }
  return output;
};

export default getConnectDotServices