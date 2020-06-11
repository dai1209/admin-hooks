import React, { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Popconfirm, Divider, notification, Modal } from 'antd';
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
  const dispatch = useDispatch()

  const FormRef = useRef()
  const {
    selectedRowKeys,
    pager,
    setPager,
    editFormData,
    editModalVisible,
    setEditModalVisible,
    rowSelection,
    handleEdit,
    handleAdd,
    handleDel,
    onCancel,
    batchDel,
  } = usePage({page,dispatch,delApi:delRole,getAction:getRoleData,delApis:delRoles,seatchFilter})

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
    try {
      await saveRole(options)
      setEditModalVisible(false)
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '保存成功',
      });
      dispatch(getRoleData({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
    }catch (e){

    }
  }
 
  return  (<>
    <CommonPage
      rowSelection = {rowSelection}
      selectedRowKeys = {selectedRowKeys}
      batchDel = {batchDel}
      pager = {pager} 
      setPager = {setPager}
      seatchFilter = {seatchFilter}
      searchUi = {searchUi}
      getPageList = {getRoleData}
      loading = {loading}
      pagedList = {pagedList}
      total = {total}
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
