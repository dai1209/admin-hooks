import React,{Component} from 'react'


import {Route,HashRouter,Switch,Redirect} from 'react-router-dom'

import home from 'pages/home/home'
import asyncComponent from 'utils/asyncComponent'


const login = asyncComponent(()=>import('pages/login/login'))

export default class RouteConfig extends Component{
  render(){
    return (
      <HashRouter>
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/login" component={login} />
        <Redirect to="/login"/>
      </Switch>
      </HashRouter>
    )
  }
}