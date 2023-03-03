import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { sum } from 'd3';
import mainSource from 'data/sources/mainSource';

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

const NOTE = 'Rango de edades de niños, niñas y adolescentes viajando'

export default function ChildTravelerAges({
  dataSource
}: BasicWidgetType) {
  return (
    <Grid item>
      <CustomCategoryWidget
        title='Edades de NNA viajando'
        id='childTravelerAges'
        dataSource={dataSource}
        column={'nna_viven'}
        filterType={_FilterTypes.BETWEEN}
        method={transformData}
      />
      <WidgetNote note={NOTE}/>
    </Grid>
  );
}
