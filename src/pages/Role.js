import React, { memo, useState,useRef } from 'react';
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
import { useCallback } from 'react';


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
  const [selectedRowKeys,setSelectedRowKeys] = useState([])
  const [pager,setPager] = useState(page)
  const [ editModalVisible, setEditModalVisible ] = useState(false)
  const [editFormData, setEditFormData] = useState({record:{},id:0})

  const loading = useSelector(({role}) => role.loading)
  const pagedList = useSelector(({role}) => role.pagedList)
  const total = useSelector(({role}) => role.total)
  const dispatch = useDispatch()

  const FormRef = useRef()
  const rowSelection = {
    selectedRowKeys,
    onChange: (e)=>setSelectedRowKeys(e)
  }
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
          <span style={{cursor:'pointer',color:'cyan'}} onClick={() => editRole(record)}>
            编辑
          </span>
          <Divider type="vertical" />
          <Popconfirm title="确定删除?" onConfirm={() => deletRole(record.id)}>
            <span style={{cursor:'pointer',color:'red'}} >删除</span>
          </Popconfirm>
        </div>
      }
    }
  ]

  const editRole = (record) =>{
    setEditFormData({record,id:1})
    setEditModalVisible(true)
  }
  const addRole = () => {
    setEditFormData({record:{},id:0})
    setEditModalVisible(true)
  }
  
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
  const deletRole = async (id) => {
    try {
      await delRole({ id });
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '删除成功',
      });
      dispatch(getRoleData({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
    } catch (e) {

    }
  }
  const onCancel = useCallback(() => {
    setEditModalVisible(false)
  },[])
//searchUi, setPager,pager,seatchFilter,handleDels,
//loading,pagedList,total,columns, 
//getPageList, addPermission,addClick,deletPermission
  const batchDel = async () => {
  try {
    await delRoles({
      ids: JSON.stringify(selectedRowKeys)
    })
    setSelectedRowKeys([])
    notification.success({
      placement: 'bottomLeft bottomRight',
      message: '删除成功',
    });
    setPager(c=>({...c,current:1}))
    dispatch(getRoleData({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
  } catch (e) {

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
      addClick = {addRole}
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
