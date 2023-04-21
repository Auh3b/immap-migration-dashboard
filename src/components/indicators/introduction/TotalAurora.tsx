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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
const title = 'Personas conectadas';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  button: {
    alignSelf: 'center',
    // tranform: 'translate(10px, 10px)',
    position: 'absolute',
    // top: 50,
    right: 70,
  },
  popper: {
    zIndex: 1,
    padding: theme.spacing(2),
  },
}));

export default function TotalAurora({
  data: _data,
  isLoading,
}: {
  data: any[];
  isLoading: Boolean;
}) {
  const classes = useStyles();
  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    setIsOpen((prev) => !prev);
  };
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
  const tooltipTitle = isOpen ? '' : 'More details';
  return (
    <Grid item wrap='nowrap' container className={classes.root}>
      <AggregateIndicatorWidget
        title={title}
        isLoading={isLoading}
        data={data}
        icon={<People style={iconStyles} />}
      />
      <Tooltip title={tooltipTitle} arrow>
        <IconButton onClick={handleToggle} className={classes.button}>
          {isOpen ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Tooltip>
      <Popper open={isOpen} anchorEl={anchor} placement='bottom'>
        {({ TransitionProps }) => {
          return (
            <Grid item>
              <Paper className={classes.popper}>
                <CategoryWidgetUI
                  data={data2.dataset}
                  formatter={(value: number) =>
                    format('.0%')(value / data2.total)
                  }
                />
              </Paper>
            </Grid>
          );
        }}
      </Popper>
    </Grid>
  );
}
