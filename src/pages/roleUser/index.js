import React, { memo } from 'react';
import { useSelector } from 'react-redux'
import { Modal, Tag, Button } from 'antd';
import { getRoleData } from 'store/module/role/action'
import schema from 'schema/roleUser';
import CommonPage from 'containers/CommonPage'
import EditRoleUser from './editRoleUser'
import { usePage } from 'hooks' 
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

  const loading = useSelector(({role}) => role.loading)
  const pagedList = useSelector(({role}) => role.pagedList)
  const total = useSelector(({role}) => role.total)
  const {
    handleSearch,
    onTableChange,
    pagination,
    editFormData,
    editModalVisible,
    handleEdit,
    onCancel,
  } = usePage({page,getAction:getRoleData,seatchFilter,total})

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
        render: (text, record) => <span style={{cursor:'pointer',color:'cyan'}} onClick={() => handleEdit(record)}>
          用户列表
        </span>
    }]


  return  (<>
    <CommonPage
      handleSearch = {handleSearch}
      onTableChange = {onTableChange}
      pagination = {pagination}
      searchUi = {searchUi}
      loading = {loading}
      pagedList = {pagedList}
      columns = {columns}
    />
    <Modal
    visible={editModalVisible}
    width={1000}
    cancelText="关闭"
    title={<span>编辑角色&nbsp;&nbsp;<Tag color="#2db7f5">{editFormData.record.name}</Tag>&nbsp;下用户</span>}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>关闭</Button>,
    ]}
    destroyOnClose
    >
      <EditRoleUser record={editFormData.record} />
   </Modal>
  </>)
})
