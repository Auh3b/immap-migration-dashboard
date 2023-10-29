import ArrowRight from '@material-ui/icons/ArrowRight';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  Fragment,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ROUTE_PATHS } from 'routes';
import { setPhase } from 'store/appSlice';
import { useDispatch } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const phases = {
  0: {
    index: 0,
    title: '',
    content: (
      <Fragment>
        <ContextText>
          Desde mediados del 2021 se presenta una crisis migratoria sin
          precedentes en las regiones de Centro y Suramérica, especialmente en
          la Selva del Darién, catalogada como uno de los pasos migratorios más
          peligrosos del mundo como “la falta de agua segura, exposición a
          riesgos naturales, animales salvajes, robos, abuso y explotación”.
        </ContextText>
        <ContextText>
          De acuerdo con autoridades panameñas, entre enero y agosto de 2023 se
          registraron 333.704 personas en tránsito, cruzando la selva del
          Darién; cifra récord con tendencia al alza. De las más de 300 mil
          personas que han atravesado la Selva desde enero de este año el 21%
          corresponde a niños, niñas y adolescentes; quienes se enfrentan a los
          riesgos y dificultades de cruzar por distintos países en este contexto
          de crisis migratoria.
        </ContextText>
        <ContextText>
          En este escenario, obtener información sobre las necesidades
          cambiantes de la población durante la ruta, las características
          diferenciales de los grupos de viaje o el nivel de satisfacción
          respecto de la ayuda recibida resulta clave para mejorar la respuesta
          humanitaria. Una alternativa para recabar data de alta frecuencia son
          los chatbot, los cuales se presentan como una opción innovadora en
          contextos de crisis humanitaria.
        </ContextText>
        <ContextText>
          3iSolitions, con el apoyo de UNICEF, propone una metodología novedosa
          para la caracterización y monitoreo de la demanda y oferta de
          servicios humanitarios a población migrante en varios países de
          América Latina, con especial énfasis en niños, niñas y adolescentes.
          Los tres principales objetivos del proyecto son:
        </ContextText>
        <List>
          <ContextListItem>
            Caracterizar la oferta de servicios de atención humanitaria en los
            diferentes puntos y áreas geográficas de tránsito de personas
            migrantes, con el fin de informar a los programas y operaciones de
            terreno respecto de las condiciones de los servicios prestados en
            cada una de las zonas del estudio.
          </ContextListItem>
          <ContextListItem>
            Implementar un sistema de monitoreo que provea información de alta
            frecuencia al personal humanitario y operadores de servicios sobre
            la capacidad, ocupación, calidad de servicios, así como también
            respecto de las características del flujo migratorio.
          </ContextListItem>
          <ContextListItem>
            Proveer de información oportuna sobre la oferta de servicios
            humanitarios a población migrante en tránsito, con especial enfoque
            en la niñez y adolescencia en la ruta entre Chile - Colombia –
            Panamá – Costa Rica.
          </ContextListItem>
        </List>
      </Fragment>
    ),
  },
  1: {
    index: 1,
    title: 'Phase 1',
    content: (
      <Fragment>
        <ContextText>
          Este Dashboard muestra los principales resultados y análisis,
          obtenidos de los datos recolectados en la primera ronda en la cual
          participaron Colombia – Panamá – Costa Rica, los cuales ayudan, entre
          otras cosas, a la comprensión del fenómeno migratorio en esta región,
          la elaboración de planes de respuesta ante el aumento de volumen de
          migrantes, o, para generar un sistema de alertas tempranas a los
          tomadores de decisiones. La primera ronda se desplegó desde el 6 de
          marzo al 4 de abril de 2023 en Necoclí (Colombia), Panamá (frontera
          norte y sur) y Costa Rica (frontera norte y sur), donde se probó por
          primera vez la tecnología y metodología en su conjunto. En esta primer
          ronda:
        </ContextText>
        <List>
          <ContextListItem>
            46 puntos de servicios de ayuda humanitaria caracterizados en
            Colombia, Panamá y Costa Rica.
          </ContextListItem>
          <ContextListItem>
            1505 personas conectadas durante la ruta con Aurora
          </ContextListItem>
          <ContextListItem>
            9572 personas en los grupos de viaje (25% del total de personas que
            cruzaron la Selva del Darién en marzo de 2023).
          </ContextListItem>
          <ContextListItem>
            8 países en los que la población interactuó con Aurora.
          </ContextListItem>
          <ContextListItem>
            2375 interacciones de monitoreo con Aurora
          </ContextListItem>
        </List>
      </Fragment>
    ),
  },
  2: {
    index: 2,
    title: 'Phase 2',
    content: (
      <Fragment>
        <ContextText>
          Este Dashboard muestra los principales resultados y análisis,
          obtenidos de los datos recolectados en la segunda ronda en la cual
          participaron además de Colombia, Panamá y Costa Rica, se incluyeron
          las dinámicas de la frontera norte en Chile. En esta segunda ronda,
          además de los ejercicios realizados en la ronda anterior, se realizó
          énfasis en la evaluación de servicios por medio de QR, obteniendo
          feedback de la población migrante en los puntos de servicios
          utilizados, para capturar percepción de accesibilidad, satisfacción y
          experiencia sobre los servicios recibidos. El ejercicio de recolección
          comenzó el 9 de octubre y tomará 6 semanas, se realiza en Chile
          (Arica, Iquique y Colchane), Colombia (Necoclí, Ipiales y Cucutá),
          Panamá (frontera sur) y Costa Rica (frontera norte y sur).
        </ContextText>
      </Fragment>
    ),
  },
};

