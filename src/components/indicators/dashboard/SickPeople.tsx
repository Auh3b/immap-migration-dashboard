import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomBarWidget from 'components/common/customWidgets/CustomBarWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import groupCategories from '../utils/groupCategories';

const method = groupCategories;

const NOTE ='Personas con alguna enfermedad crónica (diabetes, hipertensión, asma, etc.)';
const id = 'sickPeople';
const title = 'Población que duerme a la intemperie';
const column = 'cb_fl_id13';
const filterType = _FilterTypes.IN;

export default function SickPeople({ dataSource }: BasicWidgetType) {
  return (
    <Grid item>
      <CustomBarWidget
        id={id}
        title={title}
        column={column}
        dataSource={dataSource}
        filterType={filterType}
        method={method}
      />
      <WidgetNote note={NOTE} />
    </Grid>
  );
}
