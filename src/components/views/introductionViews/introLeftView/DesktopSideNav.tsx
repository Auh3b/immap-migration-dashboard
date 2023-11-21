import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TuneIcon from '@material-ui/icons/Tune';
import FilterListIcon from '@material-ui/icons/FilterList';
import IntroContent from './IntroContent';
import IntroExtraFilters from './IntroExtraFilters';
import SideAnalyticsPanel from 'components/common/sideAnalysticsPanel/Index';
import { ActiveFilters } from 'components/common/sideAnalysticsPanel/ActiveFilters';
import { StateSlices } from 'utils/types';
import { SideAnalyticsPanelProps } from 'components/common/sideAnalysticsPanel/sideAnalyticsPanelTypes';

const sidePanelProps: SideAnalyticsPanelProps = {
  children: [
    {
      content: <IntroContent />,
      value: 1,
      title: 'Metodología',
      icon: <HelpOutlineIcon />,
    },
    {
      content: (
        <ActiveFilters filterSources={[{ stateSlice: StateSlices.INTRO }]} />
      ),
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
  ],
};
export default function DesktopSideNav() {
  return <SideAnalyticsPanel {...sidePanelProps} />;
}
