import { ReactComponent as UnicefLogo } from 'assets/img/unice-logo-1-sp.svg';
import OrgLogo from 'assets/img/3iSolution_tagless.png';
export default function AppLogos() {
  return (
    <>
      <UnicefLogo />
      <img src={OrgLogo} style={{ height: '24px' }} />
    </>
  );
}
