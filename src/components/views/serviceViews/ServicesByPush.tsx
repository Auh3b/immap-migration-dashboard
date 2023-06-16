import {
  Divider,
  Grid,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { MouseEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UNICEF_COLORS } from 'theme';
import d3Hex2RGB from 'utils/d3Hex2RGB';
import serviceFeedbackNnaV2Source from 'data/sources/serviceFeedbackNnaV2Source';
import serviceFeedbackV2Source from 'data/sources/serviceFeedbackV2Source';
import { _FilterTypes } from '@carto/react-core';
import { RootState } from 'store/store';
import { addFilter, removeFilter } from '@carto/react-redux';

const id = 'services_pushes';
const pushs = [1, 2, 3, 4, 5];
const column = 'push';
const filterType = _FilterTypes.IN;

const StyleToggleButtonGroup = withStyles((theme) => ({
  root: {},
  groupedHorizontal: {
    '&:not(:first-child)': {
      borderLeft: 'unset',
      marginLeft: 'unset',
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    height: '100%',
    width: '100%',
  },
  selected: {
    backgroundColor: 'rgba(0,0,0,0)',
    border: '3px solid' + UNICEF_COLORS[0] + ' !important',
  },
}))(ToggleButton);

export default function ServicesByPush() {
  const dispatch = useDispatch();
  const adultServices = useSelector(
    (state: RootState) => state.carto.dataSources[serviceFeedbackV2Source.id],
  );
  const childrenServices = useSelector(
    (state: RootState) =>
      state.carto.dataSources[serviceFeedbackNnaV2Source.id],
  );

  const adultPush = useMemo(() => {
    if (!adultServices) return [];
    if (!adultServices.filters) return [];
    if (!adultServices.filters[column]) return [];
    if (!adultServices.filters[column][filterType]) return [];
    return adultServices.filters[column][filterType].values;
  }, [adultServices]);
  console.log(adultServices, adultPush);
  const childPush = useMemo(() => {
    if (!childrenServices) return [];
    if (!childrenServices.filters) return [];
    if (!childrenServices.filters[column]) return [];
    if (!childrenServices.filters[column][filterType]) return [];
    return childrenServices.filters[column][filterType].values;
  }, [childrenServices]);

  const selectedPushes = useMemo(() => {
    if (adultPush.length || childPush.length) {
      return Array.from(new Set([...adultPush, ...childPush]));
    }
    return [];
  }, [adultPush, childPush]);

  const handlePush = (event: MouseEvent<HTMLElement>, newPushes: any[]) => {
    console.log(newPushes);
    if (newPushes.length) {
      dispatch(
        addFilter({
          column,
          id: serviceFeedbackV2Source.id,
          type: filterType,
          values: newPushes,
          owner: id,
        }),
      );
      dispatch(
        addFilter({
          column,
          id: serviceFeedbackNnaV2Source.id,
          type: filterType,
          values: newPushes,
          owner: id,
        }),
      );
    } else {
      dispatch(
        removeFilter({
          column,
          id: serviceFeedbackV2Source.id,
          owner: id,
        }),
      );
      dispatch(
        removeFilter({
          column,
          id: serviceFeedbackNnaV2Source.id,
          owner: id,
        }),
      );
    }
  };

  return (
    //@ts-ignore
    <StyleToggleButtonGroup
      exclusive={false}
      value={selectedPushes}
      orientation='vertical'
      onChange={handlePush}
    >
      {pushs.map((p) => (
        // @ts-ignore
        <StyledToggleButton key={p} value={p}>
          <PushContent push={p} />
        </StyledToggleButton>
      ))}
    </StyleToggleButtonGroup>
  );
}

const usePushStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1.5),
  },
  title: {
    ...theme.typography.subtitle1,
    marginBottom: theme.spacing(0.5),
  },
  adultIcon: {
    marginRight: theme.spacing(1),
    borderRadius: '100%',
    width: 10,
    height: 10,
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

function PushContent({ push }: { push: number }) {
  const classes = usePushStyles({ push });
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography className={classes.title}>
        {push ? 'Push ' + push : 'All'}
      </Typography>
      <Grid
        item
        container
        wrap='nowrap'
        alignItems='stretch'
        style={{ width: '100%', height: '100%' }}
      >
        <Grid
          container
          wrap='nowrap'
          alignItems='center'
          item
          style={{
            borderRight: '0.5px solid #F0F0F0',
            paddingRight: 16,
            marginRight: 16,
          }}
        >
          <div className={classes.adultIcon}></div>
          <div>[number]</div>
        </Grid>
        <Grid container wrap='nowrap' alignItems='center' item>
          <div className={classes.childIcon}></div>
          <div>[number]</div>
        </Grid>
      </Grid>
    </Grid>
  );
}
