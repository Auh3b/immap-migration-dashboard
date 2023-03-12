import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import ToggleWidget from 'components/common/customWidgets/ToggleWidget';
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
    ['nna_viven',{
      label: '0 - 5',
      name: 'nna_viven',
      value: nna_viven,
      // variables: Array.from(new Set(input.map((d) => d['nna_viven'])))
    }],
    ['n_doce_die',{
      label: '6 - 11',
      name: 'n_doce_die',
      value: n_doce_die,
      // variables: Array.from( new Set(input.map((d) => d['n_doce_die'])))
    }],
    ['n_seis_onc',{
      label: '12 - 17',
      name: 'n_seis_onc',
      value: n_seis_onc,
      // variables: Array.from( new Set(input.map((d) => d['n_seis_onc'])))
    }],
  ];
}

const NOTE = 'Rango de edades de niños, niñas y adolescentes viajando';
const title = 'Edades de NNA viajando';
const id = 'childTravelerAges';
const column = 'nna_viven';
const filterType = _FilterTypes.IN;
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
    <ToggleWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}

