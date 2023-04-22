import {
  Grid,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import { FormulaWidgetUI } from '@carto/react-ui';
import { numberFormatter } from 'utils/formatter';
import { MouseEvent, ReactNode, useState } from 'react';
import TitleWrapper, {
  TitleWrapperProps,
} from 'components/indicators/introduction/utils/TitleWrapper';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  indicatorValue: {},
  button: {
    color: 'inherit',
  },
  popper: {
    padding: theme.spacing(2),
  },
}));

interface extraContent {
  child: ReactNode;
  title?: string;
}

interface AggregateIndicatorProps extends TitleWrapperProps {
  isLoading?: Boolean;
  data: number;
  icon: ReactNode;
  gridSize?: number | Boolean | string;
  formatter?: any;
  extraContent?: extraContent;
}

export default function AggregateIndicatorWidget(
  props: AggregateIndicatorProps,
) {
  const {
    title,
    subtitle,
    data,
    isLoading = false,
    icon,
    formatter = numberFormatter,
    extraContent,
  } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null);
  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    setIsOpen((prev) => !prev);
  };
  const tooltipTitle = isOpen ? '' : 'More details';
  return (
    <TitleWrapper title={title} subtitle={subtitle}>
      <Grid spacing={1} wrap='nowrap' container alignItems='center'>
        <Grid item>{icon}</Grid>
        {data && !isLoading && (
          <Grid item className={classes.indicatorValue}>
            <FormulaWidgetUI data={data} formatter={formatter} />
          </Grid>
        )}
        {extraContent && (
          <Grid item>
            <Tooltip title={extraContent.title || tooltipTitle} arrow>
              <IconButton onClick={handleToggle} className={classes.button}>
                {isOpen ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </Tooltip>
            <Popper open={isOpen} anchorEl={anchor} placement='bottom'>
              {({ TransitionProps }) => {
                return (
                  <Grid item>
                    <Paper className={classes.popper}>
                      {extraContent.child}
                    </Paper>
                  </Grid>
                );
              }}
            </Popper>
          </Grid>
        )}
      </Grid>
    </TitleWrapper>
  );
}
