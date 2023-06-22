import { Grid, Typography, makeStyles, withStyles } from '@material-ui/core';
import { TimelineDot, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { MouseEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UNICEF_COLORS } from 'theme';
import serviceFeedbackNnaV2Source from 'data/sources/serviceFeedbackNnaV2Source';
import serviceFeedbackV2Source from 'data/sources/serviceFeedbackV2Source';
import { _FilterTypes } from '@carto/react-core';
import { RootState } from 'store/store';
import { addFilter, removeFilter } from '@carto/react-redux';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import useWidgetFilterValues from 'components/common/customWidgets/hooks/useWidgetFilterValues';

const id = 'empujes_de_servicio';
const pushs = [1, 2, 3, 4, 5];
const column = 'push';
const filterType = _FilterTypes.IN;
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
const adultSource = serviceFeedbackV2Source.id;
const childSource = serviceFeedbackNnaV2Source.id;

const StyleToggleButtonGroup = withStyles((theme) => ({
  root: {
    width: '100%',
  },
  groupedHorizontal: {
    '&:not(:first-child)': {
      borderLeft: 'unset',
      marginLeft: 'unset',
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    alignItems: 'center',
    padding: theme.spacing(0.5),
    height: '100%',
    width: '100%',
  },
  selected: {
    border: 'none',
  },
}))(ToggleButton);

export default function ServicesByPush() {
  const dispatch = useDispatch();

  const { data: _adultData } = useWidgetFetch({
    id,
    methodName,
    column,
    dataSource: adultSource,
  });

  const adultData = useMemo(() => {
    if (_adultData.length) {
      return Object.fromEntries(
        _adultData.map(({ name, value }) => [name, value]),
      );
    }
    return {};
  }, [_adultData]);

  const { data: _childData } = useWidgetFetch({
    id,
    methodName,
    column,
    dataSource: childSource,
  });

  const childData = useMemo(() => {
    if (_childData.length) {
      return Object.fromEntries(
        _childData.map(({ name, value }) => [name, value]),
      );
    }
    return {};
  }, [_childData]);

  const adultPush =
    useWidgetFilterValues({
      dataSource: adultSource,
      id: id + '_-_adulto',
      column,
      type: filterType,
    }) || [];

  const childPush =
    useWidgetFilterValues({
      dataSource: childSource,
      id: id + '_-_nna',
      column,
      type: filterType,
    }) || [];

  const selectedPushes = useMemo(() => {
    if (adultPush.length || childPush.length) {
      return Array.from(new Set([...adultPush, ...childPush]));
    }
    return [];
  }, [adultPush, childPush]);

  const handlePush = (event: MouseEvent<HTMLElement>, newPushes: any[]) => {
    if (newPushes.length) {
      dispatch(
        addFilter({
          column,
          id: serviceFeedbackV2Source.id,
          type: filterType,
          values: newPushes,
          owner: id + '_-_adulto',
        }),
      );
      dispatch(
        addFilter({
          column,
          id: serviceFeedbackNnaV2Source.id,
          type: filterType,
          values: newPushes,
          owner: id + '_-_nna',
        }),
      );
    } else {
      dispatch(
        removeFilter({
          column,
          id: serviceFeedbackV2Source.id,
          owner: id + '_-_adulto',
        }),
      );
      dispatch(
        removeFilter({
          column,
          id: serviceFeedbackNnaV2Source.id,
          owner: id + '_-_nna',
        }),
      );
    }
  };

  return (
    <Grid item>
      <Grid item container>
        <Grid item xs={4}>
          <Typography>Push</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Adulto</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>NNA</Typography>
        </Grid>
      </Grid>
      {/* @ts-ignore */}
      <StyleToggleButtonGroup
        exclusive={false}
        value={selectedPushes}
        orientation='vertical'
        onChange={handlePush}
      >
        {pushs.map((p) => (
          // @ts-ignore
          <StyledToggleButton key={p} value={p}>
            <PushContent push={p} childData={childData} adultData={adultData} />
          </StyledToggleButton>
        ))}
      </StyleToggleButtonGroup>
    </Grid>
  );
}

const usePushStyles = makeStyles((theme) => ({
  root: {},
  title: {
    ...theme.typography.body1,
    marginBottom: theme.spacing(0.5),
    textAlign: 'start',
    color: 'inherit',
  },
  adultContainer: {},
  adultIcon: {
    marginRight: theme.spacing(1),
    backgroundColor: ({ push }: any) =>
      push ? UNICEF_COLORS[push] : 'rgba(0,0,0,0)',
  },
  childIcon: {
    marginRight: theme.spacing(1),
    borderRadius: '100%',
    width: 10,
    height: 10,
    border: ({ push }: any) =>
      push ? `3px solid ${UNICEF_COLORS[push]}` : '3px solid rgba(0,0,0,0)',
  },
}));

function PushContent({
  push,
  childData,
  adultData,
}: {
  push: number;
  childData: Record<number, number>;
  adultData: Record<number, number>;
}) {
  const classes = usePushStyles({ push });
  return (
    <Grid container className={classes.root}>
      <Grid item xs={4}>
        <Typography className={classes.title}>{push ? push : 'All'}</Typography>
      </Grid>
      <Grid
        container
        wrap='nowrap'
        alignItems='center'
        item
        xs={4}
        className={classes.adultContainer}
      >
        <TimelineDot className={classes.adultIcon}></TimelineDot>
        <Typography className={classes.title}>
          {adultData[push] || 0}
        </Typography>
      </Grid>
      <Grid container wrap='nowrap' alignItems='center' item xs={4}>
        <TimelineDot
          variant='outlined'
          className={classes.childIcon}
        ></TimelineDot>
        <Typography className={classes.title}>
          {childData[push] || 0}
        </Typography>
      </Grid>
    </Grid>
  );
}
