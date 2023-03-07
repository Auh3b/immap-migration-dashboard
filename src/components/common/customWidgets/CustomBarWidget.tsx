import { FilterTypes } from '@carto/react-core/src/filters/FilterTypes';
import { addFilter, removeFilter } from '@carto/react-redux';
import { BarWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import WidgetWithAlert from '../../indicators/WidgetWithAlert';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';

const EMPTY_ARRAY: [] = [];

export default function CustomBarWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType,
  labels = {},
  order = [],
}: defaultCustomWidgetProps) {
  const dispatch = useDispatch();

  const {
    data: _data = [],
    isLoading,
    error,
  } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });

  const sortedData = useMemo(() => {
    if (!_data.length || _data) return _data;
    //@ts-ignore
    const sortedByValue = _data.sort((a, b) => b.value - a.value);

    if (order.length) {
      //@ts-ignore
      return sortedByValue.sort((a, b) => {
        const aIndex = order.indexOf(a.name);
        const bIndex = order.indexOf(b.name);

        return aIndex !== -1 && bIndex !== -1
          ? aIndex - bIndex
          : bIndex - aIndex;
      });
    }

    return sortedByValue;
  }, [order, _data]);

  // For selecting bars, BarWidgetUI uses the index of the bar
  // so we need to process it before passing it to BarWidgetUI
  const _selectedBars =
    useWidgetFilterValues({ dataSource, id, column, type: FilterTypes.IN }) ||
    EMPTY_ARRAY;

  const selectedBars = useMemo(() => {
    //@ts-ignore
    return _selectedBars.map((category) =>
      //@ts-ignore
      sortedData.findIndex((d) => d.name === category),
    );
  }, [_selectedBars, sortedData]);

  const handleSelectedBarsChange = useCallback(
    (selectedBarsIdxs) => {
      if (selectedBarsIdxs?.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType || FilterTypes.IN,
            //@ts-ignore
            values: selectedBarsIdxs.map((idx) => sortedData[idx].name),
            owner: id,
          }),
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column,
            owner: id,
          }),
        );
      }
    },
    [column, dataSource, id, filterType, dispatch, sortedData],
  );

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading} onError={error}>
      <WidgetWithAlert dataSource={dataSource}>
        {(!!sortedData || !isLoading) && (
          <BarWidgetUI
            selectedBars={selectedBars}
            onSelectedBarsChange={handleSelectedBarsChange}
            labels={labels}
            //@ts-ignore
            xAxisData={sortedData.map((category) => category.name)}
            //@ts-ignore
            yAxisData={sortedData.map((category) => category.value)}
          />
        )}
      </WidgetWithAlert>
    </WrapperWidgetUI>
  );
}
