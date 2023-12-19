# Pages

You can use code generator to quickly set a page as shown [here](https://docs.carto.com/carto-for-developers/carto-for-react/guides/views)

However there are some few modification depending on what type of page you are trying to make.

At the top level of view component you return `MainView` component that renders the following sections (see illustration below):

- Map Component
- Side Panel Views
- Bottom view
- Side Bar

![view components](./assets//view%20components.png 'view components')

The `MainView` component takes in the takes in a child component as Object:

| Name                       | Type   | Default | Description                                                     |
| -------------------------- | ------ | ------- | --------------------------------------------------------------- |
| children                   | Object |         |
| children.side              | object |         |                                                                 |
| children.side.children     | Array  |         |
| children.left              | Object |         |
| children.left.element      | Object |         | React component having indicator components                     |
| children.left.expandable   |        | false   | if `true` the section will be expanded from the default bounds. |
| children.right             | Object |         |
| children.right.element     | Object |         | React component having indicator components                     |
| children.right.expandable  |        | false   | if `true` the section will be expanded from the default bounds. |
| children.bottom            | Object |         |
| children.bottom.element    | Object |         | React component having indicator components                     |
| children.bottom.expandable |        | false   | if `true` the section will be expanded from the default bounds. |

- **Example:**

```JavaScript
return (
    <MainView>
        {{
        side: {
          children: [
            {
              content: <MigrationPageInfo />,
              value: 1,
              title: 'Metodología',
              icon: <HelpOutlineIcon />,
            },
            {
              content: (
                <ActiveFilters
                  filterSources={[{ stateSlice: StateSlices.CARTO }]}
                />
              ),
              value: 2,
              title: 'Filtros Activos',
              icon: <FilterListIcon />,
            },
            {
              content: <MigrationFilters />,
              value: 3,
              title: 'Filtros Adicionales',
              icon: <TuneIcon />,
            },
          ],
        },
        left: {
          element: (
            <MigrationLeftView
              dataSources={{ mainSource: { id: MAIN_SOURCE_ID } }}
            />
          ),
          expandable: false,
        },
        right: {
          element: phase !== 2 && (
            <MigrationRightView
              dataSources={{ mainSource: { id: MAIN_SOURCE_ID } }}
            />
          ),
          expandable: false,
        },
      }}
    </MainView>
)

```

You can added a wrapper component of your indicators/visualisation as a side panel component. The strategy in most existing wrapper component is to also add a `dataSources` in order to field to [indicator](./indicators.md) component to used as fetch data from appropriate sources which correspond to the loaded data.

- **example:**

```JavaScript
export default function MigrationLeftView(props) {
  const { dataSources: { mainSource } } = props
  return (
    <>
      <CountryFlow dataSource={mainSource} />
      <OriginCountry dataSource={mainSource} />
      <CountryResiding dataSource={mainSource} />
      <CountryDeparted dataSource={mainSource} />
    </>
  );
}
```
