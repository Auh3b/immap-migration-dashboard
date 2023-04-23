import AggregateIndicatorWidget from 'components/common/customWidgets/AggregateIndicatorWidget';
import { ReactComponent as People } from 'assets/img/Group.svg';
import { MouseEvent, useMemo, useState } from 'react';
import iconStyles from './utils/iconStyles';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { CategoryWidgetUI } from '@carto/react-ui';
import groupCategories from '../utils/groupCategories';
import { format, sum } from 'd3';

const title = 'Personas conectadas';
const subtitle = 'En Aurora Chatbot';
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function TotalAurora({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const classes = useStyles();

  const data = useMemo(() => {
    if (_data) {
      return _data.length;
    }
    return 0;
  }, [_data]);

  const data2 = useMemo(() => {
    if (_data) {
      const dataset = groupCategories(_data, 'e07_gener');
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

  return (
    <Grid item wrap='nowrap' container className={classes.root}>
      <AggregateIndicatorWidget
        title={title}
        isLoading={isLoading}
        subtitle={subtitle}
        data={data}
        icon={<People style={iconStyles} />}
        extraContent={{
          child: (
            <CategoryWidgetUI
              data={data2.dataset}
              formatter={(value: number) => format('.0%')(value / data2.total)}
            />
          ),
        }}
      />
    </Grid>
  );
}
