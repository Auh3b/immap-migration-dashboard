# CUSTOM METHODS

The application allows for adding in your own aggregation functions as per your requirements. Besides a few indicators the output of the function should follow the schema below:

- **Input**:
  | Params | Type | Description |
  | ------- | ------ | ----- |
  | Data | Array |
  | Column | string | |
  | Params | Object | |

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
