import {lazy} from 'react'






const routeConfig =[
  {
    path:'/login',
    auth:1,
    component:lazy(()=>import('pages/login'))
  },
  {
    path:'/',
    name:'主页',
    auth:1,
    component:lazy(()=>import('layout/BlankLayout')),
    // redirect:'/home',
    routes:[{
      path: '/',
      name: '首页',
      auth:1,
      component:lazy(()=>import('layout')),
      routes:[
        // 子路由
        {
          path:'/home',
          name:'欢迎页',
          exact: true,
          auth:1,
          component: lazy(()=>import('pages/home/home'))
        },
        {
          path:'/product',
          name: '商品',
          auth:1,
          routes:[
            {
              path:'/product/details',
              name:'商品管理',
              auth:1,
              component:lazy(()=>import('pages/product/details'))
            },
            {
              path:'/product/:id',
              name:'商品详情',
              auth:1,
              component:lazy(()=>import('pages/product/product')),
            },
            {
              path:'/product/',
              name:'分类管理',
              auth:1,
              component:lazy(()=>import('pages/product/product')),
            }
          ]
        },
        {
          path:'/role',
          name: '角色管理',
          exact: true,
          auth:4,
          component: lazy(()=>import('pages/role'))
        },
        {
          path: '/user',
          name: '用户管理',
          exact: true,
          auth:1,
          component: lazy(()=>import('pages/user'))
        }
      ]
    }]
  },
  {
    name: '404',
    auth:0,
    redirect: '/notFound',
    component: lazy(()=>import('pages/notFound'))
  }
  
]
export default routeConfig