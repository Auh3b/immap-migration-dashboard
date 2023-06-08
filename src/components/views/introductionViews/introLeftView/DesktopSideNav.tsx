              import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import { clsx } from 'clsx';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import IntroContent from './IntroContent';
import { grey, red } from '@material-ui/core/colors';
import IntroActiveFilters from './IntroActiveFilters';
import IntroExtraFilters from './IntroExtraFilters';

const drawerWidth = 300;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.mixins.toolbar.minHeight,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPadding: {
    height: theme.spacing(2),
  },
  buttonContainer: {
    borderRadius: '100%',
    marginTop: theme.mixins.toolbar.minHeight,
    borderBottom: '1px solid' + theme.palette.divider,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function DesktopSideNav({ isOpen, handleOpenToggle }: any) {
  const [value, setValue] = useState(0);
  const classes = useStyles({ isOpen });
  useEffect(() => {
    if (value) {
      handleOpenToggle(true);
    } else {
      handleOpenToggle(false);
    }
  }, [value, setValue]);
  return (
    <Drawer
      variant='permanent'
      anchor='left'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        }),
      }}
      open={isOpen}
    >
      <Grid
        wrap='nowrap'
        container
        alignItems='stretch'
        style={{ width: '100%', height: '100%', paddingTop: '56px' }}
      >
        <ContentPanel value={value} />
        {isOpen && <Divider orientation='vertical' />}
        <SideMenu isOpen={isOpen} setValue={setValue} value={value} />
      </Grid>
    </Drawer>
  );
}

const StyledTabs = withStyles((theme) => ({
  indicator: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25) !important',
  },
}))(Tabs);

const StyledTab = withStyles((theme) => ({
  root: {
    marginRight: 0,
  },
  selected: {
    color: theme.palette.secondary.main,
    backgroundColor: '#f4f4f4',
  },
}))(Tab);

function SideMenu({
  isOpen,
  value,
  setValue,
}: {
  isOpen: Boolean;
  value: number;
  setValue: (value: number) => void;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const values: Record<number, string> = {
    0: 'Cerrar',
    1: 'Metodología',
    2: 'Filtros Adicionales',
    3: 'Filtros Activos',
  }
  
  return (
    <Grid direction='column' alignItems='flex-start' item xs container style={{ color: grey['600'] }}>
      <Tooltip title={values[1]} placement='right'>
        <IconButton onClick={(e)=> handleChange(e, 1)}>
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={values[2]} placement='right'>
        <IconButton onClick={(e)=> handleChange(e, 2)}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={values[3]} placement='right'>
        <IconButton onClick={(e)=> handleChange(e, 3)}>
          <TuneIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={values[0]} placement='right'>
        <IconButton onClick={(e)=> handleChange(e, 0)}>
          <ChevronLeftIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
}

function TabPanel({
  value,
  index,
  children,
}: {
  value: any;
  index: any;
  children: ReactNode;
}) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: '8px 0px 8px 24px' }}
    >
      {children}
    </div>
  );
}

function ContentPanel({ value }: any) {
  return (
    <Grid item style={{ flexGrow: 1, width: '100%' }}>
      <TabPanel value={value} index={1}>
        <IntroContent isOpen={true} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <IntroExtraFilters />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <IntroActiveFilters />
      </TabPanel>
    </Grid>
  );
}
