import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = (props) => (
  <Menu style={{marginTop: 10}}>
    <Menu.Item>CrowdCoin</Menu.Item>
    <Menu.Menu  position="right">
      <Menu.Item>Campaigns</Menu.Item>
      <Menu.Item>+</Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Header;
