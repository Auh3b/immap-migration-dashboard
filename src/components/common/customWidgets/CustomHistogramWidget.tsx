import { _FilterTypes } from '@carto/react-core';
import { addFilter, removeFilter } from '@carto/react-redux';
import { HistogramWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';

const EMPTY_ARRAY: [] = [];

export default function CustomHistogramWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType = _FilterTypes.CLOSED_OPEN,
  min,
  max,
  ticks = [],
  xAxisFormatter,
  yAxisFormatter
}: defaultCustomWidgetProps) {

  const dispatch = useDispatch()
  
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });

  const thresholdsFromFilters = useWidgetFilterValues({
    dataSource,
    id,
    column,
    type: filterType
  });

  const selectedBars = useMemo(() => {
    return (thresholdsFromFilters || EMPTY_ARRAY)
    //@ts-ignore
      .map(([from, to]) => {
        if (typeof from === 'undefined' || from === null) {
          return 0;
        } else if (typeof to === 'undefined' || to === null) {
          return ticks.length;
        } else {
          const idx = ticks.indexOf(from);
          return idx !== -1 ? idx + 1 : null;
        }
      })
      .filter((v:any) => v !== null);
  }, [thresholdsFromFilters, ticks]);

  const handleSelectedBarsChange = useCallback(
    (selectedBars) => {
      if (selectedBars?.length) {
        const thresholds = selectedBars.map((i:any) => {
          let left = ticks[i - 1];
          let right = ticks.length !== i ? ticks[i] : undefined;

          return [left, right];
        });
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
            values: thresholds,
            owner: id
          })
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column,
            owner: id
          })
        );
      }
    },
    [column, dataSource, id, dispatch, ticks]
  );

  console.log(data)

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading}>
      <HistogramWidgetUI
        data={data}
        min={min}
        max={max}
        ticks={ticks}
        selectedBars={selectedBars}
        onSelectedBarsChange={handleSelectedBarsChange}
        xAxisFormatter={xAxisFormatter}
        yAxisFormatter={yAxisFormatter}
      />
    </WrapperWidgetUI>
  );
}
