# INDICATORS

Indicators are data visualisation showing aggrigated data based on column having interaction between the map and the chart. Indicators extent [Carto Widgets](https://docs.carto.com/carto-for-developers/carto-for-react/library-reference/widgets), with other custom visualisation developed based on project requirement.

## Components

### Basic Component

Most indicators are visualised based on the props.

- **Input**:

  | Param              | Type   | Default | Description |
  | ------------------ | ------ | ------- | ----------- |
  | props              | object |         |             |
  | props.id           | string |         |             |
  | props.title        | string |         |             |
  | props.dataSource   | string |         |             |
  | props.column       | string |         |             |
  | props.filterType   | string |         |             |
  | props.methodName   | string |         |             |
  | props.methodParams | object |         |             |

- **Example**:
  In this example, the indicator displays the count of organisations.

  ```JavaScript
    import  customPieChart  from "components/common/customWidgets/CustomPieWidget
    import { _FilterTypes } from '@carto/react-core';
    import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

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
