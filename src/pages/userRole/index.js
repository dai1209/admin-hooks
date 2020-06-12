import React, { memo } from 'react';
import { useSelector } from 'react-redux'
import { Modal, Tag, Button } from 'antd';
import { getUserList } from 'store/module/users/action'
import schema from 'schema/userRole';
import CommonPage from 'containers/CommonPage'
import EditUserRole from './editUserRole'
import { usePage } from 'hooks'

const searchUi = Object.entries(schema.searchUiSchema)
const seatchFilter = {
  name:'',
  email:''
}

const page = {
  current: 1,
  pageSize: 10,
  total: 0
}

export default memo(() => {

  const loading = useSelector(({users}) => users.loading)
  const pagedList = useSelector(({users}) => users.pagedList)
  const total = useSelector(({users}) => users.total)
  const {
    handleSearch,
    onTableChange,
    editFormData,
    editModalVisible,
    handleEdit,
    onCancel
  } = usePage({page,getAction:getUserList,seatchFilter,total})
  const columns = [
    {
        title: '账号名称',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: '用户名称',
        dataIndex: 'trueName',
        sorter: true
    },
    {
        title: '用户邮箱',
        dataIndex: 'email',
        sorter: true
    },
    {
        title: 'phone',
        dataIndex: 'phone',
        sorter: true
    },
    {
        title: '操作',
        dataIndex: 'id',
        fixed: 'right',
        width: 120,
        render: (text, record) => <span style={{cursor:'pointer',color:'cyan'}} onClick={() => handleEdit(record)}>
            角色列表
          </span>
    }]

  return  (<>
    <CommonPage
      seatchFilter = {seatchFilter}
      handleSearch = {handleSearch}
      onTableChange = {onTableChange}
      searchUi = {searchUi}
      loading = {loading}
      pagedList = {pagedList}
      columns = {columns}
    />
    <Modal
    visible={editModalVisible}
    width={1000}
    cancelText="关闭"
    title={<span>编辑用户&nbsp;&nbsp;<Tag color="#2db7f5">{editFormData.record.name}</Tag>&nbsp;所属角色</span>}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>关闭</Button>,
    ]}
    destroyOnClose
    >
      <EditUserRole record={editFormData.record} />
   </Modal>
  </>)
})
