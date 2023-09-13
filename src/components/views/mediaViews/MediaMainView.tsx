import {
  FormControl,
  Grid,
  Select,
  makeStyles,
  MenuItem,
  Typography,
} from '@material-ui/core';
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  PropsWithChildren,
  SetStateAction,
  Suspense,
  lazy,
  useState,
} from 'react';
import ComponentFallback from 'components/common/ComponentFallback';
import MediaToolbar from './MediaToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  addMediaFilter,
  getViewMode,
  removeMediaFilter,
} from 'store/mediaSlice';
import { MediaCountryContext } from './utils';
import { FilterTypes } from 'utils/filterFunctions';

export const MediaIndicators = lazy(() => import('./MediaIndicators'));
export const MediaAggregateIndicators = lazy(
  () => import('./MediaAggregateIndicators'),
);
export const MediaPosts = lazy(() => import('./MediaPosts'));

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
        <IndicatorWithCountrySelector key={id} {...props} />
      ))}
    </Grid>
  );
}

function SingleView(props: { isLoading?: boolean }) {
  return <Indicators {...props} />;
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
  isLoading?: boolean;
}

function IndicatorWithCountrySelector(
  props: PropsWithChildren<CountrySelectorProps>,
) {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const handleChange = (e: ChangeEvent<{ value: string }>) => {
    const selectedCountry = e.target.value;
    const owner = `_${selectedCountry}`;
    setCountry(selectedCountry);
    if (selectedCountry) {
      dispatch(
        addMediaFilter({
          type: FilterTypes.WORD_CLOUD_IN,
          owner,
          column: 'keywords',
          source: 'meltwater',
          values: [selectedCountry],
        }),
      );
    } else {
      dispatch(
        removeMediaFilter({
          id: owner,
          source: 'meltwater',
          column: 'keywords',
        }),
      );
    }
  };
  return (
    <Grid item xs={6} style={{ paddingLeft: '16px' }}>
      <MediaCountryContext.Provider value={country}>
        <FormControl
          size={'small'}
          style={{ width: '25%', marginBottom: '16px' }}
        >
          <Select value={country} onChange={handleChange} displayEmpty>
            <MenuItem value=''>
              <Typography variant={'overline'}>Select Country</Typography>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                <Typography variant={'overline'}>{country}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {country ? (
          <Indicators isLoading={props.isLoading} />
        ) : (
          <Typography>Please select country</Typography>
        )}
      </MediaCountryContext.Provider>
    </Grid>
  );
}
