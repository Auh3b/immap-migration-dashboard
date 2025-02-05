import { FilterTypes } from '@carto/react-core/src/filters/FilterTypes';
import { addFilter, removeFilter } from '@carto/react-redux';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import WidgetWithAlert from '../../indicators/WidgetWithAlert';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import CustomBarWidgetUI from '../customCharts/CustomBarWidgetUI';

const EMPTY_ARRAY: [] = [];

export default function CustomBarWidget({
  id,
  title,
  methodName,
  methodParams,
  dataSource,
  column,
  filterType,
  yAxisFormatter,
  labels,
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
    methodName,
    column,
    methodParams,
  });

  const sortedData = useMemo(() => {
    if (!_data.length) return _data;

    const sortedByValue = _data.sort((a, b) => b.value - a.value);

    if (order.length && order.length > 0) {
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
            params: {
              valueFormatter: labels,
            },
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
    <CustomWidgetWrapper title={title} isLoading={isLoading} onError={error}>
      <WidgetWithAlert dataSource={dataSource}>
        {(!!sortedData || !isLoading) && (
          <CustomBarWidgetUI
            height={400}
            selectedBars={selectedBars}
            // @ts-ignore
            yAxisFormatter={yAxisFormatter}
            onSelectedBarsChange={handleSelectedBarsChange}
            labels={labels}
            //@ts-ignore
            xAxisData={sortedData.map((category) => category.name)}
            //@ts-ignore
            yAxisData={sortedData.map((category) => category.value)}
          />
        )}
      </WidgetWithAlert>
    </CustomWidgetWrapper>
  );
}
