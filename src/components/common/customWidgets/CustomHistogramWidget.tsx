import { AggregationTypes, histogram, _FilterTypes } from '@carto/react-core';
import { addFilter, removeFilter } from '@carto/react-redux';
import { HistogramWidgetUI } from '@carto/react-ui';
import { extent } from 'd3';
import { lazy, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';

const CustomWidgetWrapper = lazy(()=> import('components/common/customWidgets/CustomWidgetWrapper'))

const EMPTY_ARRAY: [] = [];

export default function CustomHistogramWidget({
  id,
  title,
  method,
  dataSource,
  column,
  bins = 3,
  filterType = _FilterTypes.CLOSED_OPEN,
  xAxisFormatter,
  yAxisFormatter,
}: defaultCustomWidgetProps) {
  const dispatch = useDispatch();

  const { data: _data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });

  const range = useMemo(() => {
    if (_data.length > 0) {
      return extent(_data.map((d) => d.value));
    }

    return null;
  }, [_data]);

  const ticks = useMemo(() => {
    if (range) {
      const [min, max] = range;
      const result = [];
      for (let i = 1; i < bins; i += 1) {
        result.push(min + (max - min) * (i / bins));
      }
      return result;
    }
    return [];
  }, [range, bins]);

  const data = useMemo(() => {
    if (_data && range && ticks) {
      return histogram({
        data: _data,
        valuesColumns: ['value'],
        ticks,
        operation: AggregationTypes.COUNT,
      });
    }
    return null;
  }, [_data, range, ticks]);

  const thresholdsFromFilters = useWidgetFilterValues({
    dataSource,
    id,
    column,
    type: filterType,
  });

  const selectedBars = useMemo(() => {
    return (
      (thresholdsFromFilters || EMPTY_ARRAY)
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
        .filter((v: any) => v !== null)
    );
  }, [thresholdsFromFilters, ticks]);

  const handleSelectedBarsChange = useCallback(
    (selectedBars) => {
      if (selectedBars?.length) {
        const thresholds = selectedBars.map((i: any) => {
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
    [column, dataSource, id, filterType, dispatch, ticks],
  );

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {range && data && ticks && (
        <HistogramWidgetUI
          data={data}
          min={range[0]}
          max={range[1]}
          ticks={ticks}
          selectedBars={selectedBars}
          onSelectedBarsChange={handleSelectedBarsChange}
          xAxisFormatter={xAxisFormatter}
          yAxisFormatter={yAxisFormatter}
        />
      )}
    </CustomWidgetWrapper>
  );
}
