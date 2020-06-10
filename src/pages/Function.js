import React, { memo, useState, useMemo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popconfirm, Divider, notification, Modal } from 'antd';
import {
    delFunction,
    delFunctions,
    saveFunction
} from 'api';
import { getFunctionData } from 'store/module/function/action'
import schema from 'schema/function';
import * as util from 'utils/util';
import CommonPage from 'containers/CommonPage'
import CommonForm from 'containers/CommonForm'

const searchUi = Object.entries(schema.searchUiSchema)
const editUi = Object.entries(schema.editUiSchema)
const seatchFilter = {
  module: '',
  name: '',
  code: ''
}
const page = {
  current: 1,
  pageSize: 10,
  total: 0
}
const addPermission = ["function_edit"]
const deletPermission =["function_del"]

export default memo(() => {
  const [selectedRowKeys,setSelectedRowKeys] = useState([])
  const [pager,setPager] = useState(page)
  const [ editModalVisible, setEditModalVisible ] = useState(false)
  const [editFormData, setEditFormData] = useState({record:{},id:0})

  const loading = useSelector(({functional}) => functional.loading)
  const pagedList = useSelector(({functional}) => functional.pagedList)
  const total = useSelector(({functional}) => functional.total)
  const menuList = useSelector(({menu}) => menu.menuList)
  const dispatch = useDispatch()

  const FormRef = useRef()
  const rowSelection = {
    selectedRowKeys,
    onChange: (e)=>setSelectedRowKeys(e)
  }
  const editFunction = useCallback((record) =>{
    setEditFormData({record,id:1})
    setEditModalVisible(true)
  },[])
  const addFunction = useCallback(() => {
    setEditFormData({record:{},id:0})
    setEditModalVisible(true)
  },[])

  const onFinish = async (values) => {
    const {code,description,name,moduleId} = values
    const id = moduleId[moduleId.length-1]
    const { title } = util.findTreeNode(menuList,'id', id)
    const options = {
      code,
      moduleId: id,
      description,
      name,
      module: title,
      id: editFormData.record.id
    }
    try {
      await saveFunction(options)
      setEditModalVisible(false)
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '保存成功',
      });
      dispatch(getFunctionData({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
    }catch (e){
    }
  }
  const deletFunction = useCallback(async (id) => {
    try {
      await delFunction({ id });
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '删除成功',
      });
      dispatch(getFunctionData({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
    } catch (e) {
    }
  },[dispatch,pager])
  const onCancel = () => {
    setEditModalVisible(false)
  }
  const columns = useMemo(()=>([
    {
      title: '模块名称',
      dataIndex: 'module',
      sorter: true
    },
    {
      title: '功能名称',
      dataIndex: 'name',
      sorter: true
    },
    {
      title: '功能编码',
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
          <span style={{cursor:'pointer',color:'cyan'}} onClick={() => editFunction(record)}>
            编辑
          </span>
          <Divider type="vertical" />
          <Popconfirm title="确定删除?" onConfirm={() => deletFunction(record.id)}>
            <span style={{cursor:'pointer',color:'red'}} >删除</span>
          </Popconfirm>
        </div>
      }
    }
  ]),[editFunction,deletFunction])

  const batchDel = async () => {
    try {
      await delFunctions({
        ids: JSON.stringify(selectedRowKeys)
      })
      setSelectedRowKeys([])
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '删除成功',
      });
      setPager(c=>({...c,current:1}))
      dispatch(getFunctionData({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
    } catch (e) {

    }
  }

  return  <>
          <CommonPage 
            rowSelection = {rowSelection}
            selectedRowKeys = {selectedRowKeys}
            batchDel = {batchDel}
            pager = {pager}
            setPager = {setPager}
            seatchFilter = {seatchFilter}
            searchUi = {searchUi}
            getPageList = {getFunctionData}
            loading = {loading}
            pagedList = {pagedList}
            total = {total}
            columns = {columns}
            addClick = {addFunction}
            handleDels = {delFunctions}
            addPermission = {addPermission}
            deletPermission = {deletPermission}
          />
          <Modal
            visible={editModalVisible}
            cancelText="关闭"
            okText="提交"
            title={editFormData.id? '编辑功能' : '新增功能'}
            onCancel={onCancel}
            onOk={()=>{FormRef.current.submit()}}
            destroyOnClose
          >
            <CommonForm
              ref={FormRef}
              record={editFormData.record}
              onFinish = {onFinish}
              data={editUi}
            />
          </Modal>
          </>
})
