import React, {memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Layout, Row, Col } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  GithubOutlined, 
  LogoutOutlined, 
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
import 'style/header.css';
import ModuleMenu from 'components/ModuleMenu';
import { updateModule } from 'store/module/app/action';
import { logout } from 'api';
import { removeToken } from 'utils/token';
import FullScreen from 'components/FullScreen';
import SearchInput from 'components/SearchInput';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MyHeader = memo((props) => {
  const name = useSelector(({user}) => user.userInfo.name)
  const avatar = useSelector(({user}) => user.userInfo.avatar)
  const currentModule = useSelector(({app})=> app.currentModule)
  const accesseMenu = useSelector(({app}) => app.accessMenu)
  const moduleList = useSelector(({app}) => app.moduleList)
  const dispatch = useDispatch()

  const history = useHistory()

  const UpdateModule = useCallback(e => {
    const moduleMenu = accesseMenu.find(item => item.leftMemu && item.name === e.key).children
    dispatch(updateModule({
      currentModule : e.key,
      moduleMenu
    }))
  },[accesseMenu,dispatch])

  const menuClick = e => {
    e.key === 'logout' && Logout();
    e.key === 'navTab' && props.toggleNavTab && props.toggleNavTab(c => !c);
  }

  const Logout = async () => {
    await logout()
    removeToken()
    history.push('/login')
  }

  return (
    <Header style={{ background: '#fff', padding: 0, height: 'auto', position: 'fixed', width: '100%', zIndex: 9 }}>
      <Row type="flex" justify="start">
        <Col xs={6} sm={6} md={2} lg={2} xl={1}>
          <ul className="top-nav" style={{ lineHeight: '65px', marginLeft: 10 }}>
            <li>
              <div className="item" onClick={props.toggle}>
                {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </li>
          </ul>
        </Col>
        <Col xs={18} sm={18} md={8} lg={6} xl={5}>
          <ModuleMenu
            style={{ lineHeight: '64px' }}
            moduleList={moduleList}
            updateModule={UpdateModule}
            currentModule={currentModule}
          />
        </Col>
        <Col xs={24} sm={12} md={5} lg={5} xl={9} style={{ textAlign: 'center' }}>
          <SearchInput style={{ display: 'inline-block', padding: '0px 20px', width: '100%' }} />
        </Col>
        <Col xs={8} sm={4} md={2} lg={1} xl={2} style={{ textAlign: 'right' }}>
          <ul className="top-nav" style={{ lineHeight: '65px' }}>
            <li>
              <a className="item" href="https://github.com/dai1209/admin-hooks" target={"_blank"}>
                <GithubOutlined />
              </a>
            </li>
          </ul>
        </Col>
        <Col xs={16} sm={8} md={7} lg={6} xl={7}>
          <Menu
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            onClick={menuClick}
          >
            <Menu.Item key="full">
              <FullScreen />
            </Menu.Item>
            <Menu.Item key="navTab">
              {props.navTabshow ? <ArrowUpOutlined  style={{ fontSize: 16 }} /> : <ArrowDownOutlined  style={{ fontSize: 16 }} />}
            </Menu.Item>
            <SubMenu title={<span className="avatar"><img src={avatar} alt="头像" /><i className="on bottom b-white" /></span>}>
              <MenuItemGroup title="用户中心">
                <Menu.Item key="setting:1">你好 - {name}</Menu.Item>
                <Menu.Item key="setting:2"><UserOutlined />个人信息</Menu.Item>
                <Menu.Item key="logout"><span onClick={Logout}><LogoutOutlined />退出登录</span></Menu.Item>
              </MenuItemGroup>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    </Header>
  )
})
export default MyHeader;
