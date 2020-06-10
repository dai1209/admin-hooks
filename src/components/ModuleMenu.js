import React, { memo } from 'react';
import { Menu } from 'antd';

function ModuleMenu(props) {
  return (
    <Menu
      onClick={props.updateModule}
      selectedKeys={[props.currentModule]}
      mode="horizontal"
      style={props.style}
    >
      { props.moduleList.map(item => <Menu.Item key = {item.name} >{item.title}</Menu.Item>) }
    </Menu>
  )
}

export default memo(ModuleMenu);
