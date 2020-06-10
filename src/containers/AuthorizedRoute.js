import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import menuMapToRouter from 'router/menuMapToRouter';
import Page403 from 'pages/Page403';

function AuthorizedRoute ({component,...props}) {
  const openAccessMenu = useSelector(({app}) => app.openAccessMenu)
  const pathname = props.location.pathname
  const name = Object.keys(menuMapToRouter).find(key => menuMapToRouter[key] === pathname)
  const hasPermission = openAccessMenu.some(m => m.name === name)

  return (
    <Route {...props} component={ hasPermission ? component : Page403 } />
  )
}

export default AuthorizedRoute
