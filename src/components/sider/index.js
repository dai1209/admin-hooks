import React, { memo } from 'react';
import { Layout } from 'antd';
import SiderMenu from './siderMenu';
import 'style/menu.css';
import logo from 'logo.svg';

const { Sider } = Layout;

const MySider = props => {


 return (
  
  
  <Sider
    breakpoint="lg"
    collapsedWidth={props.responsive ? 0 : undefined}
    trigger={null}
    collapsible
    collapsed={props.collapsed}
    style={{ background: '#fff' }}
  >
    <div className="logo" style={{ paddingLeft: props.collapsed ? '14px' : '6px' }}><img src={logo} alt="" /><h3>React</h3></div>
    <SiderMenu
      menus={props.menus}
      mode="inline"
      onOpenChange={props.openMenu}
      selectedKeys={[props.selectedKey]}
      openKeys={props.openKeys}
    />
  </Sider>
)
 }

export default memo(MySider);