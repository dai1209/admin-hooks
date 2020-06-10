import React, { memo, useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import menuMapToRouter from 'router/menuMapToRouter';


const { TabPane } = Tabs;
const Home = {
  name: 'home',
  title: "首页",
  path: "/app/home",
  closable: false,
  // content: menuMapToComponent["home"]
}
const initailState = {
  currentPage: '',
  openPages: [Home]
}
const pagesReducer = (state, {type, payload}) => {
  let openPages = []
  let currentPage = ''
  switch (type){
    case 'push':
      const isHas = state.openPages.some(s => s.name === payload.name)
      if (isHas) return {...state,...{currentPage:payload.name}}
      openPages = [...state.openPages,payload]
      return { currentPage:payload.name, openPages }
    case 'remove':
      const isCurrent = state.currentPage === payload
      const index = state.openPages.findIndex(item => item.name === payload)
      openPages = state.openPages.filter(item => item.name !== payload)
      currentPage = isCurrent ? openPages[Math.min(index,openPages.length-1)].name : state.currentPage
      return {currentPage,openPages}
    default:
      return state
  }
}

const MyNavTabs = memo((props) => {
  console.log('navtabs');
  
  const [ {currentPage,openPages}, Dispatch ] = useReducer(pagesReducer,initailState)
  const { pathname } = useLocation()
  const history = useHistory()
  const openAccessMenu = useSelector(({app}) => app.openAccessMenu)

  useEffect(() => { 
    if (pathname === '/app/home') {
      Dispatch({
        type:'push',
        payload: Home
      })
      return
    }
    const name = Object.keys(menuMapToRouter).find(key => menuMapToRouter[key] === pathname)
    if (name) {
      const menu = openAccessMenu.find(m => m.name === name)
      if (menu) {
        Dispatch({type:'push',payload:{
          name: menu.name,
          title: menu.title,
          path: menuMapToRouter[name],
          closable: true,
        }})
      }else {
        Dispatch({
          type:'push',
          payload: {
            name: 'page403',
            title: '没有权限',
            path: pathname,
            closable: true
          }
        })
      }
    } else {
      Dispatch({
        type: 'push',
        payload: {
          name: 'page404',
          title: '页面不存在',
          path: pathname,
          closable: true
        }
      })
    }
  },[pathname,openAccessMenu])
 

  const onEdit = (targetKey,fn) => {
    Dispatch({type:fn,payload:targetKey})
    if (targetKey === currentPage){
      const index = openPages.findIndex(item => item.name === targetKey)
      const current = index === openPages.length - 1 ? index - 1 : index + 1 
      const path = openPages[current].path
      history.push(path)
    }
  }

  const onChange = (activeKey) => {
    history.push(menuMapToRouter[activeKey])
  }
  return (
    <div style={props.style}>
      <Tabs
        hideAdd
        activeKey={currentPage}
        tabBarStyle={{ background: 'white', width: '100%', padding: 10, margin: 0, position: 'fixed', zIndex: 99, border: 'none' }}
        type="editable-card"
        onEdit={onEdit}
        onChange={onChange}
      >
        {openPages.map(page => <TabPane forceRender tab={page.title} closable={page.closable} key={page.name} />)}
      </Tabs>
    </div>
  );
})
export default MyNavTabs