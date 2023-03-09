import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { sum } from 'd3';
import useWidgetEffect from '../utils/useWidgetEffect';

const labels = {};

function transformData(input: any[], column: string) {
  let nna_viven = sum(
    input.map((d) => d['nna_viven']),
    (i) => i,
  );
  let n_doce_die = sum(
    input.map((d) => d['n_doce_die']),
    (i) => i,
  );
  let n_seis_onc = sum(
    input.map((d) => d['n_seis_onc']),
    (i) => i,
  );

  return [
    {
      name: '0 - 5',
      value: nna_viven,
    },
    {
      name: '6 - 11',
      value: n_doce_die,
    },
    {
      name: '12 - 17',
      value: n_seis_onc,
    },
  ];
}

const NOTE = 'Rango de edades de niños, niñas y adolescentes viajando';
const title = 'Edades de NNA viajando';
const id = 'childTravelerAges';
const column = 'nna_viven';
const filterType = _FilterTypes.STRING_SEARCH;
const method = transformData;

const props = {
  title,
  column,
  id,
  filterType,
  method,
  labels,
};

export default function ChildTravelerAges({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
