import { addFilter, removeFilter } from '@carto/react-redux';
import { CategoryWidgetUI } from '@carto/react-ui';
import useWidgetFetch from './hooks/useWidgetFetch';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';
import CustomWidgetWrapper from './CustomWidgetWrapper';
import { _FilterTypes } from '@carto/react-core';
import getStringSearchValue from 'utils/getStringSearchValue';

const EMPTY_ARRAY: [] = [];

export default function CustomCategoryWidget({
  id,
  title,
  methodName,
  dataSource,
  column,
  filterType,
  filterParams = {},
  labels,
  order = 'ranking',
}: defaultCustomWidgetProps) {
  const dispatch = useDispatch();
  const selectedCategories =
    useWidgetFilterValues({
      dataSource,
      column,
      id,
      type: filterType,
    }) || EMPTY_ARRAY;

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      if (categories && categories.length) {
        const withRegExp =
          filterType === _FilterTypes.STRING_SEARCH
            ? categories.map((d: any) => `^(.*,|)${d}(,.*|)$`)
            : categories;

        const valueFormatter =
          filterType === _FilterTypes.STRING_SEARCH
            ? Object.fromEntries(
                withRegExp.map((strExp: string) => [
                  strExp,
                  labels[Number(getStringSearchValue(strExp))],
                ]),
              )
            : labels
            ? labels
            : null;

        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
            values: withRegExp,
            params: {
              valueFormatter,
              ...filterParams,
            },
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
    [column, dataSource, filterType, labels, id, dispatch],
  );

  const { data, isLoading, error } = useWidgetFetch({
    id,
    dataSource,
    methodName,
    column,
  });

  const maxItems = useMemo(() => {
    let defaultMax = 5;
    if (data.length === 0) {
      return defaultMax;
    }

    const dataCount = data.length;

    if (dataCount === defaultMax + 1) {
      return defaultMax - 1;
    }

    return defaultMax;
  }, [data]);

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading} onError={error}>
      <CategoryWidgetUI
        maxItems={maxItems}
        order={order}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
        selectedCategories={selectedCategories}
        labels={labels}
        data={data}
      />
    </CustomWidgetWrapper>
  );
}
