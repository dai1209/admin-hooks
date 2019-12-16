import React, { Component } from 'react'
import { Form,Icon,Input,Button,message } from 'antd';
import './login.css'
import {reqLogin} from 'api'
import {Redirect} from 'react-router-dom'


class Login extends Component {
  handleSubmit = e => {
    e.preventDefault(); //阻止默认提交行为
    const form = this.props.form
    // const username = form.getFieldValue("username")
    // const password = form.getFieldValue('password')



    form.validateFields(async(err, {username,password}) => {
      if (!err) {
        const result = await reqLogin(username,password)
        if (result.status===0){

          const user = result.data
          localStorage.setItem('user_key',JSON.stringify(user))
          this.props.history.replace('/')
          message.success('登录成功')
        }else{
          message.error(result.msg)
        }
      }
    });
  };

  validatePwd=(rule,value,callback)=>{
    value=value.trim()
    if(!value){
      callback('请输入密码')
    }else if(value.length<4) {
      callback('密码不能小于4位')
    }else if(value.length>12){
      callback('密码不能大于12位')
    }else if(!/^[0-9a-zA-Z_]+$/.test(value)){
      callback('密码必须是数字字母下划线')
    }else{
      callback()
    }
  }

  render() {

    const {getFieldDecorator} = this.props.form

    const user = JSON.parse(localStorage.getItem('user_key')||'{}')
    if(user.id){
      return <Redirect to='/'/>
    }

    return (  
    < div className="login" >
      <div className="login-header" >
        <h1> 后台管理系统 </h1> 
      </div >
      <div className='login-content' >
        <h1> 用户登陆 </h1> 

        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {
            getFieldDecorator('username',{
              initialValue:'',
              rules: [ //声明式验证规则
                    { required: true,whitespace:true, message: '请输入用户名'},
                    { min:3,message:"名字不能少于3位"},
                    { max:8,message:'不能多于8位'}
                  ]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />
            )
          }
            
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password',{
            initialValue:'',
            rules: [
              { validator:this.validatePwd}
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />
          )
        }
          
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

const WrappedLogin = Form.create()(Login)

export default WrappedLogin