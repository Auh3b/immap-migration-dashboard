import { addFilter, removeFilter } from "@carto/react-redux";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { defaultCustomWidgetProps } from "./customWidgetsType";
import useWidgetFetch from "./hooks/useWidgetFetch";
import useWidgetFilterValues from "./hooks/useWidgetFilterValues";
import { FormulaWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { makeStyles } from "@material-ui/core";

const EMPTY_ARRAY: [] = [];

const useStyles = makeStyles(()=>({
  group:{
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  }
}))

export default function ToggleWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType,
  labels = {},
}: defaultCustomWidgetProps) {
  const classes = useStyles()
  const dispatch = useDispatch();
  const selectedCategories =
    useWidgetFilterValues({
      dataSource,
      column,
      id,
      type: filterType,
    }) || EMPTY_ARRAY;

  const handleSelectedCategoriesChange = useCallback(
    (categories) => {
      if (categories && categories.length) {
        dispatch(
          addFilter({
            id: dataSource,
            column,
            type: filterType,
            values: categories,
            owner: id,
          }),
        );
      } else {
        dispatch(
          removeFilter({
            id: dataSource,
            column,
            owner: id,
          }),
        );
      }
    },
    [column, dataSource, filterType, id, dispatch],
  );

  const { data, isLoading, error } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
  });
  console.log(data)

  const [selected, setSelected] = useState([]);

  const handleAlignment = (event:any, newAlignment:any) => {
    setSelected(newAlignment);
  };
  return(
    <WrapperWidgetUI
      title={title}
      isLoading={isLoading}
    >
      <ToggleButtonGroup
        value={selected}
        onChange={handleAlignment}
        arial-label='text alignment'
      >
        {data && data.map(({name, value}:AgeType, index)=>{
          return(
            <ToggleButton className={classes.group} value={name} key={index} arial-label={name}>
              <span>{name}</span>
              <FormulaWidgetUI
              data={value}
              />
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </WrapperWidgetUI>
  )
}

interface AgeType{
  name: string;
  value: number;
}
