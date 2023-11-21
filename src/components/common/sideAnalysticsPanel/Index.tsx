import {
  PanelContent,
  SideAnalyticsPanelProps,
  SideMenuProps,
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
  Fragment,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { grey, red } from '@material-ui/core/colors';
import { UNICEF_COLORS } from 'theme';
import { dequal } from 'dequal';
import PhaseIndicator from './PhaseIndicator';

const drawerWidth = 355;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
  },
  drawerOpen: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    width: drawerWidth,
  },
  drawerClose: {
    overflowX: 'hidden',
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
  showRoundSelector = true,
  disableRoundSelector = false,
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
    return () => {
      handleOpenToggle(false);
    };
  }, [value]);
  return !children.length ? null : (
    <Fragment>
      <SideMenu
        menuItems={children.map(({ icon, title, value }) => ({
          icon,
          title,
          value,
        }))}
        isOpen={isOpen}
        setValue={setValue}
        value={value}
      >
        {showRoundSelector && (
          <PhaseIndicator
            isPanelOpen={isOpen}
            disabled={disableRoundSelector}
          />
        )}
      </SideMenu>
      <Drawer
        ModalProps={{
          BackdropProps: {
            invisible: true,
          },
          keepMounted: true,
        }}
        variant='temporary'
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
          style={{ width: '100%', height: '100%', marginTop: '48px' }}
        >
          <ContentPanel
            showRoundSelector={showRoundSelector}
            children={children}
            value={value}
          />
          {isOpen && <Divider orientation='vertical' />}
          <SideMenu
            menuItems={children.map(({ icon, title, value }) => ({
              icon,
              title,
              value,
            }))}
            isOpen={isOpen}
            setValue={setValue}
            value={value}
          >
            {showRoundSelector && (
              <PhaseIndicator
                isPanelOpen={isOpen}
                disabled={disableRoundSelector}
              />
            )}
          </SideMenu>
        </Grid>
      </Drawer>
    </Fragment>
  );
}

const useNavStyle = makeStyles((theme) => ({
  root: {
    minWidth: 'unset',
    width: '100%',
    boxShadow: ({ isCurrent }: any) =>
      isCurrent ? theme.shadows[3] : theme.shadows[0],
    borderRadius: theme.shape.borderRadius,
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
    <div style={{ padding: '8px', width: '100%' }}>
      <Tooltip title={title} placement='right' arrow>
        <IconButton
          onClick={(e) => onValueChange(e, value)}
          className={classes.root}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </div>
  );
}

function SideMenu({
  value,
  setValue,
  menuItems,
  isOpen,
  children,
}: PropsWithChildren<SideMenuProps>) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Grid
        direction='column'
        alignItems='flex-start'
        item
        xs
        container
        style={{ color: grey['600'], flexGrow: 0 }}
      >
        {Boolean(children) && children}
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
      <Divider orientation='vertical' />
    </Fragment>
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
  showRoundSelector?: boolean;
  children?: Partial<PanelContent>[];
  value: number;
}

function ContentPanel({
  children,
  value,
  showRoundSelector,
}: ContentPanelProps) {
  const classes = usePanelStyles({ value });
  return (
    <Grid item className={classes.root}>
      {showRoundSelector && <PhaseIndicator fullText />}
      {children.length &&
        children.map(({ content, value: itemValue, title }) => (
          <TabPanel key={title} value={value} index={itemValue}>
            {content}
          </TabPanel>
        ))}
    </Grid>
  );
}
