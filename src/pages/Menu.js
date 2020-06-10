import React, {memo,useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Tree, Form, Input, Button, Switch, InputNumber, message, Tag, TreeSelect} from 'antd';
import {PlusOutlined} from '@ant-design/icons'

import { saveMenu } from 'api';
import Icons, { IconMapToRender } from 'utils/Icons';
import { findTreeNode } from 'utils/util';
import { getMenuList } from 'store/module/menu/action';


const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const SelectTreeNode = TreeSelect.TreeNode;

const IconsTreeSelect = Icons.map(item => (<SelectTreeNode title = {item.title} key = {item.title} >
    {item.icons.map(v => (<SelectTreeNode value= {v.icon} title = {<span><IconMapToRender style={{ color: '#08c' }} icon={v.icon}  />&nbsp;&nbsp;{v.title}</span>} key={v.icon} />))}
  </SelectTreeNode>))


const renderMenu = (menuList) => menuList.map(menu =><TreeNode title={menu.title} key={menu.id}>
    {menu.children && menu.children.length > 0 ? renderMenu(menu.children) : ''}
  </TreeNode>)

const formItemLayout = {
  labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
  },
  wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default memo(() => {
  const [tempMenu,setTempMenu] = useState({id:'',parentId:'0'})
  const [selected,setSelected] = useState(false)
  const [addChild,setAddChild] = useState(false)

  const dispatch = useDispatch()
  const menuList = useSelector(({menu}) => menu.menuList)
  useEffect(() => {
    dispatch(getMenuList())
  },[dispatch])

  const [form] = Form.useForm()
  const onSelect = (selectedKeys, info) => {
    if (selectedKeys.length === 0) {
      form.resetFields();
      setAddChild(false)
      setSelected(false)
      setTempMenu({id:'',parentId:'0'})
      return;
    }
    const menu = findTreeNode(menuList,'id',selectedKeys[0])
    setSelected(true)
    setAddChild(false)
    setTempMenu(menu)
    const {name,title,functionCode,sort,leftMemu,isLock,icon} = menu
    form.setFieldsValue({
        name,
        title,
        functionCode,
        sort,
        leftMemu,
        isLock,
        icon
    });
  }
  const handleSubmit = async (values) => {
    const data = { id: tempMenu.id, parentId: tempMenu.parentId, ...values };
    try {
    await saveMenu(data);
      message.success('提交成功');
      dispatch(getMenuList())
    } catch (e) {
      console.log(e);
    }
    
  }
  const addChildMenu = () => {
    if(!selected) {
      message.error('请选择父级菜单')
      return
    }
    setAddChild(true)
    setSelected(false)
    setTempMenu(s =>({...s,id:'',parentId:s.id}))
    form.resetFields();
  };
  const addTopMenu = () => { 
    setAddChild(false)
    setSelected(false)
    setTempMenu(s=>({...s,id:'',parentId:0}))
    form.resetFields();
  }
  return (
    <Row type="flex" justify="start">
      <Col xs={24} sm={24} md={12} lg={6} xl={6} style={{ backgroundColor: '#fafafa' }}>
        <div style={{ padding: 10 }}>
          <Button icon={<PlusOutlined />} type="primary" size='small' onClick={addTopMenu}>添加顶级菜单</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Button disabled={false} icon={<PlusOutlined />} size='small' onClick={addChildMenu}>添加子菜单</Button>
        </div>
        <Tree
          onSelect={onSelect}
        >
          {renderMenu(menuList)}
        </Tree>
      </Col>
      <Col xs={24} sm={24} md={12} lg={9} xl={9}>
        <Form form={form} onFinish={handleSubmit}>
          <div style={{ padding: 10, paddingLeft: 50, display: selected ? 'block' : 'none' }}>
              正在编辑菜单：<Tag color="#108ee9">{tempMenu.title}</Tag >
          </div>
          <div style={{ padding: 10, paddingLeft: 50, display: addChild ? 'block' : 'none' }}>
              添加&nbsp;&nbsp;<Tag color="#108ee9">{tempMenu.title}</Tag >子菜单
          </div>
          <FormItem
              {...formItemLayout}
              hasFeedback
              label="名称"
              name='name'
              rules={[{required: true, message: '名称不能为空!' }]}
          >
            <Input />

          </FormItem>
          <FormItem
              {...formItemLayout}
              hasFeedback
              label="标题"
              rules= {[{required: true, message: '标题不能为空!' }]}
              name='title'
          >
            <Input />
          </FormItem>
          <FormItem
              {...formItemLayout}
              hasFeedback
              label="权限码"
              name='functionCode'
          >
                  <Input />
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="排序"
              name='sort'
              initialValue = {0}
          >
            <InputNumber min={0} />
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="是否左侧显示"
              name='leftMenu'
              valuePropName='checked'
          >
                  <Switch />
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="是否锁定"
              name='isLock'
              valuePropName='checked'
          >
                  <Switch />
          </FormItem>
          <FormItem
              {...formItemLayout}
              hasFeedback
              label="图标"
              name = 'icon'
              initialValue =''
          >
            <TreeSelect
              showSearch
              style={{ width: 300 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
            >
              {IconsTreeSelect}
            </TreeSelect>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  )
})
