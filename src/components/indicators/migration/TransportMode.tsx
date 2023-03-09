import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { ReactNode, useEffect, useState } from 'react';
import useWidgetEffect from '../utils/useWidgetEffect';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Bus'],
  [2, 'Barco'],
  [3, 'Avión'],
  [4, 'Han camina'],
  [5, 'otro'],
]);

interface getCategoriesProps {
  data: any[];
  valuesColumns?: string[];
  keysColumn?: string;
  operation?: AggregationTypes;
}

function getCategories({
  data,
  valuesColumns,
  keysColumn,
  operation,
}: getCategoriesProps) {
  return groupValuesByColumn({
    data,
    valuesColumns,
    keysColumn,
    operation,
  });
}

function pivotData(data: any[], column: string): any[] {
  //@ts-ignore
  const values = data.map((f) => f[column]).filter((i) => i !== 'null');
  const valueString: string = values.join(',');
  const valuesArray: any[] = valueString.split(',');
  const pivotedData = valuesArray
    .filter((i: string) => i.length > 0)
    .map((i: any) => Object.fromEntries(new Map([[column, i]])));
  const groupData = getCategories({
    data: pivotedData,
    valuesColumns: [column],
    keysColumn: column,
    operation: AggregationTypes.COUNT,
  });
  return groupData;
}

const NOTE = 'Medios de transporte empleados durante la ruta';
const id = 'transportMode';
const title = 'Medios de transporte';
const column = 'medios_tra';
const filterType = _FilterTypes.STRING_SEARCH;
const method = pivotData;
const labels = Object.fromEntries(CATEGORY_ABREVATIONS);

const props = {
  id,
  title,
  column,
  method,
  filterType,
  labels,
};

export default function TransportMode({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
