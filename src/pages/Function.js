import React, { memo, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Popconfirm, Divider, Modal } from 'antd';
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
import { usePage } from 'hooks'

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
  const loading = useSelector(({functional}) => functional.loading)
  const pagedList = useSelector(({functional}) => functional.pagedList)
  const total = useSelector(({functional}) => functional.total)
  const menuList = useSelector(({menu}) => menu.menuList)

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
  } = usePage({page,delApi:delFunction,getAction:getFunctionData,delApis:delFunctions,saveApi:saveFunction,seatchFilter,total})
  const onFinish = (values) => {
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
    handleFinish(options)
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
  ]),[handleEdit,handleDel])

  return  <>
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
