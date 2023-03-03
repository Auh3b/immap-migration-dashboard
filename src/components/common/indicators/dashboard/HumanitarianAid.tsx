import { Grid } from '@material-ui/core';
import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import mainSource from 'data/sources/mainSource';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Alimentación o kit de alimentación'],
  [2, ' Alojamiento temporal / albergue'],
  [3, 'Salud, primeros auxilios o atención médica'],
  [4, 'Agua potable'],
  [5, 'Duchas o baños'],
  [6, 'Kit de inodoro o elementos de higiene'],
  [7, 'Información / asistencia legal'],
  [8, 'Ayuda psicológica'],
  [9, 'Dinero en efectivo'],
  [10, 'Transporte humanitario'],
  [11, 'Otro'],
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

const dataSource = mainSource.id;
const column = 'ayudas_hum';
const id = 'humanitarianAid';
const type = _FilterTypes.STRING_SEARCH;

const NOTE = 'Ayudas humanitarias recibidas según zona de tránsito'

export default function HumanitarianAid() {
  return (
    <Grid item>
      <CustomCategoryWidget
        title='Ayudas humanitarias'
        dataSource={dataSource}
        column={column}
        id={id}
        filterType={type}
        method={pivotData}
        labels={Object.fromEntries(CATEGORY_ABREVATIONS)}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
