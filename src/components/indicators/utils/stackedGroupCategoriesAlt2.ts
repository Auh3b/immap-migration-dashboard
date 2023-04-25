import { AggregationTypes, groupValuesByColumn } from "@carto/react-core";
import MethodFunc from "./methodType";

const stackedGroupCategoriesAlt2: MethodFunc = (input, column, params) => {
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

export default stackedGroupCategoriesAlt2