import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Tag ,Modal} from 'antd';
import {
    savePermission
} from 'api';
import schema from 'schema/role';
import 'style/role-permission.css';
import EditRolePermissionModal from './editRolePermission'

import { getRoleData } from 'store/module/role/action'
import CommonPage from 'containers/CommonPage'
import { useCallback } from 'react';


const searchUi = Object.entries(schema.searchUiSchema)
const seatchFilter = {
  name:'',
  code:''
}

const page = {
  current: 1,
  pageSize: 10,
  total: 0
}
export default memo(() => {
  const [pager,setPager] = useState(page)
  const [ editModalVisible, setEditModalVisible ] = useState(false)
  const [editFormData, setEditFormData] = useState({record:{}})
  const [checkedKeys,setCheckedKeys] = useState([])

  const loading = useSelector(({role}) => role.loading)
  const pagedList = useSelector(({role}) => role.pagedList)
  const total = useSelector(({role}) => role.total)
  const dispatch = useDispatch()

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      sorter: true
  },
  {
      title: '角色编码',
      dataIndex: 'code',
      sorter: true
  },
  {
      title: '操作',
      dataIndex: 'id',
      fixed: 'right',
      width: 120,
      render: (text, record) => {
        return <div>
          <span style={{cursor:'pointer',color:'cyan'}} onClick={() => editRolePermission(record)}>
            编辑角色权限
          </span>
        </div>
      }
    }
  ]
  const editRolePermission = (record) =>{
    setEditFormData(record)
    setEditModalVisible(true)
  }

  const onCancel = useCallback(() => {
    setEditModalVisible(false)
    setCheckedKeys([])
  },[])

const onOk = async () => {
  const data = {
    roleId: editFormData.id,
    permissions: checkedKeys,
    moduleId: 0
  };
  await savePermission(data)
  setEditModalVisible(false)
  setCheckedKeys([])
  dispatch(getRoleData({pageIndex:pager.current,pageSize:pager.pageSize,filter:seatchFilter}))
}
  return  (<>
    <CommonPage
      pager = {pager} 
      setPager = {setPager}
      seatchFilter = {seatchFilter}
      searchUi = {searchUi}
      getPageList = {getRoleData}
      loading = {loading}
      pagedList = {pagedList}
      total = {total}
      columns = {columns}
    />
    <Modal 
    width={800}
    visible={editModalVisible}
    cancelText="关闭"
    okText="提交"
    title={<span>编辑角色&nbsp;&nbsp;<Tag color="#2db7f5">{editFormData.name}</Tag>&nbsp;权限</span>}
    onCancel={onCancel}
    onOk={onOk}
    destroyOnClose
  >
  <EditRolePermissionModal 
  record = {editFormData}
  checkedKeys = {checkedKeys}
  setCheckedKeys = {setCheckedKeys}
  />
  </Modal>
  </>)
})
