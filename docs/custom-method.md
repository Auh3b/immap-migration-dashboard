# CUSTOM METHODS

The application allows for adding in your own aggregation functions as per your requirements. Besides a few indicators the output of the function should follow the schema below:

- **Input**:

  | Params | Type   | Description                                               |
  | ------ | ------ | --------------------------------------------------------- |
  | Data   | Array  | An array of data object based on the data source          |
  | Column | string | The column of filled to be used as an aggregation element |
  | Params | Object | Extra parameters to be added to the method                |

- **Returns**: `Array` - An array of `Objects` having properties of name `string` and value `number`.

  ```Typescript
    [
      {
        "name": string,
        "value": number
      }
    ]
  ```

  A value formatter can be applied to the name property inside the indicator.

- **Example**:

  ```TypeScript
    function CustomAggregate(data: any[], column: string, params: Record<string, unknown>): { name: string, value:number}[]
  ```

## How to add custom method to application

To add the custom method or aggregation function, use the following steps:

1. Add the custom function in the function director [`~/src/components/indicators/utils`](/src/utils/)
2. Add the script reference in methodWorker registery (Map) [`~/src/utils/methods/methods.ts`](/src/utils/methods/methods.ts)

   ```JavaScript
    export const EXTERNAL_METHODS = {
      NEW_NAME: "new_name"
    }
   ```

3. Add the function to worker scripts [`~/src/utils/method/methodWorker.ts`](/src/utils/methods/methodWorker.ts)

   ```JavaScript
    import new_method from "~/src/components/indicators/utils"
    import { EXTERNAL_METHODS } from "~/src/utils/method/methods.ts

    const methodMap = new Map([
      [EXTERNAL_METHOD.NEW_METHOD, new_method]
    ])
   ```

4. Add the method name to the desired indicator component

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
       methodName ={EXTERNAL_METHOD_NAMES.NEW_METHOD}
     />
   )
   ```

## Project Methods

Methods or function developed for calculating indicators include:

- `AggregateColumns` - [Link](/src/components/indicators/utils/AggregateColumns.ts)
- `concatenatedValues` - [Link](/src/components/indicators/utils/concatenatedValues.ts)
- `getAverageElapsedDays` - [Link](/src/components/indicators/utils/getAverageElapsedDays.tsx)
- `getAvgDaysByCountry` - [Link](/src/components/indicators/utils/getAvgDaysByCountry.tsx)
- `getConnectDotServices` - [Link](/src/components/indicators/utils/getConnectDotServices.tsx)
- `getHierarchy` - [Link](/src/components/indicators/utils/getHierarchy.ts)
- `getServiceAvailability` - [Link](/src/components/indicators/utils/getServiceAvailability.tsx)
- `getSunburstHierarchy` - [Link](/src/components/indicators/utils/getSunburstHierarchy.tsx)
- `groupCategories` - [Link](/src/components/indicators/utils/groupCategories.ts)
- `histogramValues` - [Link](/src/components/indicators/utils/histogramValues.ts)
- `miscelleniousFunctions` - [Link](/src/components/indicators/utils/miscelleniousFunctions.ts)
- `singleStackBarValues` - [Link](/src/components/indicators/utils/singleStackBarValues.ts)
- `stackCategoryTotals` - [Link](/src/components/indicators/utils/stackCategoryTotals.ts)
- `stackedBarCategories` - [Link](/src/components/indicators/utils/stackedBarCategories.ts)
- `stackedGroupCategories` - [Link](/src/components/indicators/utils/stackedGroupCategories.ts)
- `stackedGroupCategoriesAlt2` - [Link](/src/components/indicators/utils/stackedGroupCategoriesAlt2.ts)
- `stackedGroupCategoryAlt` - [Link](/src/components/indicators/utils/stackedGroupCategoryAlt.ts)
- `timelineValueAlt` - [Link](/src/components/indicators/utils/timelineValueAlt.tsx)
- `timelineValues` - [Link](/src/components/indicators/utils/timelineValues.ts)
