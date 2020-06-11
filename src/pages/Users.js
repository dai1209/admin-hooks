import React, { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Popconfirm, Divider, notification, Modal } from 'antd';
import {
    delUser,
    delUsers,
    saveUser
} from 'api';
import { getRoleData } from 'store/module/role/action'
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
  } = usePage({page,dispatch,delApi:delUser,getAction:getRoleData,delApis:delUsers,seatchFilter})
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
  
  const onFinish = async (values) => {
    const options = {...editFormData,...values}
    try {
      await saveUser(options)
      setEditModalVisible(false)
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '保存成功',
      });
      dispatch(getUserList({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
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
      getPageList = {getUserList}
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
