import React, { memo, useRef } from 'react';
import { useSelector } from 'react-redux'
import { Popconfirm, Divider, Modal } from 'antd';
import {
    delRole,
    delRoles,
    saveRole
} from 'api';
import { getRoleData } from 'store/module/role/action'
import schema from 'schema/role';
import CommonPage from 'containers/CommonPage'
import CommonForm from 'containers/CommonForm'
import { usePage } from 'hooks'

const searchUi = Object.entries(schema.searchUiSchema)
const editUi = Object.entries(schema.editUiSchema)
const seatchFilter = {
  name:'',
  code:''
}
const addPermission = ["role_edit"]
const deletPermission =["role_del"]
const page = {
  current: 1,
  pageSize: 10,
  total: 0
}
export default memo(() => {

  const loading = useSelector(({role}) => role.loading)
  const pagedList = useSelector(({role}) => role.pagedList)
  const total = useSelector(({role}) => role.total)

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
  } = usePage({page,delApi:delRole,getAction:getRoleData,delApis:delRoles,saveApi:saveRole,seatchFilter,total})

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
          <span style={{cursor:'pointer',color:'cyan'}} onClick={() => handleEdit(record)}>
            编辑
          </span>
          <Divider type="vertical" />
          <Popconfirm title="确定删除?" onConfirm={() => handleDel(record.id)}>
            <span style={{cursor:'pointer',color:'red'}} >删除</span>
          </Popconfirm>
        </div>
      }
    }
  ]

  const onFinish = async (values) => {
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
    title={editFormData.id? '编辑角色' : '新增角色'}
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
