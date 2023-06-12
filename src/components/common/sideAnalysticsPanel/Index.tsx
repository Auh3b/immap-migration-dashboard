import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import { clsx } from 'clsx';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { grey, red } from '@material-ui/core/colors';
import { UNICEF_COLORS } from 'theme';
import { dequal } from 'dequal';

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

export default function SideAnalyticsPanel() {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const classes = useStyles({ isOpen });
  const handleOpenToggle = (value: boolean) =>{
    setIsOpen(value)
  }
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

const useNavStyle = makeStyles((theme) => ({
  root: {
    width: theme.mixins.toolbar.minHeight,
    color: ({ value, isCurrent }: any) =>
      isCurrent ? UNICEF_COLORS[0] : value ? grey[400] : red[400],
  },
}));

function NavButton({
  value,
  selectedValue,
  title,
  onValueChange,
  icon,
}: {
  value: number;
  selectedValue: number;
  title: string;
  onValueChange: (e: MouseEvent, value: number) => void;
  icon: ReactNode;
}) {
  const isCurrent = dequal(value, selectedValue);
  const classes = useNavStyle({ value, isCurrent });
  return (
    <Tooltip title={title} placement='right'>
      <IconButton
        onClick={(e) => onValueChange(e, value)}
        className={classes.root}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}

function SideMenu({
  isOpen,
  value,
  setValue,
}: {
  isOpen: boolean;
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
  };

  return (
    <Grid
      direction='column'
      alignItems='flex-start'
      item
      xs
      container
      style={{ color: grey['600'] }}
    >
      <NavButton
        value={1}
        selectedValue={value}
        title={values[1]}
        onValueChange={handleChange}
        icon={<HelpOutlineIcon />}
      />
      <NavButton
        value={2}
        selectedValue={value}
        title={values[2]}
        onValueChange={handleChange}
        icon={<FilterListIcon />}
      />
      <NavButton
        value={3}
        selectedValue={value}
        title={values[3]}
        onValueChange={handleChange}
        icon={<TuneIcon />}
      />
      {value ? 
        <NavButton
          value={0}
          selectedValue={value}
          title={values[0]}
          onValueChange={handleChange}
          icon={<ChevronLeftIcon />}
        />
        : <></>
      }
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

const usePanelStyles = makeStyles((theme) => ({
  root: {
    width: ({ value }: any) => (value ? '100%' : '0%'),
    flexGrow: ({ value }: any) => (value ? 1 : 0),
  },
}));

function ContentPanel({ value }: any) {
  const classes = usePanelStyles({ value });
  return (
    <Grid item className={classes.root}>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        
      </TabPanel>
      <TabPanel value={value} index={3}>
        
      </TabPanel>
    </Grid>
  );
}
