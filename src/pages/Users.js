import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Popconfirm, Divider, Modal } from 'antd';
import {
    delUser,
    delUsers,
    saveUser
} from 'api';
import schema from 'schema/user';
import CommonPage from 'containers/CommonPage'
import CommonForm from 'containers/CommonForm'
import { getUserList } from 'store/module/users/action';
import { usePage } from 'hooks'

const searchUi = Object.entries(schema.searchUiSchema)
const editUi = Object.entries(schema.editUiSchema)
const seatchFilter = {
  name:'',
  email:''
}
const addPermission = ["user_edit"]
const deletPermission =["user_del"]
const page = {
  current: 1,
  pageSize: 10,
  total: 0
}
export default memo(() => {

  const loading = useSelector(({users}) => users.loading)
  const pagedList = useSelector(({users}) => users.pagedList)
  const total = useSelector(({users}) => users.total)

  const FormRef = useRef()

  const {
    selectedRowKeys,
    pagination,
    handleSearch,
    onTableChange,
    editFormData,
    editModalVisible,
    rowSelection,
    handleEdit,
    handleAdd,
    handleDel,
    handleFinish,
    onCancel,
    batchDel,
  } = usePage({page,delApi:delUser,getAction:getUserList,delApis:delUsers,saveApi:saveUser,seatchFilter,total})
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
      render: (text, record) => {
        return <div>
          <span style={{cursor:'pointer',color:'cyan'}} onClick={() => handleEdit(record)}>
            编辑
          </span>
          <Divider type="vertical" />
          <Popconfirm title="确定删除?" onConfirm={() => handleDel(record.id)}>
            <span style={{cursor:'pointer',color:'red'}} >删除</span>
          </Popconfirm>
        </div>
      }
    }]
  
  const onFinish = (values) => {
    const options = {...editFormData,...values}
    handleFinish(options)
  }

  return  (<>
    <CommonPage
      rowSelection = {rowSelection}
      selectedRowKeys = {selectedRowKeys}
      pagination ={pagination}
      onTableChange = {onTableChange}
      handleSearch = {handleSearch}
      batchDel = {batchDel}
      searchUi = {searchUi}
      loading = {loading}
      pagedList = {pagedList}
      columns = {columns}
      handleAdd = {handleAdd}
      addPermission = {addPermission}
      deletPermission = {deletPermission}
    />
    <Modal
    visible={editModalVisible}
    cancelText="关闭"
    okText="提交"
    title={editFormData.id? '编辑用户' : '新增用户'}
    onCancel={onCancel}
    onOk={()=>FormRef.current.submit()}
    destroyOnClose
    >
    <CommonForm
      ref={FormRef}
      record={editFormData.record}
      onFinish = {onFinish}
      data={editUi}
    />
  </Modal>
  </>)
})
