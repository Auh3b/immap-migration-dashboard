import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Tab,
  Tabs,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import { clsx } from 'clsx';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import IntroContent from './IntroContent';

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

export default function DesktopSideNav({
  // isOpen,
  handleOpenToggle,
  children,
}: any) {
  const [value, setValue] = useState('0');
  const isOpen = true;
  const classes = useStyles({ isOpen });
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
      <TabContext value={value}>
        <Grid
          wrap='nowrap'
          container
          alignItems='stretch'
          style={{ width: '100%', height: '100%', paddingTop: '56px' }}
        >
          <ContentPanel />
          <SideMenu isOpen={isOpen} setValue={setValue} value={value} />
        </Grid>
      </TabContext>
    </Drawer>
  );
}

function SideMenu({
  isOpen,
  value,
  setValue,
}: {
  isOpen: Boolean;
  value: string;
  setValue: (value: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Grid item xs>
      <TabList orientation='vertical' value={value} onChange={handleChange}>
        <Tab value={'0'} icon={<HelpOutlineIcon />} />
        <Tab value={'1'} icon={<FilterListIcon />} />
        <Tab value={'2'} icon={<TuneIcon />} />
      </TabList>
      {isOpen && (
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      )}
    </Grid>
  );
}

const StyledTabPanel = withStyles((theme)=>({
  root:{
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
}))(TabPanel)

function ContentPanel() {
  return (
    <Grid item style={{ flexGrow: 1 }}>
      {/* @ts-expect-error */}
      <StyledTabPanel value={'0'}>
        <IntroContent isOpen={true} />
      </StyledTabPanel>
      {/* @ts-expect-error */}
      <StyledTabPanel value={'1'}>Filter</StyledTabPanel>
      {/* @ts-expect-error */}
      <StyledTabPanel value={'2'}>Tune</StyledTabPanel>
    </Grid>
  );
}
