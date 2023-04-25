import React, { useMemo } from 'react';
import groupCategories from '../utils/groupCategories';
import { ascending, descending, format, sum } from 'd3';
import { CategoryWidgetUI } from '@carto/react-ui';
import TitleWrapper from './utils/TitleWrapper';
import useIntroWidgetFilter from './hooks/useIntroWidgetFilter';
import useIntroCategoryChange from './hooks/useCategoryChange';
import { Grid, makeStyles } from '@material-ui/core';
import ReactEchart from 'echarts-for-react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& div': {
      backgroundGolor: theme.palette.background.paper,
    },
  },
}));

const title = '';
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
  const classes = useStyles();
  const data = useMemo(() => {
    if (_data) {
      const dataset = groupCategories(_data, column);
      //@ts-ignore
      return dataset.sort((a, b) => ascending(a.value, b.value));
    }
    return [];
  }, [_data]);

  const option = useMemo(
    () => ({
      grid: {
        top: '0%',
        left: '5%',
        right: '0%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        show: false,
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: data.map(({ name }) => name),
        axisLabel: {
          color: 'white',
          fontFamily: 'Barlow',
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'white',
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: {
        type: 'bar',
        data: data.map(({ value }) => value),
        itemStyle: {
          color: 'white',
        },
        label: {
          show: true,
          color: 'white',
          position: 'outside',
          fontFamily: 'Barlow',
        },
      },
    }),
    [data],
  );

  console.log(option);

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
    <Grid item lg={3}>
      <TitleWrapper
        className={classes.root}
        title={title}
        subtitle={subtitle}
        isLoading={isLoading}
      >
        <ReactEchart
          option={option}
          opts={{ renderer: 'svg' }}
          style={{ height: '100px' }}
        />
        {/* <CategoryWidgetUI
          onSelectedCategoriesChange={handleSelectedCategoriesChange}
          selectedCategories={selectedCategories}
          data={data.dataset}
          formatter={(value: number) => format('.0%')(value / data.total)}
        /> */}
      </TitleWrapper>
    </Grid>
  );
}
