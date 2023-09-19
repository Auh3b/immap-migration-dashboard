import {
  FormControl,
  Grid,
  Select,
  makeStyles,
  MenuItem,
  Typography,
  Divider,
} from '@material-ui/core';
import {
  ChangeEvent,
  Fragment,
  PropsWithChildren,
  Suspense,
  lazy,
  useCallback,
} from 'react';
import ComponentFallback from 'components/common/ComponentFallback';
import MediaToolbar from './MediaToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMediaFilter,
  clearViews,
  getViewMode,
  removeMediaFilter,
  removeView,
  setView,
} from 'store/mediaSlice';
import { MediaCountryContext } from './utils';
import { FilterTypes } from 'utils/filterFunctions';
import { dequal } from 'dequal';
import useCustomCompareEffectAlt from 'components/indicators/media/hooks/useCustomCompareEffectAlt';

const source = 'meltwater';
const column = 'keywords';

const MediaIndicators = lazy(() => import('./MediaIndicators'));
const MediaAggregateIndicators = lazy(
  () => import('../../indicators/media/MediaAggregateIndicators'),
);
const MediaPosts = lazy(() => import('./MediaPosts'));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: '100%',
    maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    overflowY: 'auto',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

interface MediaMainProps {
  isLoading?: boolean;
}

export default function MediaMainView(props: MediaMainProps) {
  const classes = useStyles();
  const { isLoading } = props;
  // @ts-ignore
  const viewMode = useSelector((state) => getViewMode(state.media));
  const duelView = Boolean(viewMode);
  return (
    <Grid
      container
      direction='column'
      item
      wrap='nowrap'
      className={classes.root}
    >
      <MediaToolbar />
      <View duelView={duelView} isLoading={isLoading} />
    </Grid>
  );
}

const countries = ['chile', 'colombia', 'costa rica', 'panamá'];

function View(props: { duelView?: boolean; isLoading?: boolean }) {
  return (
    <Fragment>
      {props.duelView ? (
        <DuelView />
      ) : (
        <SingleView isLoading={props.isLoading} />
      )}
    </Fragment>
  );
}

function DuelView(props: { isLoading?: boolean }) {
  return (
    <Grid
      container
      wrap='nowrap'
      justifyContent='space-between'
      alignItems={'flex-start'}
    >
      {[0, 1].map((id) => (
        <IndicatorWithCountrySelector key={id} id={id} {...props} />
      ))}
    </Grid>
  );
}

function SingleView(props: { isLoading?: boolean }) {
  return (
    <Fragment>
      <Indicators {...props} />
    </Fragment>
  );
}

function Indicators(props: { isLoading?: boolean }) {
  return (
    <Fragment>
      <Suspense fallback={<ComponentFallback />}>
        <MediaAggregateIndicators isLoading={props.isLoading} />
      </Suspense>
      <Suspense fallback={<ComponentFallback />}>
        <MediaIndicators isLoading={props.isLoading} />
      </Suspense>
      <Suspense fallback={<ComponentFallback />}>
        <MediaPosts isLoading={props.isLoading} />
      </Suspense>
    </Fragment>
  );
}

interface CountrySelectorProps {
  id: number;
  isLoading?: boolean;
}

function IndicatorWithCountrySelector(
  props: PropsWithChildren<CountrySelectorProps>,
) {
  //@ts-ignore
  const selectedViews = useSelector((state) => state.media.views) || [];
  const dispatch = useDispatch();
  const filters = useSelector((state) =>
    // @ts-ignore
    Object.keys(state.media.filters.meltwater || {}),
  );
  const getOwner = (country: string) =>
    props.id ? `país_secundario_${country}` : `país_primario_${country}`;

  const currentCountry = selectedViews[props.id] || '';
  const currentCountryValue = currentCountry.split('_').at(-1) || '';

  useCustomCompareEffectAlt(
    () => {
      if (!selectedViews.some((d: string) => filters.includes(d))) {
        dispatch(clearViews());
      }
    },
    [filters, currentCountry],
    dequal,
  );

  const handleChange = useCallback(
    (e: ChangeEvent<{ value: string }>) => {
      const selectedCountry = e.target.value;
      const owner = getOwner(selectedCountry);
      const previousSelectedCountry = currentCountry;

      if (!selectedCountry) {
        dispatch(
          removeMediaFilter({
            id: previousSelectedCountry,
            owner: previousSelectedCountry,
            source,
            column,
          }),
        );
        dispatch(removeView(props.id));
        return;
      }

      if (previousSelectedCountry) {
        dispatch(
          removeMediaFilter({
            id: previousSelectedCountry,
            owner: previousSelectedCountry,
            source,
            column,
          }),
        );
        dispatch(removeView(props.id));
      }

      dispatch(
        addMediaFilter({
          type: FilterTypes.WORD_CLOUD_IN,
          owner,
          column,
          source,
          values: [selectedCountry],
        }),
      );
      dispatch(setView({ index: props.id, value: owner }));
    },
    [getOwner, currentCountry],
  );
  return (
    <Fragment>
      <Grid
        item
        xs={6}
        style={{
          paddingLeft: props.id ? '24px' : 0,
          paddingRight: !props.id ? '24px' : 0,
        }}
      >
        <MediaCountryContext.Provider
          value={{ value: props.id, label: currentCountryValue }}
        >
          <Typography
            variant='subtitle1'
            style={{ textTransform: 'uppercase', marginBottom: '8px' }}
          >
            {props.id ? 'país secundario' : 'país primario'}
          </Typography>
          <FormControl
            size={'small'}
            style={{ width: '25%', marginBottom: '16px' }}
          >
            <Select
              value={currentCountryValue}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value=''>
                <Typography variant={'overline'}>seleccionar país</Typography>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem
                  key={country}
                  value={country}
                  disabled={Boolean(
                    selectedViews
                      .map((d: string) => d.split('_').at(-1))
                      .includes(country),
                  )}
                >
                  <Typography variant={'overline'}>{country}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {currentCountry ? (
            <Indicators isLoading={props.isLoading} />
          ) : (
            <Typography>
              Por favor seleccione{' '}
              {props.id ? 'país secundario' : 'país primario'}
            </Typography>
          )}
        </MediaCountryContext.Provider>
      </Grid>
      {!Boolean(props.id) && <Divider flexItem orientation={'vertical'} />}
    </Fragment>
  );
}
