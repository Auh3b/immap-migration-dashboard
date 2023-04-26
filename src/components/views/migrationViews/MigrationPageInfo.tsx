import { Box, Grid, ListItem, ListItemText, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
  root:{
    padding: theme.spacing(2)
  },
  body:{
    marginBottom: theme.spacing(2)
  },
  list:{

  },
  listItem:{

  },
  listSubHeader:{
    ...theme.typography.subtitle2
  }
}))

export default function MigrationPageInfo() {
  const classes = useStyles()
  return (
    <>
    {/* @ts-ignore */}
      <Box component={'div'} className={classes.root}>
        <Typography variant='subtitle1'>
          Nota metodológica
        </Typography>
        <Typography className={classes.body}>
          En este dashboard se visualizan distintos flujos migratorios de las personas que se conectaron a Aurora Chatbot. Los datos presentados son los siguientes:
        </Typography>
        <ul>
          <li className={classes.listItem}>
	            <span className={classes.listSubHeader}>País de nacimiento:</span> marca la ubicación de nacimiento de la persona que se conectó a Aurora.
          </li>
          <li className={classes.listItem}>
              <span className={classes.listSubHeader}>País donde vivía:</span> refiere al país donde la persona conectada reportó que vivía hace un año.
          </li>
          <li className={classes.listItem}>
	            <span className={classes.listSubHeader}>País de inicio del flujo migratorio:</span> en este indicador se ubica el punto donde la persona conectada inició su viaje, pudiendo diferir del país de nacimiento y país donde vivía hace un año, lo que puede indicar que el viaje actual corresponde a una migración secundaria.
          </li>
        </ul>

        <Typography className={classes.body}>
          Cabe señalar que estos datos se unen a la ubicación (con latitud y longitud) de la primera conexión de la persona migrante con Aurora. En ese sentido, las líneas conectadas directamente con Necoclí, Panamá o Costa Rica no implican un viaje directo hasta estos puntos, sino el lugar de conexión del usuario.
        </Typography>
        <Typography className={classes.body}>
          Para filtrar la información de interés hacer click sobre la gráfica de anillos, sobre los indicadores o sobre los layers en el mapa.
        </Typography>
      </Box>
    </>
  )
}
