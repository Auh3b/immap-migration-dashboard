import {
  ClickAwayListener,
  Divider,
  Drawer,
  Fab,
  Fade,
  Grid,
  IconButton,
  Popper,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { MouseEvent, useState } from 'react';
import { CustomTheme, UNICEF_COLORS } from 'theme';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { clsx } from 'clsx';

const drawerWidth = 300;

export const useLeftStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    BorderRight: `1px solid ${UNICEF_COLORS[0]}`,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
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
  content: {
    background: theme.palette.background.paper,
    border: '1px solid' + theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    width: ({ isOpen, isMobile }: any) =>
      isOpen ? '300px' : isMobile ? '90%' : theme.mixins.toolbar.minHeight,
    display: ({ isOpen, isMobile }: any) =>
      isOpen ? 'flex' : isMobile ? 'block' : 'none',
    maxHeight: '85vh',
    overflowY: 'auto',
    overflowX: 'hidden',

    transition:
      'width ' +
      theme.transitions.duration.enteringScreen +
      'ms' +
      ' ease-in-out',
  },
  toggleButton: {
    padding: theme.spacing(0.5),
    boxShadow: theme.shadows[1],
    backgroundColor: ({ isOpen }: any) =>
      isOpen ? UNICEF_COLORS[0] : theme.palette.grey[100],
    color: ({ isOpen }: any) =>
      isOpen ? theme.palette.background.paper : 'inherit',
    '&:hover': {
      color: ({ isOpen }: any) =>
        isOpen ? theme.palette.background.paper : 'inherit',
      backgroundColor: ({ isOpen }: any) =>
        isOpen ? UNICEF_COLORS[0] : 'inherit',
      boxShadow: theme.shadows[10],
    },
  },
  button: {
    width: '100%',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'fixed',
    zIndex: theme.zIndex.modal + 1,
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
  title: {
    textAlign: 'left',
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    ...theme.typography.caption,
    textAlign: 'justify',
  },
  collapse: {
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  description: {
    textAlign: 'justify',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      ...theme.typography.body1,
      fontSize: '0.75rem',
    },
  },
  popper: {
    zIndex: ({ isMobile }: any) => (isMobile ? theme.zIndex.modal + 1 : 0),
  },
}));
export default function IntroLeftView() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const isMobile = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down('xs'),
  );
  const classes = useLeftStyles({ isOpen, isMobile });
  return (
    <>
      {!isMobile && (
        <IntroDesktop
          classes={classes}
          isOpen={isOpen}
          handleOpenToggle={handleOpenToggle}
        >
          <IntroContent classes={classes} />
        </IntroDesktop>
      )}
      {isMobile && (
        <IntroMobile
          classes={classes}
          isOpen={isOpen}
          handleOpenToggle={handleOpenToggle}
        >
          <IntroContent classes={classes} />
        </IntroMobile>
      )}
    </>
  );
}

function IntroDesktop({ isOpen, classes, handleOpenToggle, children }: any) {
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
      <div className={classes.buttonContainer}>
        <IconButton onClick={handleOpenToggle} style={{ borderRadius: '100%' }}>
          {isOpen && <ChevronLeftIcon />}
          {!isOpen && <HelpOutlineIcon />}
        </IconButton>
      </div>
      <Divider />
      {children}
    </Drawer>
  );
}

function IntroMobile({ classes, children }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopup = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl((anchor) => (anchor ? null : e.currentTarget));
  };
  const onClickAway = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <ClickAwayListener onClickAway={onClickAway}>
        <Fab className={classes.fab} onClick={handlePopup}>
          <HelpOutlineIcon />
        </Fab>
      </ClickAwayListener>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement='top-end'
        className={classes.popper}
      >
        {({ TransitionProps }) => <Fade {...TransitionProps}>{children}</Fade>}
      </Popper>
    </>
  );
}

function IntroContent({ classes }: any) {
  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      className={classes.content}
    >
      <Typography variant='subtitle1' className={classes.title}>
        Nota metodológica
        <Typography className={classes.subtitle}>A Aurora Chatbot</Typography>
      </Typography>
      <Typography className={classes.description}>
        El Monitoreo de Flujos Migratorios Mixtos y su acceso a Servicios de
        Asistencia Humanitaria corresponde a un proyecto conjunto entre UNICEF y
        iMMAP que tiene –entre sus principales objetivos– caracterizar y
        monitorear la oferta y demanda de servicios de asistencia humanitaria en
        la ruta en Necoclí (Colombia), Panamá y Costa Rica.
      </Typography>
      <Typography className={classes.description}>
        La recolección de la información se realizó por dos principales
        instrumentos. El primero de ellos fue un cuestionario aplicado a los
        administradores de los puntos de asistencia humanitaria en las distintas
        zonas de despliegue del proyecto, recolectando datos de 46 puntos de
        servicio para caracterizar la oferta de la ayuda brindada a la población
        en tránsito. El segundo, correspondió a un cuestionario autodiligenciado
        para población migrante en tránsito llamado Aurora Chatbot. Este chatbot
        fue diseñado con enfoque doble vía, en el cual la población migrante en
        tránsito entregó información sobre su grupo de viaje a la vez que evaluó
        la asistencia humanitaria a la que accedió (el/la informante y su grupo
        de viaje) durante la ruta.
      </Typography>
      <Typography className={classes.description}>
        Si bien el periodo de recolección para ambos ejercicios se desarrolló
        entre el 06 de marzo y 03 de abril cabe señalar que el instrumento
        desplegado a través de Aurora Chatbot sigue recopilando datos, ya que la
        población migrante se conecta por medio de un código QR al chatbot,
        reportando información sobre su grupo de viaje y evaluando los servicios
        de asistencia a los que han accedido; esta información será actualizada
        periódicamente.
      </Typography>
      <Typography variant='subtitle1'>Consideraciones</Typography>
      <Typography className={classes.description}>
        Los datos de chatbot fueron recolectados en distintos puntos de tránsito
        de la población, conectándose a población mayor de 18 años que aceptó la
        política de tratamiento de datos del chatbot.
      </Typography>
      <Typography className={classes.description}>
        Tenga en cuenta que algunas preguntas de ambos cuestionarios fueron de
        opción múltiple, por lo que los totales pueden no coincidir con el
        número de personas o servicios encuestados.
      </Typography>
      <Typography className={classes.description}>
        Las cifras presentadas en los tableros son preliminares.
      </Typography>
    </Grid>
  );
}
