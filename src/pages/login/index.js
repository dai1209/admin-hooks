import React, { useState, useEffect, memo } from 'react';
import { Row, Col, Form, Input, Button, Card } from 'antd';
import { AntDesignOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import 'style/login.css';
import { loginByUsername } from 'api';
import logo from 'logo.svg';
import { setToken, getToken } from 'utils/token'

const FormItem = Form.Item;
const { Meta } = Card;

export default memo(({history}) => {
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const token = getToken();
    token && history.push('/');
  })

  const handleSubmit = async values => {
    try{
      setLoading(true)
      const { data } = await loginByUsername(values);
      setToken(data.accessToken)
      history.push('/')
    }catch (e) {

    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="login-container">
      <canvas id="noise-canvas"></canvas>
      <Row type="flex" justify="center" align="middle">
        <Col xl={{span:7}}>
          <Card
            hoverable
            bordered={false}
            cover={
              <div style={{padding:10}}><img alt="logo" src={logo} />
                <LoginForm loading = {loading} handleSubmit = {handleSubmit} />
              </div>
            }
          >
          <Meta
              avatar={<AntDesignOutlined style={{ color: '#1890ff', fontSize: 28 }} />}
              title="React"
              description="后台管理系统模板"
          />
          </Card>
        </Col>
      </Row>
    </div>
  )
})


const LoginForm = (props)=>{
  return (
    <Form onFinish={props.handleSubmit} className="login-form">
      <FormItem
        hasFeedback
        rules = {[{ required: true, message: '请输入登录账号!' }]}
        initialValue = 'admin'
        name = 'username'
      >
        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
      </FormItem>
      <FormItem
        hasFeedback
        initialValue = '123'
        rules = {[{ required: true, message: '请输入密码!' }]}
        name = 'password'
      >
        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
      </FormItem>
      <FormItem>
        <Button type="primary" loading={props.loading} htmlType="submit" className="login-form-button">
          登录
        </Button>
      </FormItem>
    </Form>
  )
}



