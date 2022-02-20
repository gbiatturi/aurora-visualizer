import React, { useState } from "react";
import {
  Container,
  Menu,
  Image,
  Button
} from "semantic-ui-react";

import { NavLink, withRouter } from 'react-router-dom'

import { useEthers } from '@usedapp/core'

const MenuHeader = () => {
  const { deactivate, activateBrowserWallet, account } = useEthers()
  const [activeItem, setActiveItem] = useState()

  const handleItemClick = (event, data) => {
    setActiveItem(data.name)
  }

  return (
    <Menu borderless>
      <Container>
        <Menu.Item>
          <Image size='mini' src='/logo192.png' />
        </Menu.Item>
        <Menu.Item header position='left'>Aurora Visualizer</Menu.Item>

        <Menu.Item as={NavLink} to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}>Home</Menu.Item>

        <Menu.Item as={NavLink} to="/gallery"
          name='gallery'
          active={activeItem === 'gallery'}
          onClick={handleItemClick}>NFT Gallery</Menu.Item>

        <Menu.Item as={NavLink} to="/transaction"
          name='transaction'
          active={activeItem === 'transaction'}
          onClick={handleItemClick}>Transaction</Menu.Item>

        <Menu.Item position="right">
          {!account && <Button primary onClick={() => activateBrowserWallet()}>Connect</Button>}
          {account && <Button secondary onClick={() => deactivate()}>Disconnect</Button>}
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default MenuHeader;