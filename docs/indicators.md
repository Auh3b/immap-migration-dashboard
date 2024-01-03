# INDICATORS

Indicators are data visualisation showing aggrigated data based on column having interaction between the map and the chart. Indicators extent [Carto Widgets](https://docs.carto.com/carto-for-developers/carto-for-react/library-reference/widgets), with other custom visualisation developed based on project requirement.

## Components

### Basic Component

Most indicators are visualised based on the props.

- **Input**:

  | Param              | Type   | Description                                            |
  | ------------------ | ------ | ------------------------------------------------------ |
  | props              | object |                                                        |
  | props.id           | string | ID for the widget instance.                            |
  | props.title        | string | Title to show in the widget header.                    |
  | props.dataSource   | string | ID of the data source to get the data from.            |
  | props.column       | string | Name of the data source’s column to get the data from. |
  | props.filterType   | string |                                                        |
  | props.methodName   | string | Name of the method to which operation of the data      |
  | props.methodParams | object | Extra parameters to be added to the method             |

- **Example**:
  In this example, the indicator displays the count of organisations.

  ```JavaScript
    import  customPieChart  from "components/common/customWidgets/CustomPieWidget
    import { _FilterTypes } from @carto/react-core
    import { EXTERNAL_METHOD_NAMES } from utils/methods/methods

    return (
      <CustomPieWidget
        id="organisationSurveyed"
        title = "Socio implementador"
        dataSource = "aurora_round_1"
        column = "org_pert1"
        filterType = {_FilterTypes.IN}
        methodName ={EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES}
      />
    )
  ```

Though you can go decide yourself the strategy to which to design indicators. However, most of the indicators follow this pattern:

- **Example:**

```JavaScript
export default function TransportMode({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget {...props} dataSource={dataSource} />,
    [dataSource],
  )
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  )
}
```

## Project Indicators

The following section highlights all the indicators used in this application

### Services

#### Servicequalitychildren.Tsx

| name         | value                                                   | description |
| ------------ | ------------------------------------------------------- | ----------- |
| note         | Nivel de satisfacción del servicio prestado al migrante |             |
| id           | serviceQualityAdult                                     |             |
| title        | Calidad del servicio                                    |             |
| filtertype   | \_FilterTypes.IN                                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2    |             |
| methodparams |                                                         |             |

#### Servicetypeadult.Tsx

| name       | value                                                | description |
| ---------- | ---------------------------------------------------- | ----------- |
| note       | Ayudas humanitarias recibidas según zona de tránsito |             |
| id         | Ayudas_humanitarias                                  |             |
| title      | Ayudas humanitarias                                  |             |
| filtertype | \_FilterTypes.IN                                     |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES               |             |

#### Servicesatisfychildren.Tsx

| name         | value                                                | description |
| ------------ | ---------------------------------------------------- | ----------- |
| note         | Nivel de satisfacción del servicio tomado            |             |
| id           | serviceSatisfactionChildren                          |             |
| title        | Recomendación del servicio                           |             |
| filtertype   | \_FilterTypes.IN                                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2 |             |
| methodparams |                                                      |             |

#### Serviceaccesschildren.Tsx

| name         | value                                                | description |
| ------------ | ---------------------------------------------------- | ----------- |
| note         | Percepción de accesibilidad a servicios humanitarios |             |
| id           | accessServicesAdult                                  |             |
| title        | Accesibilidad                                        |             |
| filtertype   | \_FilterTypes.IN                                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2 |             |
| methodparams |                                                      |             |

#### Servicetypechildren.Tsx

| name       | value                                                | description |
| ---------- | ---------------------------------------------------- | ----------- |
| note       | Ayudas humanitarias recibidas según zona de tránsito |             |
| id         | Ayudas_humanitarias_NNA                              |             |
| title      | Ayudas humanitarias NNA                              |             |
| filtertype | \_FilterTypes.IN                                     |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES               |             |

#### Serviceaccessadult.Tsx

| name         | value                                                | description |
| ------------ | ---------------------------------------------------- | ----------- |
| note         | Percepción de accesibilidad a servicios humanitarios |             |
| id           | accessServicesAdult                                  |             |
| title        | Accesibilidad                                        |             |
| filtertype   | \_FilterTypes.IN                                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2 |             |
| methodparams |                                                      |             |

#### Servicequalityadult.Tsx

| name         | value                                                   | description |
| ------------ | ------------------------------------------------------- | ----------- |
| note         | Nivel de satisfacción del servicio prestado al migrante |             |
| id           | serviceQualityAdult                                     |             |
| title        | Calidad del servicio                                    |             |
| filtertype   | \_FilterTypes.IN                                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2    |             |
| methodparams |                                                         |             |

#### Servicesatisfyadult.Tsx

| name         | value                                                | description |
| ------------ | ---------------------------------------------------- | ----------- |
| note         | Disposición para recomendar el servicio tomado       |             |
| id           | serviceSatisfaction                                  |             |
| title        | Recomendación del servicio                           |             |
| filtertype   | \_FilterTypes.IN                                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2 |             |
| methodparams |                                                      |             |

#### Serviceavailability.Tsx

| name         | value                                          | description |
| ------------ | ---------------------------------------------- | ----------- |
| title        | Aggregate Service Performance                  |             |
| id           | aggregateServices                              |             |
| filtertype   | \_FilterTypes.IN                               |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_SERVICE_AVAILABILITY |             |
| methodparams |                                                |             |
| note         |                                                |             |

### Introduction

#### Principalsimplementor.Tsx

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| title        | Socios implementadores/Principales      |             |
| id           | Principales_Implementador               |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams |                                         |             |

#### Totalpregnant.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| title      | Mujeres gestantes en los grupos        |             |
| id         | totalPregnant                          |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Totalchronicpatients.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| id         | totalChronicPatients                   |             |
| title      | Personas con enfermedades crónicas     |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Toporganisations.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| title      | Top de 5 organizaciones                |             |
| id         | top_Organizaciones                     |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Totaldisabled.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| title      | Personas con condición de discapacidad |             |
| id         | totalDisabled                          |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Totalmigrants.Tsx

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| title        | Personas en los grupos de viaje         |             |
| id           | totalMigrants                           |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams |                                         |             |

#### Organisationcount.Tsx

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| id           | organización_count                      |             |
| title        | PUNTOS DE SERVICIOS CARACTERIZADOS      |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams |                                         |             |

#### Topsurveylocation.Tsx

| name       | value                                      | description |
| ---------- | ------------------------------------------ | ----------- |
| title      | Total de encuestas por área de recolección |             |
| id         | top_Survey_Sitios                          |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES     |             |

#### Migrantnationalities.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| title      | Nacionalidad de la persona conectada   |             |
| id         | nacionalidades_migrantes               |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Introchildtravelparty.Tsx

| name         | value                                        | description |
| ------------ | -------------------------------------------- | ----------- |
| title        | NNA no acompañados y separados               |             |
| note         |                                              |             |
| id           | nna_viajes_fiesta                            |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES |             |
| methodparams |                                              |             |

#### Totalchildren.Tsx

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| id           | totalChildren                           |             |
| title        | NNA reportados en los grupos de viaje   |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams |                                         |             |

#### Totalgenders.Tsx

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| title        | Género                                 |             |
| id           | géneros                                |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |

#### Averagegroupsize.Tsx

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| title        | Tamaño promedio de los grupos de viaje  |             |
| id           | tamaño_de_grupo_promedio                |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams |                                         |             |

#### Nnasolo.Tsx

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| title        | Presencia de NNA solos                 |             |
| id           | nna_Solo                               |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |

#### Totalaurora.Tsx

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| id           | totalAurora                             |             |
| title        | Personas conectadas                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams |                                         |             |

#### Introchildtravelcompositition.Tsx

| name         | value                                 | description |
| ------------ | ------------------------------------- | ----------- |
| title        |                                       |             |
| note         |                                       |             |
| id           | nna_viajes_fiesta_composición         |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS |             |
| methodparams |                                       |             |

#### Nnacountry.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| title      | Identificación NNA solos               |             |
| id         | nna_solo_países                        |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Topservices.Tsx

| name       | value                                            | description |
| ---------- | ------------------------------------------------ | ----------- |
| title      | PUNTOS DE SERVICIOS SOBREPASADOS EN SU CAPACIDAD |             |
| id         | top_Servicios                                    |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES           |             |

#### Childrenpercentage.Tsx

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| id           | nna_porcentaje                          |             |
| title        | Porcentaje NNA en grupos de viaje       |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams |                                         |             |

#### Introsickpremise.Tsx

| name       | value                                     | description |
| ---------- | ----------------------------------------- | ----------- |
| title      | Retos del punto de servicio               |             |
| id         | gente_enferma                             |             |
| methodname | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |

#### Auroralocation.Tsx

| name       | value                                                     | description |
| ---------- | --------------------------------------------------------- | ----------- |
| title      | Distribución por zona geográfica donde la persona conectó |             |
| id         | aurora_ubicaciones                                        |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES                    |             |

### Dynamic

#### Mobilesurveytimeline.Tsx

| name       | value                                     | description |
| ---------- | ----------------------------------------- | ----------- |
| note       |                                           |             |
| id         |                                           |             |
| title      | Personas migrantes conectadas a Aurora    |             |
| filtertype | \_FilterTypes.IN                          |             |
| methodname | EXTERNAL_METHOD_NAMES.TIMELINE_VALUES_ALT |             |

#### Averageelapseddays.Tsx

| name       | value                                                        | description |
| ---------- | ------------------------------------------------------------ | ----------- |
| title      | Días promedio transcuridos entre Enganche y último monitoreo |             |
| id         | Días*promedio_transcuridos_entre_Enganche_y*último_monitoreo |             |
| note       |                                                              |             |
| methodname | EXTERNAL_METHOD_NAMES.GET_AVERAGE_ELAPSED_DAYS               |             |

#### Avgdaybycountry.Tsx

| name         | value                                         | description |
| ------------ | --------------------------------------------- | ----------- |
| title        |                                               |             |
| id           |                                               |             |
| note         |                                               |             |
| filtertype   | \_FilterTypes.IN                              |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_AVG_DAYS_BY_COUNTRY |             |
| methodparams |                                               |             |

### Migration

#### Transitinfomation.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| note       |                                        |             |
| id         | Necesidades_de_información             |             |
| title      | Necesidades de información             |             |
| filtertype | \_FilterTypes.IN                       |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Countrydeparted.Tsx

| name       | value                                       | description |
| ---------- | ------------------------------------------- | ----------- |
| note       | País desde donde inicia el flujo migratorio |             |
| id         | País_inicial_de_flujo_migratorio            |             |
| title      | País inicial de flujo migratorio            |             |
| filtertype | \_FilterTypes.IN                            |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES      |             |

#### Transitstoplength.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| note       |                                        |             |
| id         | Días_de_estadía                        |             |
| title      | Días de estadía                        |             |
| filtertype | \_FilterTypes.IN                       |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Countryresiding.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| note       | País donde vivía hace un año.          |             |
| id         | País_donde_vivía                       |             |
| title      | País donde vivía                       |             |
| filtertype | \_FilterTypes.IN                       |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |

#### Origincountry.Tsx

| name       | value                                         | description |
| ---------- | --------------------------------------------- | ----------- |
| note       | País de nacimiento del migrante que responde. |             |
| id         | País_de_nacimiento                            |             |
| title      | País de nacimiento                            |             |
| filtertype | \_FilterTypes.IN                              |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES        |             |

#### Countryflow.Tsx

| name         | value                                        | description |
| ------------ | -------------------------------------------- | ----------- |
| note         | Migración de flujo de país                   |             |
| id           | Country Flow                                 |             |
| title        | Migración de flujo de país                   |             |
| filtertype   | \_FilterTypes.IN                             |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_SUNBURST_HIERARCHY |             |
| methodparams |                                              |             |

#### Transportmode.Tsx

| name       | value                                          | description |
| ---------- | ---------------------------------------------- | ----------- |
| note       | Medios de transporte empleados durante la ruta |             |
| id         | Medios_de_transporte                           |             |
| title      | Medios de transporte                           |             |
| filtertype | \_FilterTypes.STRING_SEARCH                    |             |
| methodname | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES      |             |

#### Transitstopreason.Tsx

| name       | value                                     | description |
| ---------- | ----------------------------------------- | ----------- |
| note       | Razón (es) para no continuar el viaje.    |             |
| id         | Razón_no_continúa_viaje                   |             |
| title      | Razón no continúa viaje                   |             |
| filtertype | \_FilterTypes.STRING_SEARCH               |             |
| methodname | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |

### Media

#### Sentimentpresentages.Tsx

| name | value | description |
| ---- | ----- | ----------- |

#### Sentimenttimeline.Tsx

| name | value | description |
| ---- | ----- | ----------- |

#### Mediaorigin.Tsx

| name | value | description |
| ---- | ----- | ----------- |

#### Mediaengagement.Tsx

| name | value                         | description |
| ---- | ----------------------------- | ----------- |
| id   | Serie_de_compromiso_histórico |             |

#### Topphrases.Tsx

| name | value | description |
| ---- | ----- | ----------- |

#### Mediaaggregateindicators.Tsx

| name | value | description |
| ---- | ----- | ----------- |

### Premise

#### Aggreatedservices.Tsx

| name         | value                                            | description |
| ------------ | ------------------------------------------------ | ----------- |
| id           |                                                  |             |
| title        |                                                  |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_CONNECTED_DOT_SERVICES |             |
| methodparams |                                                  |             |

#### Childrendiffservices.Tsx

| name       | value                                     | description |
| ---------- | ----------------------------------------- | ----------- |
| note       |                                           |             |
| id         | childrenDifferentiatedServices            |             |
| title      | Cuales servicios diferenciados            |             |
| filtertype | \_FilterTypes.STRING_SEARCH               |             |
| methodname | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |

#### Childdiffservicesavailabilty.Tsx

| name       | value                                      | description |
| ---------- | ------------------------------------------ | ----------- |
| title      | Servicios diferenciados para NNA           |             |
| note       |                                            |             |
| id         | childrenDiffirentiatedServicesAvailability |             |
| filtertype | \_FilterTypes.IN                           |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES     |             |

#### Orgsurveyed.Tsx

| name       | value                                                      | description |
| ---------- | ---------------------------------------------------------- | ----------- |
| note       | Nombre de la organización a la que pertenece el encuestado |             |
| id         | Socio_implementador                                        |             |
| title      | Socio implementador                                        |             |
| filtertype | \_FilterTypes.IN                                           |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES                     |             |

#### Childrentravelparty.Tsx

| name         | value                                        | description |
| ------------ | -------------------------------------------- | ----------- |
| title        | NNA no acompañados y separados               |             |
| note         |                                              |             |
| id           | childrenTravelParty                          |             |
| filtertype   | \_FilterTypes.IN                             |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES |             |
| methodparams |                                              |             |

#### Organisationprincipals.Tsx

| name       | value                                                       | description |
| ---------- | ----------------------------------------------------------- | ----------- |
| note       | Nombre de la organización a la que pertenece el encuestado  |             |
| id         | Socio_Principal                                             |             |
| title      | Socio Principal                                             |             |
| filtertype | \_FilterTypes.IN                                            |             |
| methodname | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES                      |             |

#### Childrentravelpartycomposition.Tsx

| name         | value                                 | description |
| ------------ | ------------------------------------- | ----------- |
| title        |                                       |             |
| note         |                                       |             |
| id           | childrenTravelPartyComposition        |             |
| filtertype   | \_FilterTypes.IN                      |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS |             |
| methodparams |                                       |             |

#### Childrenundercare.Tsx

| name       | value                                  | description |
| ---------- | -------------------------------------- | ----------- |
| note       |                                        |             |
| id         | childrenUnderCare                      |             |
| title      | Identificación de NNA atendidos        |             |
| filtertype | \_FilterTypes.CLOSED_OPEN              |             |
| methodname | EXTERNAL_METHOD_NAMES.HISTOGRAM_VALUES |             |

#### Servicesprovided.Tsx

| name       | value                                     | description |
| ---------- | ----------------------------------------- | ----------- |
| note       |                                           |             |
| id         | serviceProvided                           |             |
| title      | Tipos de servicios prestados en el punto  |             |
| filtertype | \_FilterTypes.STRING_SEARCH               |             |
| methodname | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |
