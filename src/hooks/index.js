import { useState,useCallback } from 'react'

import {notification} from 'antd'


export function usePage({page,dispatch,delApi,getAction,delApis,seatchFilter}) {

  const [selectedRowKeys,setSelectedRowKeys] = useState([])
  const [pager,setPager] = useState(page)
  const [ editModalVisible, setEditModalVisible ] = useState(false)
  const [editFormData, setEditFormData] = useState({record:{},id:0})
  
  const rowSelection = {
    selectedRowKeys,
    onChange: (e)=>setSelectedRowKeys(e)
  }
  const handleEdit = useCallback((record) =>{
    setEditFormData({record,id:1})
    setEditModalVisible(true)
  },[])
  const handleAdd = useCallback(() => {
    setEditFormData({record:{},id:0})
    setEditModalVisible(true)
  },[])

  const handleDel = useCallback(async (id) => {
    try {
      await delApi({ id });
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '删除成功',
      });
      dispatch(getAction({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
    } catch (e) {
    }
  },[dispatch,pager,delApi,getAction,seatchFilter])

  const onCancel = () => {
    setEditModalVisible(false)
  }
  const batchDel = async () => {
    try {
      await delApis({
        ids: JSON.stringify(selectedRowKeys)
      })
      setSelectedRowKeys([])
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '删除成功',
      });
      setPager(c=>({...c,current:1}))
      dispatch(getAction({pageIndex:1,pageSize:pager.pageSize,filter:seatchFilter}))
    } catch (e) {

    }
  }

  return {
    selectedRowKeys,
    setSelectedRowKeys,
    pager,
    setPager,
    editFormData,
    setEditFormData,
    editModalVisible,
    setEditModalVisible,
    rowSelection,
    handleEdit,
    handleAdd,
    handleDel,
    onCancel,
    batchDel,
  }
}
