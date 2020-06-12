import React, { useEffect, useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateModule } from 'store/module/app/action';
import MySider from 'components/sider';
import MenuToRouter from 'router/menuMapToRouter';
import * as util from 'utils/util';


const MySiderContainer = (props) => {
  const [ openKeys, setOpenKeys ] = useState([])
  const [ selectedKey, setSelectedKey ] = useState('')

  const menus = useSelector(({app}) => app.moduleMenu)
  
  const openAccessMenu = useSelector(({app}) => app.openAccessMenu)
  
  const accessMenu = useSelector(({app}) => app.accessMenu)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  
  const initMenu = useCallback((pathname) => {
    const name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === pathname);
    if (name) {
      const parentKeys = util.getParentMenusByName(openAccessMenu, name).map(item => item.name)
      if (parentKeys.length) {
        const currentModule = parentKeys[0]
        const moduleList = accessMenu.filter(item => item.leftMemu && item.name === currentModule)
        if (moduleList.length) {
          const moduleMenu = moduleList[0].children
          dispatch(updateModule({
            currentModule,
            moduleMenu
          }))
        } 
        if (!props.collapsed) {
          setOpenKeys(parentKeys)
        }
      }
    } 
    setSelectedKey(name)
  },[openAccessMenu,accessMenu,dispatch,props.collapsed])

  useEffect(() => {
    initMenu(pathname)
  },[pathname,initMenu])

  const openMenu = v => {
    const parentKeys = util.getParentMenusByName(openAccessMenu, v[v.length - 1]).map(item => item.name);
    setOpenKeys(parentKeys)
  };

  return (
    <MySider
      responsive={props.responsive}
      collapsed={props.collapsed}
      menus={menus}
      openMenu={openMenu}
      selectedKey={selectedKey}
      openKeys={openKeys}
    />
  )

}

export default memo(MySiderContainer);
