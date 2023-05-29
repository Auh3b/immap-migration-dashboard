import { addFilter, clearFilters, removeFilter } from '@carto/react-redux';
import { PieWidgetUI } from '@carto/react-ui';
import useWidgetFetch from './hooks/useWidgetFetch';
import { lazy, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFilterValues from './hooks/useWidgetFilterValues';
import { Link, makeStyles } from '@material-ui/core';
import { EXTENDED_PALETTE_RAND, UNICEF_COLORS } from 'theme';

const CustomWidgetWrapper = lazy(
  () => import('components/common/customWidgets/CustomWidgetWrapper'),
);

const EMPTY_ARRAY: [] = [];

const useStyles = makeStyles(() => ({
  main: {
    position: 'relative',
  },
  clearBtn: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    right: 0,
    zIndex: 100,
  },
}));

export default function CustomPieWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType,
  labels = {},
}: defaultCustomWidgetProps) {
  const classes = useStyles();
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
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
            values: categories,
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
    [column, dataSource, filterType, id, dispatch],
  );

  const handleClearClick = (e: any) => {
    e.preventDefault();
    dispatch(clearFilters(dataSource));
  };

  const { data, isLoading, error } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading} onError={error}>
      <div className={classes.main}>
        {selectedCategories && selectedCategories.length > 0 && (
          <Link
            className={classes.clearBtn}
            href='#'
            onClick={handleClearClick}
          >
            Clear
          </Link>
        )}
        {data && (
          <PieWidgetUI
            colors={EXTENDED_PALETTE_RAND}
            onSelectedCategoriesChange={handleSelectedCategoriesChange}
            selectedCategories={selectedCategories}
            labels={labels}
            data={data}
          />
        )}
      </div>
    </CustomWidgetWrapper>
  );
}
