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

Though you can go decide yourself the strategy to which to design indicators. However, most of the indicators follow this pattern:

- **Example:**

```JavaScript
export default function TransportMode({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomCategoryWidget {...props} dataSource={dataSource} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
```
