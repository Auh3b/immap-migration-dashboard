import { Grid, IconButton, Paper, Typography, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme)=>({
  root:{
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4)
  }
}))

export default function InformationSection() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () =>{
    setIsOpen((prev) => !prev)
  }
  return (
    <Paper className={classes.root}>
      {isOpen ? 
        <InfoContent />
        :
        <InfoButtion isOpen={isOpen} handleToggle={handleToggle}/>
      }
    </Paper>
  )
}

function InfoButtion({isOpen, handleToggle}:any){
  return(
  <IconButton onClick={handleToggle}>
    {isOpen ? <ErrorIcon /> : <ErrorOutlineIcon /> }
  </IconButton>
  )
}

function InfoContent({content=''}:any){
  const classes = useStyles()
  return (
    <Grid container direction='column' item>
      <Typography variant='overline'>
        This is space is reserved for information pertaining to the section your views
      </Typography>
    </Grid>
  )
}
