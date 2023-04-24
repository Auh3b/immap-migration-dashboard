import React, { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { format, sum } from 'd3';
import { CategoryWidgetUI } from '@carto/react-ui';
import TitleWrapper from './utils/TitleWrapper';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import useIntroCategoryChange from './hooks/useCategoryChange';

const title = 'Géneros';
const subtitle = '';
const column = 'e07_gener';
const id = 'totalGenders';
const source = 'auroraData';

export default function TotalGenders({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const data = useMemo(() => {
    if (_data) {
      const dataset = groupCategories(_data, column);
      const total = sum(dataset, (d) => d.value);
      return {
        dataset,
        total,
      };
    }
    return {
      dataset: [],
      total: null,
    };
  }, [_data]);

  const selectedCategories = useIntroWidgetFilter({
    source,
    owner: id,
  });

  const handleSelectedCategoriesChange = useIntroCategoryChange({
    source,
    column,
    owner: id,
  });

  return (
    <TitleWrapper title={title} subtitle={subtitle} isLoading={isLoading}>
      <CategoryWidgetUI
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
        selectedCategories={selectedCategories}
        data={data.dataset}
        formatter={(value: number) => format('.0%')(value / data.total)}
      />
    </TitleWrapper>
  );
}
