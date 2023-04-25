import {
  Button,
  Collapse,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useState } from 'react';
import { UNICEF_COLORS } from 'theme';
export const useLeftStyles = makeStyles((theme) => ({
  root: {
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
  button: {
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'left',
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
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      ...theme.typography.body1,
      fontSize: '0.75rem',
    },
  },
}));
export default function IntroLeftView() {
  const classes = useLeftStyles();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      item
      lg={3}
      md={12}
      className={classes.root}
    >
      <Grid item>
        <Button
          className={classes.button}
          onClick={handleOpenToggle}
          endIcon={isOpen ? <Remove /> : <Add />}
        >
          <>
            <Typography variant='subtitle1' className={classes.title}>
              Nota metodológica
              <Typography className={classes.subtitle}>
                A Aurora Chatbot
              </Typography>
            </Typography>
          </>
        </Button>
        <Collapse in={isOpen} className={classes.collapse}>
          <Typography className={classes.description}>
            El Monitoreo de Flujos Migratorios Mixtos y su acceso a Servicios de
            Asistencia Humanitaria corresponde a un proyecto conjunto entre
            UNICEF y iMMAP que tiene –entre sus principales objetivos–
            caracterizar y monitorear la oferta y demanda de servicios de
            asistencia humanitaria en la ruta en Necoclí (Colombia), Panamá y
            Costa Rica.
          </Typography>
          <Typography className={classes.description}>
            La recolección de la información se realizó por dos principales
            instrumentos. El primero de ellos fue un cuestionario aplicado a los
            administradores de los puntos de asistencia humanitaria en las
            distintas zonas de despliegue del proyecto, recolectando datos de 46
            puntos de servicio para caracterizar la oferta de la ayuda brindada
            a la población en tránsito. El segundo, correspondió a un
            cuestionario autodiligenciado para población migrante en tránsito
            llamado Aurora Chatbot. Este chatbot fue diseñado con enfoque doble
            vía, en el cual la población migrante en tránsito entregó
            información sobre su grupo de viaje a la vez que evaluó la
            asistencia humanitaria a la que accedió (el/la informante y su grupo
            de viaje) durante la ruta.
          </Typography>
          <Typography className={classes.description}>
            Si bien el periodo de recolección para ambos ejercicios se
            desarrolló entre el 06 de marzo y 03 de abril cabe señalar que el
            instrumento desplegado a través de Aurora Chatbot sigue recopilando
            datos, ya que la población migrante se conecta por medio de un
            código QR al chatbot, reportando información sobre su grupo de viaje
            y evaluando los servicios de asistencia a los que han accedido; esta
            información será actualizada periódicamente.
          </Typography>
          <Typography variant='subtitle1'>Consideraciones</Typography>
          <Typography className={classes.description}>
            Los datos de chatbot fueron recolectados en distintos puntos de
            tránsito de la población, conectándose a población mayor de 18 años
            que aceptó la política de tratamiento de datos del chatbot.
          </Typography>
          <Typography className={classes.description}>
            Tenga en cuenta que algunas preguntas de ambos cuestionarios fueron
            de opción múltiple, por lo que los totales pueden no coincidir con
            el número de personas o servicios encuestados.
          </Typography>
          <Typography className={classes.description}>
            Las cifras presentadas en los tableros son preliminares.
          </Typography>
        </Collapse>
      </Grid>
      <Grid item container spacing={2} alignItems='center'>
        <Grid item>
          <CalendarTodayIcon />
        </Grid>
        <Grid item>
          <Typography variant='overline'>
            06 de marzo al 03 de abril.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
