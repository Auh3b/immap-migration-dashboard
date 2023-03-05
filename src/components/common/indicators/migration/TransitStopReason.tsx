import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

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

const NOTE = 'Razón (es) para no continuar el viaje. ';
const id = 'transitStopReason';
const title = 'Razón no continúa viaje';
const column = 'medios_tra';
const filterType = _FilterTypes.STRING_SEARCH;
const method = pivotData;

export default function TransitStopReason({ dataSource }: BasicWidgetType) {
  return (
    <Grid item>
      <CustomCategoryWidget
        id={id}
        title={title}
        dataSource={dataSource}
        column={column}
        method={method}
        filterType={filterType}
        labels={Object.fromEntries(CATEGORY_ABREVATIONS)}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
