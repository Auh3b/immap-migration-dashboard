import { useMemo } from 'react';
import TitleWrapper from './utils/TitleWrapper';
import { IndicatorProps } from './utils/introductionTypes';
import MethodFunc from '../utils/methodType';
import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { UNICEF_COLORS } from 'theme';
import { SERVICES_KEY, SERVICE_STAT_COLUMNS } from '../premise/utils/services';

const title = 'Top 3 de servicios sobrepasados en su capacidad';
const subtitle = '';
const column = 'serv_tipo1';
const id = 'topServices';
const source = 'premiseData';

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

const firstMethod: MethodFunc = (input, column, params) => {
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
  console.log(output);
  return output;
};

const secondMethod: MethodFunc = (input, column, params) => {
  let output: any[] = [];
  const { columns: valueColumns } = params;

  const services = new Map(
    Array.from(
      new Set(input.map((d) => d[column] + '_' + d[column + '_1'])),
    ).map((d) => {
      const [key, name] = d.split('_');
      return [+key, name];
    }),
  );

  for (let valueColumn of valueColumns) {
    const aggregatedValueByColumn = groupValuesByColumn({
      data: input,
      keysColumn: column,
      valuesColumns: [valueColumn],
      operation: AggregationTypes.SUM,
    });

    for (let [key, service] of Array.from(services)) {
      const serviceValue = aggregatedValueByColumn.filter(
        ({ name }) => name === key,
      )[0];
      //@ts-ignore
      serviceValue[valueColumn] = serviceValue.value ?? 0;
      //@ts-ignore
      const outputIndex = output.findIndex((d) => +d?.name === key);
      if (outputIndex >= 0) {
        const existing = output[outputIndex];
        const newObject = { ...existing, ...serviceValue };
        output[outputIndex] = newObject;
      } else {
        output = [...output, serviceValue];
      }
    }
  }

  output = output.map((d) => {
    const total = d[valueColumns[0]] + d[valueColumns[1]] + d[valueColumns[2]];
    const m14 = d['m14'] / total;
    const m15 = d['m15'] / total;
    const m16 = d['m16'] / total;

    return {
      ...d,
      id: d.name,
      name: services.get(d.name),
      m14,
      m15,
      m16,
    };
  });
  return output;
};

export default function TopServices({
  data: _data,
  isLoading,
}: IndicatorProps) {
  const data = useMemo(() => {
    if (_data) {
      console.log(_data);
      return [];
    }
  }, [_data]);

  return (
    <TitleWrapper
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
    ></TitleWrapper>
  );
}
