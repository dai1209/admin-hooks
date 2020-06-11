import React, { memo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { Modal, Tag, Button } from 'antd';
import { getRoleData } from 'store/module/role/action'
import schema from 'schema/roleUser';
import CommonPage from 'containers/CommonPage'
import EditRoleUser from './editRoleUser'

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
  const [editFormData, setEditFormData] = useState({})

  const loading = useSelector(({role}) => role.loading)
  const pagedList = useSelector(({role}) => role.pagedList)
  const total = useSelector(({role}) => role.total)

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
        render: (text, record) => <span style={{cursor:'pointer',color:'cyan'}} onClick={() => editRoleUser(record)}>
          用户列表
        </span>
    }]

  const editRoleUser = (record) =>{
    setEditFormData(record)
    setEditModalVisible(true)
  }
  
  const onCancel = useCallback(() => {
    setEditModalVisible(false)
  },[])

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
    visible={editModalVisible}
    width={1000}
    cancelText="关闭"
    title={<span>编辑角色&nbsp;&nbsp;<Tag color="#2db7f5">{editFormData.name}</Tag>&nbsp;下用户</span>}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>关闭</Button>,
    ]}
    destroyOnClose
    >
      <EditRoleUser record={editFormData} />
   </Modal>
  </>)
})
