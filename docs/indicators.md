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

The indicators below are for the page: `Feedback Servicios`

`Page`: [services](/src/components/indicators/services)

#### Servicequalitychildren.Tsx

`File Location`: [ServiceQualityChildren.tsx](/src/components/indicators/services/ServiceQualityChildren.tsx)

| name         | value                                                   | description |
| ------------ | ------------------------------------------------------- | ----------- |
| id           | serviceQualityAdult                                     |             |
| title        | Calidad del servicio                                    |             |
| column       | m18_1                                                   |             |
| filtertype   | \_FilterTypes.IN                                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2    |             |
| methodparams | { aidTypes: serviceTypeChildren, labels, valueColumn, } |             |
| note         |                                                         |             |

#### Servicetypeadult.Tsx

`File Location`: [ServiceTypeAdult.tsx](/src/components/indicators/services/ServiceTypeAdult.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | Ayudas_humanitarias                    |             |
| title        | Ayudas humanitarias                    |             |
| column       | m12                                    |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Servicesatisfychildren.Tsx

`File Location`: [ServiceSatisfyChildren.tsx](/src/components/indicators/services/ServiceSatisfyChildren.tsx)

| name         | value                                                   | description |
| ------------ | ------------------------------------------------------- | ----------- |
| id           | serviceSatisfactionChildren                             |             |
| title        | Recomendación del servicio                              |             |
| column       | m18_1                                                   |             |
| filtertype   | \_FilterTypes.IN                                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2    |             |
| methodparams | { aidTypes: serviceTypeChildren, labels, valueColumn, } |             |
| note         |                                                         |             |

#### Serviceaccesschildren.Tsx

`File Location`: [ServiceAccessChildren.tsx](/src/components/indicators/services/ServiceAccessChildren.tsx)

| name         | value                                                   | description |
| ------------ | ------------------------------------------------------- | ----------- |
| id           | accessServicesAdult                                     |             |
| title        | Accesibilidad                                           |             |
| column       | m18_1                                                   |             |
| filtertype   | \_FilterTypes.IN                                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2    |             |
| methodparams | { aidTypes: serviceTypeChildren, labels, valueColumn, } |             |
| note         |                                                         |             |

#### Servicetypechildren.Tsx

`File Location`: [ServiceTypeChildren.tsx](/src/components/indicators/services/ServiceTypeChildren.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | Ayudas_humanitarias_NNA                |             |
| title        | Ayudas humanitarias NNA                |             |
| column       | m18_1                                  |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Serviceaccessadult.Tsx

`File Location`: [ServiceAccessAdult.tsx](/src/components/indicators/services/ServiceAccessAdult.tsx)

| name         | value                                                | description |
| ------------ | ---------------------------------------------------- | ----------- |
| id           | accessServicesAdult                                  |             |
| title        | Accesibilidad                                        |             |
| column       | m12                                                  |             |
| filtertype   | \_FilterTypes.IN                                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2 |             |
| methodparams | { aidTypes, labels, valueColumn, }                   |             |
| note         |                                                      |             |

#### Servicequalityadult.Tsx

`File Location`: [ServiceQualityAdult.tsx](/src/components/indicators/services/ServiceQualityAdult.tsx)

| name         | value                                                | description |
| ------------ | ---------------------------------------------------- | ----------- |
| id           | serviceQualityAdult                                  |             |
| title        | Calidad del servicio                                 |             |
| column       | m12                                                  |             |
| filtertype   | \_FilterTypes.IN                                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2 |             |
| methodparams | { aidTypes, labels, valueColumn, }                   |             |
| note         |                                                      |             |

#### Servicesatisfyadult.Tsx

`File Location`: [ServiceSatisfyAdult.tsx](/src/components/indicators/services/ServiceSatisfyAdult.tsx)

| name         | value                                                | description |
| ------------ | ---------------------------------------------------- | ----------- |
| id           | serviceSatisfaction                                  |             |
| title        | Recomendación del servicio                           |             |
| column       | m12                                                  |             |
| filtertype   | \_FilterTypes.IN                                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_GROUP_CATEGORIES_ALT_2 |             |
| methodparams | { aidTypes, labels, valueColumn, }                   |             |
| note         |                                                      |             |

#### Serviceavailability.Tsx

`File Location`: [ServiceAvailability.tsx](/src/components/indicators/services/ServiceAvailability.tsx)

| name         | value                                          | description |
| ------------ | ---------------------------------------------- | ----------- |
| id           | aggregateServices                              |             |
| column       | m12                                            |             |
| filtertype   | \_FilterTypes.IN                               |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_SERVICE_AVAILABILITY |             |
| methodparams | { columns: [m14, m15, m16], }                  |             |
| note         |                                                |             |
| title        |                                                |             |

### Introduction

The indicators below are for the page: `Inicio`

`Page`: [introduction](/src/components/indicators/introduction)

#### Principalsimplementor.Tsx

`File Location`: [PrincipalsImplementor.tsx](/src/components/indicators/introduction/PrincipalsImplementor.tsx)

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| column       | [[org_pert1], [org_pert2]]              |             |
| id           | Principales_Implementador               |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams | { columns, }                            |             |
| filtertype   |                                         |             |
| note         |                                         |             |
| title        |                                         |             |

#### Totalpregnant.Tsx

`File Location`: [TotalPregnant.tsx](/src/components/indicators/introduction/TotalPregnant.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| title        | Mujeres gestantes en los grupos        |             |
| column       | m01\_\_en_t                            |             |
| id           | totalPregnant                          |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Totalchronicpatients.Tsx

`File Location`: [TotalChronicPatients.tsx](/src/components/indicators/introduction/TotalChronicPatients.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | m02\_\_en_t                            |             |
| title        | Personas con enfermedades crónicas     |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| id           |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Toporganisations.Tsx

`File Location`: [TopOrganisations.tsx](/src/components/indicators/introduction/TopOrganisations.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | org_pert                               |             |
| id           | top_Organizaciones                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

#### Totaldisabled.Tsx

`File Location`: [TotalDisabled.tsx](/src/components/indicators/introduction/TotalDisabled.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| title        | Personas con condición de discapacidad |             |
| id           | totalDisabled                          |             |
| column       | m03\_\_dent                            |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Totalmigrants.Tsx

`File Location`: [TotalMigrants.tsx](/src/components/indicators/introduction/TotalMigrants.tsx)

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| column       |                                         |             |
| id           | totalMigrants                           |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams | { columns, }                            |             |
| filtertype   |                                         |             |
| note         |                                         |             |
| title        |                                         |             |

#### Organisationcount.Tsx

`File Location`: [OrganisationCount.tsx](/src/components/indicators/introduction/OrganisationCount.tsx)

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| title        | PUNTOS DE SERVICIOS CARACTERIZADOS      |             |
| column       |                                         |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams | { columns, }                            |             |
| filtertype   |                                         |             |
| id           |                                         |             |
| note         |                                         |             |

#### Topsurveylocation.Tsx

`File Location`: [TopSurveyLocation.tsx](/src/components/indicators/introduction/TopSurveyLocation.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | lugar_enc                              |             |
| id           | top_Survey_Sitios                      |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

#### Migrantnationalities.Tsx

`File Location`: [MigrantNationalities.tsx](/src/components/indicators/introduction/MigrantNationalities.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | e08*pais*                              |             |
| id           | nacionalidades_migrantes               |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

#### Introchildtravelparty.Tsx

`File Location`: [IntroChildTravelParty.tsx](/src/components/indicators/introduction/IntroChildTravelParty.tsx)

| name         | value                                                                       | description |
| ------------ | --------------------------------------------------------------------------- | ----------- |
| note         | Presencia de niños, niñas y adolescentes no acompañados y separados         |             |
| id           | nna_viajes_fiesta                                                           |             |
| column       | serv_dif_n                                                                  |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES                                |             |
| methodparams | { columns: [nna_no_aco, nna_separ_], legend: [No acompañados, Separados], } |             |
| filtertype   |                                                                             |             |
| title        |                                                                             |             |

#### Totalchildren.Tsx

`File Location`: [TotalChildren.tsx](/src/components/indicators/introduction/TotalChildren.tsx)

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| column       |                                         |             |
| title        | NNA reportados en los grupos de viaje   |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams | { columns, }                            |             |
| filtertype   |                                         |             |
| id           |                                         |             |
| note         |                                         |             |

#### Totalgenders.Tsx

`File Location`: [TotalGenders.tsx](/src/components/indicators/introduction/TotalGenders.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | e07_gener                              |             |
| id           | géneros                                |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams | { sortType: Sort_Type.ASC, }           |             |
| filtertype   |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

#### Averagegroupsize.Tsx

`File Location`: [AverageGroupSize.tsx](/src/components/indicators/introduction/AverageGroupSize.tsx)

| name         | value                                                                                                                   | description |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------- |
| id           | tamaño_de_grupo_promedio                                                                                                |             |
| column       |                                                                                                                         |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS                                                                                 |             |
| methodparams | { columns: [ { name: e17__cua, type: SummarisationTypes.SUM }, { name: objectid, type: SummarisationTypes.COUNT }, ], } |             |
| filtertype   |                                                                                                                         |             |
| note         |                                                                                                                         |             |
| title        |                                                                                                                         |             |

#### Nnasolo.Tsx

`File Location`: [NnaSolo.tsx](/src/components/indicators/introduction/NnaSolo.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | m06_durant                             |             |
| id           | nna_Solo                               |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams | { sortType: Sort_Type.ASC, }           |             |
| filtertype   |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

#### Totalaurora.Tsx

`File Location`: [TotalAurora.tsx](/src/components/indicators/introduction/TotalAurora.tsx)

| name         | value                                                                  | description |
| ------------ | ---------------------------------------------------------------------- | ----------- |
| column       |                                                                        |             |
| title        | Personas conectadas                                                    |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS                                |             |
| methodparams | { columns: [ { name: objectid, type: SummarisationTypes.COUNT, }, ], } |             |
| filtertype   |                                                                        |             |
| id           |                                                                        |             |
| note         |                                                                        |             |

#### Introchildtravelcompositition.Tsx

`File Location`: [IntroChildTravelCompositition.tsx](/src/components/indicators/introduction/IntroChildTravelCompositition.tsx)

| name         | value                                                                                                                                                                  | description |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| note         | Cuántos niños, niñas y adolescentes no acompañados y separados atendieron durante la semana inmediatamente anterior                                                    |             |
| id           | nna_viajes_fiesta_composición                                                                                                                                          |             |
| column       | serv_dif_n                                                                                                                                                             |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS                                                                                                                                  |             |
| methodparams | { columns: [ { name: cuan_nna_n, type: SummarisationTypes.SUM }, { name: cuan_nna_s, type: SummarisationTypes.SUM }, ], legend: [No Acompañados NNA, Separados NNA], } |             |
| filtertype   |                                                                                                                                                                        |             |
| title        |                                                                                                                                                                        |             |

#### Nnacountry.Tsx

`File Location`: [NnaCountry.tsx](/src/components/indicators/introduction/NnaCountry.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | m07\_\_en_q                            |             |
| id           | nna_solo_países                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

#### Topservices.Tsx

`File Location`: [TopServices.tsx](/src/components/indicators/introduction/TopServices.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | sobrepasa\_                            |             |
| id           | top_Servicios                          |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

#### Childrenpercentage.Tsx

`File Location`: [ChildrenPercentage.tsx](/src/components/indicators/introduction/ChildrenPercentage.tsx)

| name         | value                                   | description |
| ------------ | --------------------------------------- | ----------- |
| title        | Porcentaje NNA en grupos de viaje       |             |
| column       |                                         |             |
| methodname   | EXTERNAL_METHOD_NAMES.AGGREGATE_COLUMNS |             |
| methodparams | { columns, }                            |             |
| filtertype   |                                         |             |
| id           |                                         |             |
| note         |                                         |             |

#### Introsickpremise.Tsx

`File Location`: [IntroSickPremise.tsx](/src/components/indicators/introduction/IntroSickPremise.tsx)

| name         | value                                     | description |
| ------------ | ----------------------------------------- | ----------- |
| column       | princ_re_1                                |             |
| id           | gente_enferma                             |             |
| methodname   | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |
| filtertype   |                                           |             |
| methodparams |                                           |             |
| note         |                                           |             |
| title        |                                           |             |

#### Auroralocation.Tsx

`File Location`: [AuroraLocation.tsx](/src/components/indicators/introduction/AuroraLocation.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| column       | e004_regio                             |             |
| id           | aurora_ubicaciones                     |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| filtertype   |                                        |             |
| methodparams |                                        |             |
| note         |                                        |             |
| title        |                                        |             |

### Dynamic

The indicators below are for the page: `Conexiones en la ruta`

`Page`: [dynamic](/src/components/indicators/dynamic)

#### Mobilesurveytimeline.Tsx

`File Location`: [MobileSurveyTimeline.tsx](/src/components/indicators/dynamic/MobileSurveyTimeline.tsx)

| name         | value                                                                              | description |
| ------------ | ---------------------------------------------------------------------------------- | ----------- |
| id           | Localización_de_personas_migrantes_conectadas_a_Aurora_en_los_distintos_monitoreos |             |
| title        | Personas migrantes conectadas a Aurora                                             |             |
| column       |                                                                                    |             |
| filtertype   | \_FilterTypes.IN                                                                   |             |
| methodname   | EXTERNAL_METHOD_NAMES.TIMELINE_VALUES_ALT                                          |             |
| methodparams |                                                                                    |             |
| note         |                                                                                    |             |

#### Averageelapseddays.Tsx

`File Location`: [AverageElapsedDays.tsx](/src/components/indicators/dynamic/AverageElapsedDays.tsx)

| name         | value                                                                         | description |
| ------------ | ----------------------------------------------------------------------------- | ----------- |
| id           | Días*promedio_transcuridos_entre_Enganche_y*último_monitoreo                  |             |
| column       | dias                                                                          |             |
| note         | Tiempo estimado (días) que ha transcurrido entre el enganche y el último push |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_AVERAGE_ELAPSED_DAYS                                |             |
| filtertype   |                                                                               |             |
| methodparams |                                                                               |             |
| title        |                                                                               |             |

#### Avgdaybycountry.Tsx

`File Location`: [AvgDayByCountry.tsx](/src/components/indicators/dynamic/AvgDayByCountry.tsx)

| name         | value                                                                                                   | description |
| ------------ | ------------------------------------------------------------------------------------------------------- | ----------- |
| id           | Días*promedio_transcurridos_entre_Enganche_y*último_monitoreo_por_aís                                   |             |
| column       | pais_fin                                                                                                |             |
| note         | Tiempo estimado (días) que ha transcurrido entre el enganche y el último país de localización reportado |             |
| filtertype   | \_FilterTypes.IN                                                                                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_AVG_DAYS_BY_COUNTRY                                                           |             |
| methodparams | { valueColumn: dias, }                                                                                  |             |
| title        |                                                                                                         |             |

### Migration

The indicators below are for the page: `Flujos Migratorios`

`Page`: [migration](/src/components/indicators/migration)

#### Transitinfomation.Tsx

`File Location`: [TransitInfomation.tsx](/src/components/indicators/migration/TransitInfomation.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | Necesidades_de_información             |             |
| title        | Necesidades de información             |             |
| column       | m28\_\_que                             |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Countrydeparted.Tsx

`File Location`: [CountryDeparted.tsx](/src/components/indicators/migration/CountryDeparted.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | País_inicial_de_flujo_migratorio       |             |
| title        | País inicial de flujo migratorio       |             |
| column       | e10*pais*                              |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Transitstoplength.Tsx

`File Location`: [TransitStopLength.tsx](/src/components/indicators/migration/TransitStopLength.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | Días_de_estadía                        |             |
| title        | Días de estadía                        |             |
| column       | m30\_\_cua                             |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Countryresiding.Tsx

`File Location`: [CountryResiding.tsx](/src/components/indicators/migration/CountryResiding.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | País_donde_vivía                       |             |
| title        | País donde vivía                       |             |
| column       | e12*pais*                              |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Origincountry.Tsx

`File Location`: [OriginCountry.tsx](/src/components/indicators/migration/OriginCountry.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | País_de_nacimiento                     |             |
| title        | País de nacimiento                     |             |
| column       | e08*pais*                              |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Countryflow.Tsx

`File Location`: [CountryFlow.tsx](/src/components/indicators/migration/CountryFlow.tsx)

| name         | value                                                                            | description |
| ------------ | -------------------------------------------------------------------------------- | ----------- |
| id           | Country Flow                                                                     |             |
| title        | Migración de flujo de país                                                       |             |
| column       | e08*pais*                                                                        |             |
| filtertype   | \_FilterTypes.IN                                                                 |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_SUNBURST_HIERARCHY                                     |             |
| methodparams | { lv2: e12*pais*, lv3: e10*pais*, colorScaleType: COLOR_SCALE_TYPE.SEQUENTIAL, } |             |
| note         |                                                                                  |             |

#### Transportmode.Tsx

`File Location`: [TransportMode.tsx](/src/components/indicators/migration/TransportMode.tsx)

| name         | value                                     | description |
| ------------ | ----------------------------------------- | ----------- |
| id           | Medios_de_transporte                      |             |
| title        | Medios de transporte                      |             |
| column       | e14_medios                                |             |
| filtertype   | \_FilterTypes.STRING_SEARCH               |             |
| methodname   | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |
| methodparams |                                           |             |
| note         |                                           |             |

#### Transitstopreason.Tsx

`File Location`: [TransitStopReason.tsx](/src/components/indicators/migration/TransitStopReason.tsx)

| name         | value                                     | description |
| ------------ | ----------------------------------------- | ----------- |
| id           | Razón_no_continúa_viaje                   |             |
| title        | Razón no continúa viaje                   |             |
| column       | m29_por_qu                                |             |
| filtertype   | \_FilterTypes.STRING_SEARCH               |             |
| methodname   | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |
| methodparams |                                           |             |
| note         |                                           |             |

### Media

The indicators below are for the page: `Redes sociales`

`Page`: [media](/src/components/indicators/media)

#### Sentimentpresentages.Tsx

`File Location`: [SentimentPresentages.tsx](/src/components/indicators/media/SentimentPresentages.tsx)

| name         | value | description |
| ------------ | ----- | ----------- |
| column       |       |             |
| filtertype   |       |             |
| id           |       |             |
| methodname   |       |             |
| methodparams |       |             |
| note         |       |             |
| title        |       |             |

#### Sentimenttimeline.Tsx

`File Location`: [SentimentTimeline.tsx](/src/components/indicators/media/SentimentTimeline.tsx)

| name         | value | description |
| ------------ | ----- | ----------- |
| column       |       |             |
| filtertype   |       |             |
| id           |       |             |
| methodname   |       |             |
| methodparams |       |             |
| note         |       |             |
| title        |       |             |

#### Mediaorigin.Tsx

`File Location`: [MediaOrigin.tsx](/src/components/indicators/media/MediaOrigin.tsx)

| name         | value | description |
| ------------ | ----- | ----------- |
| column       |       |             |
| filtertype   |       |             |
| id           |       |             |
| methodname   |       |             |
| methodparams |       |             |
| note         |       |             |
| title        |       |             |

#### Mediaengagement.Tsx

`File Location`: [MediaEngagement.tsx](/src/components/indicators/media/MediaEngagement.tsx)

| name         | value | description |
| ------------ | ----- | ----------- |
| column       |       |             |
| filtertype   |       |             |
| id           |       |             |
| methodname   |       |             |
| methodparams |       |             |
| note         |       |             |
| title        |       |             |

#### Topphrases.Tsx

`File Location`: [TopPhrases.tsx](/src/components/indicators/media/TopPhrases.tsx)

| name         | value      | description |
| ------------ | ---------- | ----------- |
| column       | topPhrases |             |
| filtertype   |            |             |
| id           |            |             |
| methodname   |            |             |
| methodparams |            |             |
| note         |            |             |
| title        |            |             |

#### Mediaaggregateindicators.Tsx

`File Location`: [MediaAggregateIndicators.tsx](/src/components/indicators/media/MediaAggregateIndicators.tsx)

| name         | value  | description |
| ------------ | ------ | ----------- |
| column       | source |             |
| filtertype   |        |             |
| id           |        |             |
| methodname   |        |             |
| methodparams |        |             |
| note         |        |             |
| title        |        |             |

### Premise

The indicators below are for the page: `Servicios`

`Page`: [premise](/src/components/indicators/premise)

#### Aggreatedservices.Tsx

`File Location`: [AggreatedServices.tsx](/src/components/indicators/premise/AggreatedServices.tsx)

| name         | value                                                                                                                                                                                     | description |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| title        | Capacidad de atención y operación del punto de servicio o ayuda humanitaria                                                                                                               |             |
| methodname   | EXTERNAL_METHOD_NAMES.GET_CONNECTED_DOT_SERVICES                                                                                                                                          |             |
| methodparams | { otherColumns, serviceStatColumns: Object.fromEntries(SERVICE_STAT_COLUMNS), servicesKey: Object.fromEntries(SERVICES_KEY), serviceStatColumnLength: SERVICE_STAT_COLUMNS_NAME.length, } |             |
| column       |                                                                                                                                                                                           |             |
| filtertype   |                                                                                                                                                                                           |             |
| id           |                                                                                                                                                                                           |             |
| note         |                                                                                                                                                                                           |             |

#### Childrendiffservices.Tsx

`File Location`: [ChildrenDiffServices.tsx](/src/components/indicators/premise/ChildrenDiffServices.tsx)

| name         | value                                     | description |
| ------------ | ----------------------------------------- | ----------- |
| id           | childrenDifferentiatedServices            |             |
| title        | Cuales servicios diferenciados            |             |
| column       | cual_ser_1                                |             |
| filtertype   | \_FilterTypes.STRING_SEARCH               |             |
| methodname   | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |
| methodparams |                                           |             |
| note         |                                           |             |

#### Childdiffservicesavailabilty.Tsx

`File Location`: [ChildDiffServicesAvailabilty.tsx](/src/components/indicators/premise/ChildDiffServicesAvailabilty.tsx)

| name         | value                                                                                                                   | description |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------- |
| note         | El punto de servicio/ayuda humanitaria actualmente cuenta con servicios diferenciados para niños, niñas y adolescentes? |             |
| id           | childrenDiffirentiatedServicesAvailability                                                                              |             |
| column       | serv_dif_n                                                                                                              |             |
| filtertype   | \_FilterTypes.IN                                                                                                        |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES                                                                                  |             |
| methodparams |                                                                                                                         |             |
| title        |                                                                                                                         |             |

#### Orgsurveyed.Tsx

`File Location`: [OrgSurveyed.tsx](/src/components/indicators/premise/OrgSurveyed.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | Socio_implementador                    |             |
| title        | Socio implementador                    |             |
| column       | org_pert1                              |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Childrentravelparty.Tsx

`File Location`: [ChildrenTravelParty.tsx](/src/components/indicators/premise/ChildrenTravelParty.tsx)

| name         | value                                                                       | description |
| ------------ | --------------------------------------------------------------------------- | ----------- |
| note         | Presencia de niños, niñas y adolescentes no acompañados y separados         |             |
| id           | childrenTravelParty                                                         |             |
| column       | serv_dif_n                                                                  |             |
| filtertype   | \_FilterTypes.IN                                                            |             |
| methodname   | EXTERNAL_METHOD_NAMES.STACKED_BAR_CATEGORIES                                |             |
| methodparams | { columns: [nna_no_aco, nna_separ_], legend: [No acompañados, Separados], } |             |
| title        |                                                                             |             |

#### Organisationprincipals.Tsx

`File Location`: [OrganisationPrincipals.tsx](/src/components/indicators/premise/OrganisationPrincipals.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | Socio_Principal                        |             |
| title        | Socio Principal                        |             |
| column       | org_pert2                              |             |
| filtertype   | \_FilterTypes.IN                       |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Childrentravelpartycomposition.Tsx

`File Location`: [ChildrenTravelPartyComposition.tsx](/src/components/indicators/premise/ChildrenTravelPartyComposition.tsx)

| name         | value                                                                                                                 | description |
| ------------ | --------------------------------------------------------------------------------------------------------------------- | ----------- |
| note         | Cuántos niños, niñas y adolescentes no acompañados y separados atendieron durante la semana inmediatamente anterior   |             |
| id           | childrenTravelPartyComposition                                                                                        |             |
| column       | serv_dif_n                                                                                                            |             |
| filtertype   | \_FilterTypes.IN                                                                                                      |             |
| methodname   | EXTERNAL_METHOD_NAMES.GROUPED_COLUMNS                                                                                 |             |
| methodparams | { columns: [cuan_nna_n, cuan_nna_s], legend: [Acompañados NNA, Separados NNA], aggregateType: AggregationTypes.SUM, } |             |
| title        |                                                                                                                       |             |

#### Childrenundercare.Tsx

`File Location`: [ChildrenUnderCare.tsx](/src/components/indicators/premise/ChildrenUnderCare.tsx)

| name         | value                                  | description |
| ------------ | -------------------------------------- | ----------- |
| id           | childrenUnderCare                      |             |
| title        | Identificación de NNA atendidos        |             |
| column       | nna_atend                              |             |
| filtertype   | \_FilterTypes.CLOSED_OPEN              |             |
| methodname   | EXTERNAL_METHOD_NAMES.HISTOGRAM_VALUES |             |
| methodparams |                                        |             |
| note         |                                        |             |

#### Servicesprovided.Tsx

`File Location`: [ServicesProvided.tsx](/src/components/indicators/premise/ServicesProvided.tsx)

| name         | value                                     | description |
| ------------ | ----------------------------------------- | ----------- |
| id           | serviceProvided                           |             |
| title        | Tipos de servicios prestados en el punto  |             |
| column       | serv_tipo1                                |             |
| filtertype   | \_FilterTypes.STRING_SEARCH               |             |
| methodname   | EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES |             |
| methodparams |                                           |             |
| note         |                                           |             |
