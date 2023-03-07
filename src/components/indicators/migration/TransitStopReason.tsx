import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

/**
 * cb_fl_c_16: Tengo problemas de salud (o mi grupo de viaje)
 * cb_fl_c_17: Necesito descansar unos días antes de continuar
 * cb_fl_c_18: No tengo dinero para continuar con el viaje
 * cb_fl_c_19: Tuve problemas con autoridades migratorias
 * cb_fl_c_20: Encontré trabajo temporal
 * cb_fl_c_21: Decidí quedarme un tiempo en el lugar que estoy
 * cb_fl_c_22: El clima no es favorable para viajar
 * cb_fl_c_24: No viajo por cuestiones de seguridad.
 *
 */

const CATEGORY_ABREVATIONS = new Map([
  [0, 'Ninguna'],
  [1, 'Tengo problemas de salud (o mi grupo de viaje)'],
  [2, 'Necesito descansar unos días antes de continuar	'],
  [3, 'No tengo dinero para continuar con el viaje	'],
  [4, 'Tuve problemas con autoridades migratorias'],
  [5, 'Encontré trabajo temporal	'],
  [6, 'Decidí quedarme un tiempo en el lugar que estoy'],
  [6, 'El clima no es favorable para viajar'],
  [6, 'No viajo por cuestiones de seguridad'],
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
  const valueString: string = values.join('.');
  const valuesArray: any[] = valueString.split('.');
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
const column = 'cb_fl_c_15';
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
