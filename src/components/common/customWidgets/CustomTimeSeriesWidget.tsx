import {
  TimeSeriesWidgetUI,
  TIME_SERIES_CHART_TYPES,
  WrapperWidgetUI,
} from '@carto/react-ui';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '@carto/react-redux';
import { GroupDateTypes, _FilterTypes as FilterTypes } from '@carto/react-core';
import {
  capitalize,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from '@material-ui/core';

const STEP_SIZE_RANGE_MAPPING = {
  [GroupDateTypes.YEARS]: 60 * 60 * 24 * 365 * 1000,
  [GroupDateTypes.MONTHS]: 60 * 60 * 24 * 30 * 1000,
  [GroupDateTypes.WEEKS]: 60 * 60 * 24 * 7 * 1000,
  [GroupDateTypes.DAYS]: 60 * 60 * 24 * 1000,
  [GroupDateTypes.HOURS]: 60 * 60 * 1000,
  [GroupDateTypes.MINUTES]: 60 * 1000,
};

export default function CustomTimeSeriesWidget({
  id,
  title,
  method,
  dataSource,
  column,
  chartType = TIME_SERIES_CHART_TYPES.LINE,
  filterType = FilterTypes.TIME,
  stepSize = GroupDateTypes.WEEKS,
  methodParams,
  // Widget
  //@ts-ignore
  stepSizeOptions = [],
  wrapperProps,
  // UI
  tooltip,
  tooltipFormatter,
  formatter,
  showControls,
  animation,
  isPlaying,
  onPlay,
  isPaused,
  onPause,
  onStop,
  onTimelineUpdate,
  timeWindow = [],
  onTimeWindowUpdate,
}: // Both
defaultCustomWidgetProps) {
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    column,
    method,
    methodParams,
  });

  const dispatch = useDispatch();

  const [selectedStepSize, setSelectedStepSize] = useState(stepSize);

  if (showControls && global) {
    console.warn(
      'TimeSeriesWidget cannot show controls while using global mode. Controls will be hidden.',
    );
    showControls = false;
  }

  useEffect(() => {
    if (stepSize !== selectedStepSize) {
      setSelectedStepSize(stepSize);
    }
    // Only on stepSize update
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepSize]);

  const handleTimeWindowUpdate = useCallback(
    (timeWindow) => {
      if (!isLoading) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
            values: [timeWindow.map((date: Date) => date.getTime?.() || date)],
            owner: id,
          }),
        );

        if (onTimeWindowUpdate) onTimeWindowUpdate(timeWindow);
      }
    },
    [column, dataSource, isLoading, dispatch, id, onTimeWindowUpdate],
  );

  const handleTimelineUpdate = useCallback(
    (timelinePosition) => {
      if (!isLoading) {
        const { name: moment } = data[timelinePosition];
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: FilterTypes.TIME,
            values: [
              [moment, moment + STEP_SIZE_RANGE_MAPPING[selectedStepSize]],
            ],
            owner: id,
          }),
        );

        if (onTimelineUpdate) onTimelineUpdate(new Date(moment));
      }
    },
    [
      column,
      dataSource,
      isLoading,
      dispatch,
      id,
      onTimelineUpdate,
      selectedStepSize,
      data,
    ],
  );

  const handleStop = useCallback(() => {
    dispatch(
      removeFilter({
        id: dataSource,
        column,
        owner: id,
      }),
    );

    if (onStop) onStop();
  }, [column, dataSource, id, dispatch, onStop]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenStepSizeMenu = (e: Event) => {
    if (e?.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleCloseStepSizeMenu = () => {
    setAnchorEl(null);
  };

  const handleStepSizeUpdate = (stepSize: GroupDateTypes) => {
    setSelectedStepSize(stepSize);
    handleCloseStepSizeMenu();
  };

  return (
    <>
      <WrapperWidgetUI
        expanded={false}
        title={title}
        isLoading={isLoading}
        {...wrapperProps}
        actions={[
          ...(wrapperProps?.actions || []),
          ...(stepSizeOptions?.length
            ? [
                {
                  id: 'a0',
                  name: 'Bucket size',
                  icon: <StepSizeIcon />,
                  action: handleOpenStepSizeMenu,
                },
              ]
            : []),
        ]}
      >
        {(!!data.length || isLoading) && (
          <TimeSeriesWidgetUI
            data={data}
            stepSize={selectedStepSize}
            chartType={chartType}
            tooltip={tooltip}
            tooltipFormatter={tooltipFormatter}
            formatter={formatter}
            showControls={showControls}
            animation={animation}
            isPlaying={isPlaying}
            onPlay={onPlay}
            isPaused={isPaused}
            onPause={onPause}
            onStop={handleStop}
            // timelinePosition={timelinePosition}
            onTimelineUpdate={handleTimelineUpdate}
            timeWindow={timeWindow}
            onTimeWindowUpdate={handleTimeWindowUpdate}
          />
        )}
      </WrapperWidgetUI>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseStepSizeMenu}
      >
        <MenuItem disabled>
          <Typography variant='caption' color='textSecondary'>
            Step size
          </Typography>
        </MenuItem>
        {stepSizeOptions.map((stepSize: GroupDateTypes) => (
          <MenuItem
            key={stepSize}
            selected={selectedStepSize === stepSize}
            onClick={() => handleStepSizeUpdate(stepSize)}
          >
            {capitalize(stepSize)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

// Aux
function StepSizeIcon() {
  return (
    <SvgIcon>
      <path
        d='M19 14l.3 1.5c.32.12.614.278.883.475l.197.155 1.45-.49 1 1.73-1.14 1c.069.429.078.68.03 1.065l-.03.205 1.14 1-1 1.73-1.45-.49c-.256.216-.538.394-.845.533l-.235.097L19 24h-2l-.3-1.51c-.32-.12-.614-.278-.883-.475l-.197-.155-1.45.49-1-1.73 1.14-1c-.067-.417-.078-.667-.033-1.028l.033-.232-1.14-1 1-1.73 1.45.49c.256-.216.538-.394.845-.533l.235-.097L17 14h2zM8 2v2h8V2h2v2h1c1.05 0 1.918.82 1.994 1.851L21 6v6h-2v-2H5v10h6v2H5c-1.06 0-1.919-.82-1.995-1.851L3 20l.01-14c0-1.05.802-1.918 1.84-1.994L5 4h1V2h2zm10 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm1-11H5v2h14V6z'
        id='-↳Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}
