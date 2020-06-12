import { useState,useCallback,useMemo,useEffect } from 'react'

import {notification} from 'antd'
import { useDispatch } from 'react-redux'
const sort = {
  field: '',
  order: ''
}



export function usePage({page,delApi,getAction,delApis,saveApi,seatchFilter,total,toggleApi}) {

  const [selectedRowKeys,setSelectedRowKeys] = useState([])
  const [pager,setPager] = useState(page)
  const [ editModalVisible, setEditModalVisible ] = useState(false)
  const [editFormData, setEditFormData] = useState({record:{},id:0})
  const [ sorter, setSorter] = useState(sort)
  const [filter,setFilter] = useState(seatchFilter)
  const dispatch = useDispatch()

  const handleSearch = useCallback((filter) => {
    setFilter(c=>({...c,...filter}))
    setPager(c=>({...c,current:1}))
   },[])
   
   const onTableChange = useCallback(({current,pageSize}, filters, sorter) => {
    setPager({
      current,
      pageSize
    })
    setSorter(sorter)
  },[])

  useEffect(()=>{
    const query = {
      pageIndex:pager.current,
      pageSize:pager.pageSize,
      sortBy: sorter.field,
      descending: sorter.order === 'descend',
      filter:filter
    }
    dispatch(getAction(query))
  },[dispatch,getAction,seatchFilter,pager,sorter,filter])

  const pagination = useMemo(()=>({
    current:pager.current,
    pageSize: pager.pageSize,
    total,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: total => `Total ${total} items`
  }),[pager,total])
  
  
  const rowSelection = useMemo(() => ({
    selectedRowKeys,
    onChange: (e)=>setSelectedRowKeys(e)
  }),[selectedRowKeys])
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
      setPager(c=>({...c,current:1}))
    } catch (e) {
    }
  },[delApi])
  const handleFinish = useCallback(async (options) => {
    try {
      await saveApi(options)
      setEditModalVisible(false)
      notification.success({
        placement: 'bottomLeft bottomRight',
        message: '保存成功',
      });
      setPager(c=>({...c,current:1}))
    } catch (e) {

    }
  },[saveApi])
  const onCancel = useCallback(() => {
    setEditModalVisible(false)
  },[setEditModalVisible])
  const batchDel = useCallback(async () => {
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
    } catch (e) {

    }
  },[delApis,selectedRowKeys])  

  const handleToggle = async (options,action) => {
    try{ 
      await toggleApi(options);
      if (action === 1) {
        notification.success({
          placement: 'bottomLeft bottomRight',
          message: '添加成功',
        });
      } else {
        notification.success({
          placement: 'bottomLeft bottomRight',
          message: '移除成功',
        });
      }
    } catch (e) {

    }
    setFilter(c=>({...c}))
  }



  return {
    selectedRowKeys,
    pager,
    handleSearch,
    onTableChange,
    editFormData,
    editModalVisible,
    setEditModalVisible,
    rowSelection,
    handleEdit,
    handleAdd,
    handleDel,
    handleFinish,
    onCancel,
    batchDel,
    pagination,
    handleToggle
  }
}