export default function PhaseContent({ phase }) {
  return (
    <>
      {' '}
      <Typography
        color='primary'
        variant={'h5'}
        style={{
          textTransform: 'uppercase',
          width: '100%',
          marginBottom: '16px',
        }}
      >
        Monitoreo de Flujos Migratorios Mixtos y su Acceso a Servicios en Chile,
        Colombia, Costa Rica y Panamá
      </Typography>
      <Grid
        item
        style={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        {<Phase {...phases[phase || 0]} />}
      </Grid>
      <PhaseButtonContainer phase={phase} />
    </>
  );
}

interface PhaseProps {
  index: number;
  title: string;
  content: string | ReactNode;
}

function Phase(props: PropsWithChildren<PhaseProps>) {
  const contextContainerRef = useRef<HTMLDivElement>();
  const [containerHeight, setContainerHeight] = useState<number>(0);
  useEffect(() => {
    if (contextContainerRef.current) {
      setContainerHeight(contextContainerRef.current.clientHeight);
    }
  }, [contextContainerRef.current]);
  return (
    <Grid
      innerRef={contextContainerRef}
      container
      direction='column'
      style={{ width: '100%', height: '100%' }}
    >
      {Boolean(props.index) && (
        <Typography variant={'h5'} style={{ marginBottom: '8px' }}>
          {props.title}
        </Typography>
      )}
      <Grid
        item
        style={{
          paddingRight: '16px',
          width: '100%',
          maxHeight: containerHeight ? containerHeight * 0.95 : 0,
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {props.content}
        {Boolean(props.index) && <PhaseSelect index={props.index} />}
      </Grid>
    </Grid>
  );
}

interface PhaseButtonProps {
  index: number;
  phase: number;
}

interface PhaseSelectProps {
  index: number;
}
function PhaseSelect(props: PhaseSelectProps) {
  return (
    <Button
      component={Link}
      to={ROUTE_PATHS.INTRODUCTION}
      color={'primary'}
      endIcon={<ArrowRight />}
      style={{ alignSelf: 'flex-start', marginTop: '16px' }}
    >
      Explorar Ronda {props.index}
    </Button>
  );
}

function PhaseButton(props: PhaseButtonProps) {
  const isActive = Boolean(props.index === props.phase);
  const dispatch = useDispatch();
  const handleClick = (index: number) => {
    return () => {
      dispatch(setPhase(index));
    };
  };
  return (
    <Button
      color={isActive ? 'primary' : 'inherit'}
      onClick={handleClick(props.index)}
      variant={'contained'}
      style={{
        margin: '8px 8px 8px 0px',
        minWidth: 'unset',
        alignSelf: 'flex-start',
      }}
    >
      {props.index}
    </Button>
  );
}

interface PhaseButtonContainerProps {
  phase: number;
}
function PhaseButtonContainer(props: PhaseButtonContainerProps) {
  return (
    <Grid
      container
      style={{ padding: '8px 0px' }}
      alignContent={'center'}
      wrap='nowrap'
    >
      <Button
        disabled
        style={{
          margin: '8px 8px 8px 0px',
          minWidth: 'unset',
          alignSelf: 'flex-start',
        }}
        endIcon={<ArrowRight />}
      >
        Seleccionar Ronda
      </Button>
      <PhaseButton index={1} {...props} />
      <PhaseButton index={2} {...props} />
    </Grid>
  );
}

function ContextListItem(props: PropsWithChildren<{}>) {
  return (
    <ListItem dense>
      <ListItemIcon color='primary'>
        <FiberManualRecordIcon color='primary' />
      </ListItemIcon>
      <ListItemText disableTypography style={{ fontSize: '12px' }}>
        {props.children}
      </ListItemText>
    </ListItem>
  );
}

function ContextText(props: PropsWithChildren<{}>) {
  return (
    <Typography
      style={{ fontSize: '12px', marginBottom: '8px', textAlign: 'justify' }}
    >
      {props.children}
    </Typography>
  );
}
