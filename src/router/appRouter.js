import React,{ lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorizedRoute from 'containers/AuthorizedRoute'
import suspenseComponent from 'utils/suspenseComponent'


const routerConfig = [
  {
    path:'/app/system/menu',
    component: lazy(()=>import('pages/Menu'))
  },
  {
    path:'/app/permission/function',
    component: lazy(()=>import('pages/Function'))
  },
  {
    path:'/app/permission/role',
    component: lazy(()=>import('pages/Role'))
  },
  {
    path:'/app/permission/rolepermission',
    component: lazy(()=>import('pages/rolePermission'))
  },
  {
    path:'/app/permission/roleuser',
    component: lazy(()=>import('pages/roleUser'))
  },
  {
    path:'/app/permission/userrole',
    component: lazy(()=>import('pages/userRole'))
  },
  {
    path:'/app/user/index',
    component: lazy(()=>import('pages/Users'))
  },
  {
    path:'/app/requestlog',
    component: lazy(()=>import('pages/RequestLog'))
  },
  {
    path:'/app/example/403',
    component: lazy(()=>import('pages/Page403'))
  },
  {
    path:'/app/example/404',
    component: lazy(()=>import('pages/Page404'))
  },
  {
    path:'/app/example/permissiontest',
    component: lazy(()=>import('pages/example/PermissionTest'))
  },
  // {
  //   path:'/app/example/searchform',
  //   component: lazy(()=>import('pages/example/JsonForm/SearchForm'))
  // },
  // {
  //   path:'/app/example/commonform',
  //   component: lazy(()=>import('pages/example/JsonForm/CommonForm'))
  // },
  // {
  //   path:'/app/example/dynamicform',
  //   component: lazy(()=>import('pages/example/JsonForm/DynamicForm'))
  // },
]

export default ()=>(
  <Switch>
    <Route exact path="/app/home" component={suspenseComponent(lazy(()=>import('pages/Home')))} />
    {
      routerConfig.map((item)=>
        <AuthorizedRoute key={item.path} exact path={item.path} component={suspenseComponent(item.component)} />
      )
    }
    <Route component={suspenseComponent(lazy(()=>import('pages/Page404')))} />
  </Switch>
)
