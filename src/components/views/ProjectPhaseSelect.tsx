import PhaseDeckMap from './phaseSelectView/PhaseDeckMap';
import { ArrowRight } from '@material-ui/icons';
import { Button, Fab, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { ROUTE_PATHS } from 'routes';
import { makeStyles } from '@material-ui/core/styles';
import { setPhase } from 'store/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  projectPhaseSelect: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(8),
  },
}));

const phases = {
  1: {
    index: 1,
    title: 'Phase 1',
    content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
    blanditiis temporibus in cum expedita totam exercitationem ducimus
    molestias, esse voluptatem?`,
  },
  2: {
    index: 2,
    title: 'Phase 2',
    content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
    blanditiis temporibus in cum expedita totam exercitationem ducimus
    molestias, esse voluptatem?`,
  },
};

export default function ProjectPhaseSelect() {
  const classes = useStyles();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);

  // [hygen] Add useEffect

  return (
    <Grid
      container
      justifyContent={'space-between'}
      className={classes.projectPhaseSelect}
    >
      <Grid item md={6} container direction='column'>
        <Typography
          variant={'h4'}
          style={{ textTransform: 'uppercase', marginBottom: '32px' }}
        >
          Monitoreo Flujos Migratorios Mixtos
        </Typography>
        <Grid item style={{ flexGrow: 1 }}>
          {phase ? <Phase {...phases[phase]} /> : <PhaseIntro />}
        </Grid>
        <PhaseButtonContainer phase={phase} />
      </Grid>
      <Grid item md={6}>
        <PhaseDeckMap />
      </Grid>
    </Grid>
  );
}

function PhaseIntro() {
  return (
    <Typography>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. A, autem atque
      adipisci, veritatis doloremque placeat dolor, tempora consectetur ipsa
      reiciendis ab ex distinctio sit. Assumenda harum repellendus maxime magnam
      excepturi inventore, doloribus deserunt? Recusandae error unde ea.
      Voluptates, sint blanditiis.
    </Typography>
  );
}

interface PhaseProps {
  index: number;
  title: string;
  content: string;
}

function Phase(props: PropsWithChildren<PhaseProps>) {
  return (
    <Grid container direction='column' style={{ height: '100%' }}>
      <Typography variant={'h5'} style={{ marginBottom: '8px' }}>
        {props.title}
      </Typography>
      <Typography>{props.content}</Typography>
      <PhaseSelect index={props.index} />
    </Grid>
  );
}

interface PhaseButtonProps {
  index: number;
  phase: number;
}

const useButtonStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: theme.spacing(2),
    borderRadius: '100%',
  },
}));
interface PhaseSelectProps {
  index: number;
}
function PhaseSelect(props: PhaseSelectProps) {
  return (
    <Button
      component={Link}
      to={ROUTE_PATHS.INTRODUCTION}
      variant={'contained'}
      endIcon={<ArrowRight />}
      style={{ alignSelf: 'flex-start', marginTop: '32px' }}
    >
      Explore Phase {props.index}
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
    <Fab
      color={isActive ? 'primary' : 'default'}
      onClick={handleClick(props.index)}
    >
      {props.index}
    </Fab>
  );
}

interface PhaseButtonContainerProps {
  phase: number;
}
function PhaseButtonContainer(props: PhaseButtonContainerProps) {
  return (
    <Grid container style={{ gap: '16px' }}>
      <PhaseButton index={1} {...props} />
      <PhaseButton index={2} {...props} />
    </Grid>
  );
}
