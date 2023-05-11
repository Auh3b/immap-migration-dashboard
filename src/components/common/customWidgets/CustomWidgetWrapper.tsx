//@ts-nocheck
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  LinearProgress,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { ReactNode, createRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    maxWidth: '100%',
    padding: ({ margin }) =>
      margin !== undefined ? margin : theme.spacing(2, 2.5),
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: theme.spacing(0.25),
  },
  header: ({ isOpen }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    ...(isOpen
      ? { minHeight: theme.spacing(3) }
      : { height: theme.spacing(3) }),
    padding: 0,
  }),
  optionsMenu: {
    marginTop: theme.spacing(6),
    maxHeight: theme.spacing(21),
    minWidth: theme.spacing(16),
  },
  button: {
    flex: 1,
    padding: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    cursor: ({ expandable }) => (expandable ? 'pointer' : 'default'),
    '& .MuiButton-label': {
      ...theme.typography.body1,

      '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1),
      },
    },
    '&:hover': {
      background: 'none',
    },
  },
  buttonText: ({ isOpen }) => ({
    wordBreak: 'break-word',
    overflow: 'hidden',
    ...(isOpen && {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    }),
    ...(!isOpen && {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }),
  }),
  iconToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  iconAction: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(-0.75, 0),
  },
  content: {
    paddingTop: theme.spacing(1.25),
  },
}));

export default function CustomWidgetWrapper({
  title,
  isLoading,
  expandable = true,
  expanded,
  onError,
  children,
  actions,
}: {
  title: string;
  onError?: any;
  isLoading: Boolean;
  children: ReactNode;
  expandable?: Boolean;
  expanded?: Boolean;
  actions?: ReactNode[];
}) {
  const wrapper = createRef();
  const [isOpen, setIsOpen] = useState(expandable ? false : true);
  const classes = useStyles({ isOpen, expandable });
  const handleExpandClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Box component={'section'} arial={title} className={classes.root}>
      {isLoading ? <LinearProgress className={classes.loading} /> : null}
      <Grid container className={classes.header}>
        <Button
          className={classes.button}
          startIcon={
            <Icon>
              {isOpen ? (
                <ExpandLess className={classes.iconToggle} />
              ) : (
                <ExpandMore className={classes.iconToggle} />
              )}
            </Icon>
          }
          onClick={handleExpandClick}
        >
          <Tooltip title={title} placement='top' arrow>
            <Typography
              className={classes.buttonText}
              align='left'
              variant='subtitle1'
            >
              {title}
            </Typography>
          </Tooltip>
        </Button>
        {actions && (
          <Grid xs={2} item container wrap='nowrap' alignItems='center'>
            {actions.map((icon, index) => (
              <Grid key={`action-${index}`} item xs>
                {icon}
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Collapse ref={wrapper} in={isOpen} timeout='auto' unmountOnExit>
        <Box className={classes.content}>{children}</Box>
      </Collapse>
    </Box>
  );
}
