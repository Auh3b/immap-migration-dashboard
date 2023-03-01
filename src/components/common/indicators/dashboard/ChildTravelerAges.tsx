import { _FilterTypes } from '@carto/react-core';
import { selectSourceById } from '@carto/react-redux';
import CustomCategoryWidget from 'components/common/customWidgets/CustomCategoryWidget';
import TopLoading from 'components/common/TopLoading';
import useMapContext from 'context/useMapContext';
import { sum } from 'd3';
import mainSource from 'data/sources/mainSource';
import useWidgetFetch from 'hooks/useWidgetFetch';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

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
  const { hotspotsLayer } = useSelector(
    (state: RootState) => state.carto.layers,
  );
  const source = useSelector((state) =>
    selectSourceById(state, hotspotsLayer?.source),
  );
  const { mapRef } = useMapContext();
  const { data, error, isLoading } = useWidgetFetch({
    layerId: 'hotspotsLayer',
    mapRef,
    source,
    method: transformData,
  });

  return (
    <>
      {}
      {isLoading ? (
        <TopLoading />
      ) : error ? (
        <div>No data</div>
      ) : (
        <CustomCategoryWidget
          title='Rango de edad de niños que están viajando'
          id='childTravelerAges'
          /* @ts-ignore */
          data={data}
          dataSource={mainSource.id}
          column={'nna_viven'}
          filterType={_FilterTypes.BETWEEN}
        />
      )}
    </>
  );
}
