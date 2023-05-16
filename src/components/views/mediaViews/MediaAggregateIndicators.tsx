import { Grid, Paper, makeStyles } from '@material-ui/core';
import SourceIndictor from 'components/indicators/media/utils/SourceIndictor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { sum } from 'd3';
import ComponentFallback from 'components/common/ComponentFallback';
import { FA_MAP, MEDIA_SOURCES } from './utils/mediaUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    height: '100%',
    width: '100%',
  },
  indicatorContainer: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
  icon: {},
}));

export default function MediaAggregateIndicators({
  data: _data,
  isLoading,
}: any) {
  const classes = useStyles();
  const data = useMemo<{ name: string; value: number }[] | null>(() => {
    if (_data.length === 0) {
      return [];
    }

    let output: any = [];
    const { sources, summary } = _data;
    output = [
      ...output,
      { name: MEDIA_SOURCES.MENCIONES_TOTALES, value: summary.volume },
    ];
    const sourceList = summary.sources;
    for (let source of sourceList) {
      const currentSource = sources[source];
      const currentSourceCount = sum(
        Object.values(currentSource).map(({ volume }: any) => volume),
      );
      if (currentSourceCount) {
        output = [...output, { name: source, value: currentSourceCount }];
      }
    }

    return output;
  }, [_data]);
  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container className={classes.indicatorContainer}>
          {data.length > 0 &&
            !isLoading &&
            data.map(({ name, value }, i) => (
              <SourceIndictor
                key={name}
                title={name}
                icon={
                  //@ts-ignore
                  <FontAwesomeIcon
                    className={classes.icon}
                    icon={FA_MAP.get(name)}
                  />
                }
                data={value}
              />
            ))}
          {isLoading && <ComponentFallback />}
        </Grid>
      </Paper>
    </Grid>
  );
}
