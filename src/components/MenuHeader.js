import React from "react";
import { 
  Container, 
  Menu,
  Image
} from "semantic-ui-react";

const MenuHeader = () => {
  return (
    <div>
      <Menu borderless>
        <Container text>
          <Menu.Item>
            <Image size='mini' src='/logo192.png' />
          </Menu.Item>
          <Menu.Item header position='left'>Aurora Visualizer</Menu.Item>
          <Menu.Item as='a'>Home</Menu.Item>
          <Menu.Item as='a'>Account</Menu.Item>
          <Menu.Item as='a'>API Test</Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default MenuHeader;