import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import IntroContent from './IntroContent';
import IntroExtraFilters from './IntroExtraFilters';
import SideAnalyticsPanel from 'components/common/sideAnalysticsPanel/Index';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';

export default function DesktopSideNav() {
  return (
    <SideAnalyticsPanel>
      {[
        {
          content: <IntroContent />,
          value: 1,
          title: 'Metodología',
          icon: <HelpOutlineIcon />,
        },
        {
          content: <ActiveFilters filterSources={[{ stateSlice: 'intro' }]} />,
          value: 2,
          title: 'Filtros Activos',
          icon: <FilterListIcon />,
        },
        {
          content: <IntroExtraFilters />,
          value: 3,
          title: 'Filtros Adicionales',
          icon: <TuneIcon />,
        },
      ]}
    </SideAnalyticsPanel>
  );
}
