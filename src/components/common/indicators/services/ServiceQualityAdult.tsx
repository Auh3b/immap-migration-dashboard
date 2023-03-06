import {
  AggregationTypes,
  groupValuesByColumn,
  _FilterTypes,
} from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomPieWidget from 'components/common/customWidgets/CustomPieWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';

const labels = {
  1: 'Satisfecho',
  2: 'Algo satisfecho',
  3: 'Insatisfecho',
};

const NOTE = 'Nivel de satisfacción del servicio prestado al migrante';
const id = 'serviceQualityAdult';
const title = 'Calidad del servicio';
const column = 'cb_fl_co_2';
const filterType = _FilterTypes.IN;
const operationDefault = AggregationTypes.COUNT;

const method = (input: any[], column: string): any[] => {
  return groupValuesByColumn({
    data: input,
    keysColumn: column,
    valuesColumns: [column],
    operation: operationDefault,
  });
};

export default function ServiceQualityAdult({
  dataSource,
  operation,
}: BasicWidgetType) {
  return (
    <Grid item>
      <CustomPieWidget
        id={id}
        title={title}
        dataSource={dataSource}
        filterType={filterType}
        column={column}
        method={method}
        labels={labels}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
