import React, { memo, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';
import MyHeader from 'containers/MyHeader';
import MySider from 'containers/MySider';
import MyNavTabs from 'containers/MyNavTabs';
import { getToken } from 'utils/token';
import { getUserPermission } from 'store/module/user/action'
import './TabLayout.css';

const { Content } = Layout;

function TabLayout({history,location}) {

  const [ collapsed, setCollapsed ] = useState(false);
  const [ responsive, setResponsive ] = useState(false);
  const [ navTabShow, setNavTabShow ] = useState(true);
  const [ navTabTop, setNavTabTop ] = useState(65);

  const getClientWidth = useCallback(() => {
    const clientWidth = document.body.clientWidth;
    setCollapsed(clientWidth <= 992)
    setResponsive(clientWidth <= 992)
    if (clientWidth < 576) setNavTabTop(193)
    if (clientWidth < 768) setNavTabTop(129)
    if (clientWidth >= 768) setNavTabTop(65)
  },[])
  const toggle = () => {
    setCollapsed(c => !c)
  }
  const dispatch = useDispatch()

  useEffect(() => {
    const token = getToken()
    token || history.push('/login');
  },[history])

  useEffect(() => {
    dispatch(getUserPermission())
  },[dispatch])

  useEffect(() => {
    window.onresize = getClientWidth
    return () => {
      window.onresize = null
    }
  })

  return (
    <Layout>
      <MySider
        responsive={responsive}
        collapsed={collapsed}
      />
      <Layout>
        <MyHeader 
          collapsed={collapsed} 
          toggle={toggle} 
          toggleNavTab={setNavTabShow} 
          navTabshow={navTabShow} 
        />
        <Content style={{ padding: 24, paddingTop: 0, background: '#fff' }}>
          <MyNavTabs 
            style={{ marginTop: navTabTop, width: '100%', display: navTabShow ? 'block' : 'none' }} 
          />
        </Content>
      </Layout>
    </Layout>
  )
}

export default memo(TabLayout)
