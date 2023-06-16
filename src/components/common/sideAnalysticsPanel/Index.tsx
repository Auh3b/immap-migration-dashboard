import {
  PanelContent,
  SideAnalyticsPanelProps,
} from './sideAnalyticsPanelTypes';
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { clsx } from 'clsx';
import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { grey, red } from '@material-ui/core/colors';
import { UNICEF_COLORS } from 'theme';
import { dequal } from 'dequal';

const drawerWidth = 348;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerOpen: {
    overflowX: 'hidden',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    overflowX: 'hidden',
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

export default function SideAnalyticsPanel({
  children = [],
}: SideAnalyticsPanelProps) {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = useStyles({ isOpen });
  const handleOpenToggle = (value: boolean) => {
    setIsOpen(value);
  };
  useEffect(() => {
    if (value) {
      handleOpenToggle(true);
    } else {
      handleOpenToggle(false);
    }
  }, [value, setValue]);
  return !children.length ? null : (
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
        style={{ width: '100%', height: '100%', paddingTop: '48px' }}
      >
        <ContentPanel children={children} value={value} />
        {isOpen && <Divider orientation='vertical' />}
        <SideMenu
          menuItems={children.map(({ icon, title, value }) => ({
            icon,
            title,
            value,
          }))}
          setValue={setValue}
          value={value}
        />
      </Grid>
    </Drawer>
  );
}

const useNavStyle = makeStyles((theme) => ({
  root: {
    width: theme.mixins.toolbar.minHeight,
    borderRadius: 0,
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const promptIcons = async () => {
    setTimeout(() => {
      handleOpen();
      return new Promise((resolve) => {
        return resolve(
          setTimeout(() => {
            handleClose();
          }, 3000),
        );
      });
    }, 3000);
  };

  useEffect(() => {
    if(value){
      promptIcons()
      return ()=>{
        setOpen(false)
      }
    }
  }, []);

  return (
    <Tooltip
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      id={`${title}-tooltip`}
      title={title}
      placement='right'
      arrow
    >
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
  value,
  setValue,
  menuItems,
}: {
  value: number;
  setValue: (value: number) => void;
  menuItems: Partial<PanelContent>[];
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
      {menuItems.length &&
        menuItems.map(({ icon, title, value: itemValue }) => (
          <NavButton
            key={title}
            value={itemValue}
            title={title}
            selectedValue={value}
            onValueChange={handleChange}
            icon={icon}
          />
        ))}
      {value ? (
        <NavButton
          value={0}
          selectedValue={value}
          title={'Cerrar'}
          onValueChange={handleChange}
          icon={<ChevronLeftIcon />}
        />
      ) : (
        <></>
      )}
    </Grid>
  );
}

const TabPanelStyles: CSSProperties = {
  padding: '8px 8px 8px 24px',
  width: 290,
  maxHeight: `calc(100vh - 48px)`,
  overflowY: 'scroll',
};

function TabPanel({
  value,
  index,
  children,
}: {
  value: any;
  index: any;
  children?: ReactNode;
}) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={TabPanelStyles}
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

interface ContentPanelProps {
  children?: Partial<PanelContent>[];
  value: number;
}

function ContentPanel({ children, value }: ContentPanelProps) {
  const classes = usePanelStyles({ value });
  return (
    <Grid item className={classes.root}>
      {children.length &&
        children.map(({ content, value: itemValue, title }) => (
          <TabPanel key={title} value={value} index={itemValue}>
            {content}
          </TabPanel>
        ))}
    </Grid>
  );
}
