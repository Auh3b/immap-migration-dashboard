import { Grid } from '@material-ui/core';
import React from 'react';
import MethodFunc from '../utils/methodType';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import useWidgetEffect from '../utils/useWidgetEffect';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import {
  AggregationTypes,
  _FilterTypes,
  groupValuesByColumn,
} from '@carto/react-core';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const method: MethodFunc = (input, column, params) => {
  const { valueColumn } = params;
  const output = groupValuesByColumn({
    data: input,
    keysColumn: column,
    valuesColumns: [valueColumn],
    operation: AggregationTypes.AVG,
  });

  return output;
};
const title =
  'Días promedio transcurridos entre Enganche y último monitoreo por país';
const id = 'avgDaysByCountry';
const column = 'pais_fin';
const NOTE =
  'Tiempo estimado (días) que ha transcurrido entre el enganche y el último país  de localización reportado';
const filterType = _FilterTypes.IN;
const methodParams = {
  valueColumn: 'dias',
};
const props = {
  title,
  id,
  column,
  filterType,
  method,
  methodParams,
};

export default function AvgDayByCountry({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomBarWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
