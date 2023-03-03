import { addFilter, removeFilter } from "@carto/react-redux";
import { BarWidgetUI, WrapperWidgetUI } from "@carto/react-ui";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { defaultCustomWidgetProps } from "./customWidgetsType";
import useWidgetFetch from "./hooks/useWidgetFetch";
import useWidgetFilterValues from "./hooks/useWidgetFilterValues";

const EMPTY_ARRAY: [] = [];

export default function CustomBarWidget({
  id,
  title,
  method,
  dataSource,
  column,
  filterType,
  labels = {},
}: defaultCustomWidgetProps) {
  const [xData, setXData] = useState([])
  const [yData, setYData] = useState([])

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

  useMemo(() => {
    //@ts-ignore
    setXData(data?.map((k)=> k.name))
    //@ts-ignore
    setYData(data?.map((v)=> v.value))
  }, [data])

  return (
    <WrapperWidgetUI
      title={title} 
      isLoading={isLoading} 
      onError={error}
    >
      {(data || !isLoading) && <BarWidgetUI
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
        selectedCategories={selectedCategories}
        labels={labels}
        yAxisData={yData}
        xAxisData={xData}
      />}
      
    </WrapperWidgetUI>
  )
}
