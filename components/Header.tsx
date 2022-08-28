import { Menu } from 'semantic-ui-react';
// @ts-ignore
import { Link } from '@/routes';

const Header = () => (
  <Menu style={{ marginTop: 10 }}>
    <Link route="/">
      <a className="item">CrowdCoin</a>
    </Link>
    <Menu.Menu position="right">
      <Link route="/">
        <a className="item">Campaigns</a>
      </Link>
      <Link route="/campaigns/new">
        <a className="item">+</a>
      </Link>
    </Menu.Menu>
  </Menu>
);

export default Header;
