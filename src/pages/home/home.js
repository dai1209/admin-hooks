import React,{Component} from 'react'
import {Link} from 'react-router-dom'
export default class Home extends Component {
  render(){
    return <div>
      <h1>welcome</h1>
      <Link to='/login'>登录页</Link>
      
    </div>
  }
}