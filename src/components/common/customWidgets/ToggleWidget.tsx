import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import { FormulaWidgetUI } from '@carto/react-ui';
import { makeStyles } from '@material-ui/core';
import { lazy } from 'react';

const CustomWidgetWrapper = lazy(
  () => import('components/common/customWidgets/CustomWidgetWrapper'),
);

const useStyles: any = makeStyles(() => ({
  container: {
    width: '100%',
  },
  group: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  optionTitle: {
    display: 'block',
    color: 'rgba(44, 48, 50, 1)',
  },
}));

export default function ToggleWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType,
  labels = {},
}: defaultCustomWidgetProps) {
  const classes = useStyles();

  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });
  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      <ToggleButtonGroup
        className={classes.container}
        arial-label='text alignment'
      >
        {data &&
          data.map(([name, { label, value }], index) => {
            return (
              <ToggleButton
                disabled
                className={classes.group}
                value={name}
                key={index}
                arial-label={name}
              >
                <span className={classes.optionTitle}>{label}</span>
                <FormulaWidgetUI data={value} />
              </ToggleButton>
            );
          })}
      </ToggleButtonGroup>
    </CustomWidgetWrapper>
  );
}
