import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import SourceIndictor from 'components/indicators/media/utils/SourceIndictor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ComponentFallback from 'components/common/ComponentFallback';
import { FA_MAP } from './utils/mediaUtils';
import { METHOD_NAMES } from './utils/methodName';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {},
  title: {
    ...theme.typography.subtitle1,
    textTransform: 'uppercase',
    fontSize: theme.spacing(2),
    padding: theme.spacing(2),
  },
  indicatorContainer: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
  },
  icon: {},
}));

export default function MediaAggregateIndicators({
  deps,
  isLoading,
  transform,
}: any) {
  const theme = useTheme();
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      setData(
        await transform(METHOD_NAMES.MEDIA_AGGREGATES, {
          filters: deps[1].meltwater ?? {},
        }),
      );
    })();
    return () => {
      setData([]);
    };
  }, [...deps]);

  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>
          Número de menciones por red social relacionadas con migración en la
          región
        </Typography>
        <Grid
          container
          justifyContent='space-between'
          className={classes.indicatorContainer}
        >
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
                    style={{ color: theme.palette.grey[100] }}
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
