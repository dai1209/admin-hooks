import React, { useState } from 'react'
import { Row, Col, Button, Form} from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import FormList from 'components/BaseForm'


export default (props) => {
  const [form] = Form.useForm()
  const [expand,setExpand] = useState(true)
  const handleReset = ()=>{
      form.resetFields();
  }
  return (
    <div>
      <div style={{padding: 10}}>
      <Form layout ='inline' form={form} onFinish={props.onFinish}>
      <Row gutter={24}>
        <div style = {{ display: expand ? 'flex' : 'none' }}>
        <FormList data = {props.data}  />
        </div>
      </Row>
      </Form>
      </div>
      <Row justify='center'>
        <Col span={24} style={{ textAlign: 'center' }}>
          <span style={{ display: expand ? 'inline' : 'none' }}>
            <Button type="primary" htmlType="submit" onClick={()=>form.submit()} >查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              清空
            </Button>
          </span>
          <span  style={{ marginLeft: 8, fontSize: 12, color:'cyan',cursor:'pointer' }} onClick={()=>setExpand(c=>!c)} >
            {expand ? '收起查询' : '展开查询'} {expand ? <UpOutlined /> : <DownOutlined />}
          </span>
        </Col>
      
      </Row>
      
    </div>
  );
}