import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {IconMapToRender} from 'utils/Icons'
import menuMapToRouter from 'router/menuMapToRouter';

const { SubMenu } = Menu;
const { Item } = Menu;

const renderMenuItem = ({ name, title, icon }) => {
  const link = menuMapToRouter[name];
  return (
    <Item key={name} >
      {link ? <Link to={link}><IconMapToRender icon={icon} style={{ color: '#08c' }} /><span>{title}</span></Link> : <span>{title}</span>}
    </Item>
  );
}

const renderSubMenu = ({ name, title, icon, children }) => (

  <SubMenu
    key={name}
    title={
      <span>
        <IconMapToRender icon={icon} style={{ color: '#08c' }} />
        <span>{title}</span>
      </span>
    }
  >
    {children && children.map(item => item.children && item.children.filter(s => s.leftMemu).length > 0 ? renderSubMenu(item) : renderMenuItem(item))}
  </SubMenu>
);

export default ({ menus, ...props }) => (
  <Menu {...props}>
    {menus && menus.map(item => item.children && item.children.length ? renderSubMenu(item) : renderMenuItem(item))}
  </Menu>)