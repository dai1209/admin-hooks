import React, {memo, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Tooltip, Popconfirm, notification } from 'antd';
import {AntDesignOutlined,AreaChartOutlined,SyncOutlined} from '@ant-design/icons'
import logo from 'logo.svg';
import 'style/home.css';
import { resetDb } from 'api';

const { Meta } = Card;

export default memo(() => {

  const ResetDb = useCallback(async () => {
    await resetDb();
    notification.success({
      message: '初始化成功',
      placement: 'bottomRight'
    });
    setTimeout(() => {
      document.location.reload()
    }, 2000);
  },[])
  const logAction = <Tooltip title="访问记录"><Link to={'/app/requestlog'}><AreaChartOutlined /></Link></Tooltip>;
  const resetActions = (
    <Popconfirm placement="right" title="确定初始化?" onConfirm={ResetDb}>
      <Tooltip title="初始化数据">
        <SyncOutlined />
      </Tooltip>
    </Popconfirm>
  )

  return (
    <Row type="flex" justify="center" align="middle" style={{ height: '100%', marginTop: 100 }}>
      <Col>
        <Card
          hoverable
          bordered={false}
          cover={<img alt="logo" src={logo} />}
          actions={[logAction, resetActions]}
        >
          <Meta
            avatar={<AntDesignOutlined style={{ color: '#1890ff', fontSize: 28 }} />}
            title="React"
            description="专注通用权限控制与表单的后台管理系统模板"
          />
        </Card>
      </Col>
</Row>

  )
})
