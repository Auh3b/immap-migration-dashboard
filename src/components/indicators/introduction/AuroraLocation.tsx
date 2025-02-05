import { Fragment, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import IntroPieChart from '../../common/customCharts/CustomPieWidgetUI';
import useIntroCategoryChange from './hooks/useCategoryChange';
import getSourceFilter from '../media/utils/getSourceFilter';
import { useSelector } from 'react-redux';
import useIntroData from './hooks/useIntroData';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const title = 'Distribución por zona geográfica donde la  persona conectó';
const column = 'e004_regio';
const subtitle = '';
const id = 'aurora_ubicaciones';
const source = 'aurora';
const filterable = true;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;

export default function AuroraLocation() {
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const { data, isLoading } = useIntroData({
    id,
    column,
    source,
    methodName,
  });

  //@ts-ignore
  const _filters = useSelector((state) => state.intro.filters);
  const selectedCategories = useMemo(
    () => getSourceFilter(id, _filters, source),
    [_filters],
  );
  const handleSelectedCategoriesChange = useIntroCategoryChange({
    source,
    column,
    owner: id,
  });

  return (
    <Fragment>
      {phase !== 2 && (
        <TitleWrapper
          title={title}
          subtitle={subtitle}
          isLoading={isLoading}
          filterable={filterable}
        >
          <Grid item>
            <IntroPieChart
              data={data}
              filterable={filterable}
              selectedCategories={selectedCategories}
              onSelectedCategoriesChange={handleSelectedCategoriesChange}
            />
          </Grid>
        </TitleWrapper>
      )}
    </Fragment>
  );
}
