import React, {memo, useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumb } from 'antd';
import * as util from 'utils/util';
import {IconMapToRender} from 'utils/Icons'
import menuMapToRouter from 'router/menuMapToRouter';

export default memo((props) => {
  const [map,setMap] = useState([
    {
      name: "home",
      title: "首页",
      icon: "home",
      path: "/app/home"
    }]
  )
  const { pathname } = useLocation()
  const openAccessMenu = useSelector(({app}) => app.openAccessMenu)
  useEffect(() => {
    const name = Object.keys(menuMapToRouter).find(key => menuMapToRouter[key] === pathname)
    const parents = util
      .getParentMenusByName(openAccessMenu,name)
      .map(item => ({name:item.name,path:item.path,title:item.title}));
    setMap(parents)
  },[pathname,openAccessMenu])

  return (
    <Breadcrumb style={props.style}>
      {map.map(item => (
        <Breadcrumb.Item key={item.name}>
          {item.path ?
            <Link to={item.path}><IconMapToRender icon={item.icon} /><span>{item.title}</span></Link>
            :
            <span>{item.title}</span>}
        </Breadcrumb.Item>
    )
      )}
    </Breadcrumb>
  )

})

