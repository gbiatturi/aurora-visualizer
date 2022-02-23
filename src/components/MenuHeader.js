import React, { useState } from "react";
import {
  Container,
  Menu,
  Image,
  Button,
  Segment
} from "semantic-ui-react";

import { NavLink } from 'react-router-dom'

import { useEthers } from '@usedapp/core'

const MenuHeader = () => {
  const { deactivate, activateBrowserWallet, account } = useEthers()
  const [activeItem, setActiveItem] = useState()

  const handleItemClick = (event, data) => {
    setActiveItem(data.name)
  }

  return (
    <Segment>
      <Container>
        <Menu secondary stackable>
          <Menu.Item>
            <Image size='mini' src='/logo192.png' />
          </Menu.Item>
          <Menu.Item header position='left'>Aurora Visualizer</Menu.Item>

          <Menu.Item as={NavLink} to="/"
            name='overview'
            active={activeItem === 'overview'}
            onClick={handleItemClick}>Overview</Menu.Item>

          <Menu.Item as={NavLink} to="/gallery"
            name='gallery'
            active={activeItem === 'gallery'}
            onClick={handleItemClick}>NFT Gallery</Menu.Item>

          <Menu.Item as={NavLink} to="/send"
            name='send'
            active={activeItem === 'send'}
            onClick={handleItemClick}>Send eth</Menu.Item>

          <Menu.Item position="right">
            {!account && <Button primary onClick={() => activateBrowserWallet()}>Connect</Button>}
            {account && <Button secondary onClick={() => deactivate()}>Disconnect</Button>}
          </Menu.Item>
        </Menu>
      </Container>
    </Segment>
  );
}

export default MenuHeader;