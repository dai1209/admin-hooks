import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Admin extends Component{

  render(){

    const user = JSON.parse(localStorage.getItem('user_key')||'{}')
    if(!user.id){
      return <Redirect to='/login'/>
    }
    return (<div>Admin</div>)
  }
}