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

| Name                   | Type   | Default | Description |
| ---------------------- | ------ | ------- | ----------- |
| children               | Object |         |
| children.side          | object |         |             |
| children.side.children | Array  |         |
| children.left          | Object |         |
| children.right         | Object |         |
| children.bottom        | Object |         |

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
