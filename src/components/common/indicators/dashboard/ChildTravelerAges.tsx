import { _FilterTypes } from '@carto/react-core';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
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
      name: 'nna_viven',
      value: nna_viven,
    },
    {
      name: 'n_doce_die',
      value: n_doce_die,
    },
    {
      name: 'n_seis_onc',
      value: n_seis_onc,
    },
  ];
}

export default function ChildTravelerAges() {
  return (
    <CustomCategoryWidget
      title='Rango de edad de niños que están viajando'
      id='childTravelerAges'
      dataSource={mainSource.id}
      column={'nna_viven'}
      filterType={_FilterTypes.BETWEEN}
      method={transformData}
    />
  );
}
