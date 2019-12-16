import React, { Component } from 'react'
import { Form,Icon,Input,Button } from 'antd';
import './login.css'


class Login extends Component {
  handleSubmit = e => {
    e.preventDefault(); //阻止默认提交行为
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };



  render() {
    return (
    < div className="login" >
      <div className="login-header" >
        <h1> 后台管理系统 </h1> 
      </div >
      <div className='login-content' >
        <h1> 用户登陆 </h1> 

        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />
        </Form.Item>
        <Form.Item>
          
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
          
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
        </Form.Item>
      </Form>
      </div >
    </div> 
    ) 
  } 
} 

export default Login