import React from "react";
import {
  Container,
  Menu,
  Image,
  Button
} from "semantic-ui-react";

import { useEthers } from '@usedapp/core'

const MenuHeader = () => {
  const { deactivate, activateBrowserWallet, account } = useEthers()

  return (
    <Menu borderless>
      <Container>
        <Menu.Item>
          <Image size='mini' src='/logo192.png' />
        </Menu.Item>
        <Menu.Item header position='left'>Aurora Visualizer</Menu.Item>

        <Menu.Item as='a'>Account</Menu.Item>
        <Menu.Item as='a'>NFT Gallery</Menu.Item>
        <Menu.Item as='a'>API Test</Menu.Item>

        <Menu.Item position="right">
          {!account && <Button primary onClick={() => activateBrowserWallet()}>Connect</Button>}
          {account && <Button secondary onClick={() => deactivate()}>Disconnect</Button>}
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default MenuHeader;