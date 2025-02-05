import { Grid } from '@material-ui/core';
import CustomColumnChart from 'components/common/customCharts/CustomColumnChart';
import TitleWrapper from 'components/common/TitleWrapper';
import { METHOD_NAMES } from 'components/views/mediaViews/utils/methodName';
import useMediaData from './hooks/useMediaData';
import NoWidgetData from 'components/common/customWidgets/NoWidgetData';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMediaFilter, removeMediaFilter } from 'store/mediaSlice';
import { FilterTypes } from 'utils/filterFunctions';
import regionName from './utils/getCountryByRegion';
import getSourceFilter from './utils/getSourceFilter';
import { MediaCountryContext } from 'components/views/mediaViews/utils';
import useViewFilterContinuity from './hooks/useViewFilterContinuity';

const column = 'country';
const source = 'meltwater';

export default function MediaOrigin() {
  const { value: countryIndex, label: viewFilter } =
    useContext(MediaCountryContext);
  const id = 'orígenes_de_los_medios' + (viewFilter ? `_${viewFilter}` : '');
  useViewFilterContinuity(id, countryIndex);
  const dispatch = useDispatch();
  const { data = [], isLoading } = useMediaData({
    id,
    methodName: METHOD_NAMES.MEDIA_ORIGINS,
    source,
    viewFilter,
  });

  //@ts-ignore
  const filters = useSelector((state) => state.media.filters) || {};

  const onSelectedCategoriesChange = useCallback(
    (categories) => {
      if (categories.length) {
        const valueFormatter = Object.fromEntries(
          categories.map((name: string) =>
            name === 'zz'
              ? ['zz', 'Otros países']
              : [name, regionName.of(name.toUpperCase())],
          ),
        );
        dispatch(
          addMediaFilter({
            source,
            column,
            owner: id,
            values: categories,
            type: FilterTypes.IN,
            valueFormatter,
          }),
        );
      } else {
        dispatch(
          removeMediaFilter({
            owner: id,
            column,
            source,
          }),
        );
      }
    },
    [data],
  );

  const selectedCategories = useMemo(
    () => getSourceFilter(id, filters, source) || [],
    [filters, id],
  );

  return (
    <Grid item xs={12} lg={viewFilter ? 12 : 4}>
      <TitleWrapper title='¿De dónde escribe?' isLoading={isLoading} filterable>
        <CustomColumnChart
          filterable
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={onSelectedCategoriesChange}
          data={data}
          labelFormater={(name: string) =>
            name === 'zz' ? 'Otros países' : regionName.of(name.toUpperCase())
          }
        />
        {!data.length && !isLoading && <NoWidgetData />}
      </TitleWrapper>
    </Grid>
  );
}
