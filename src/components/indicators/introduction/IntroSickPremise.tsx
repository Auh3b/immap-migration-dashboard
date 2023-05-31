import { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import TitleWrapper from '../../common/TitleWrapper';
import { descending } from 'd3';
import concatenatedValues from '../utils/concatenatedValues';
import IntroHalfPieChart from './utils/IntroHalfPieChart';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import useIntroCategoryChange from './hooks/useCategoryChange';
import { _FilterTypes } from '@carto/react-core';

const title = 'Retos del punto de servicio';
const column = 'princ_re_1';
const subtitle = '';
const filterable = true;
const source = 'premiseData';
const id = 'sickPremise';

export default function IntroSickPremise({
  data: _data = [],
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const selectedCategories = useIntroWidgetFilter({
    source,
    owner: id,
  });

  const data = useMemo(() => {
    let output: any[] = [];
    if (_data) {
      //@ts-ignore
      output = [
        //@ts-ignore
        ...concatenatedValues(_data, column),
      ];

      if (selectedCategories.length > 0) {
        output = [
          ...output.filter(
            ({ name, value }) => +name === +selectedCategories[0],
          ),
        ];
      }

      return output;
    }
    return [];
  }, [_data]);

  const handleSelectedCategoriesChange = useIntroCategoryChange({
    source,
    column,
    owner: id,
    type: _FilterTypes.STRING_SEARCH,
  });

  return (
    <TitleWrapper
      title={title}
      subtitle={subtitle}
      isLoading={isLoading}
      filterable={filterable}
    >
      <Grid item>
        <IntroHalfPieChart
          filterable={filterable}
          data={data}
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
        />
      </Grid>
    </TitleWrapper>
  );
}
