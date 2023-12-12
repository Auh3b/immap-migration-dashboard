# CUSTOM METHODS

The application allows for adding in your own aggregation functions as per your requirements. Besides a few indicators the output of the function should follow the schema below:

- **Input**:

  | Params | Type   | Description |
  | ------ | ------ | ----------- |
  | Data   | Array  |             |
  | Column | string |             |
  | Params | Object |             |

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

1. Add the custom function in the function director `/app-id/src/components/indicators/utils`
2. Add the script reference in methodWorker registery (Map) `/app-id/src/utils/method/methods.ts`

   ```JavaScript
    export const EXTERNAL_METHODS = {
      NEW_NAME: "new_name"
    }
   ```

3. Add the function to worker scripts `/app-id/src/utils/method/methods.ts`

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
