import React, { memo,useMemo,useRef,useState,useEffect} from 'react';
import { Table, Popconfirm, Divider, Button } from 'antd';
import { PlusSquareOutlined,DeleteOutlined } from '@ant-design/icons'
import SearchForm from 'containers/SearchForm';
import Permission from 'containers/Permission';
import { useDispatch } from 'react-redux';

const sort = {
  field: '',
  order: ''
}
const page = {
  current: 1,
  pageSize: 10,
  total: 0
}

export default memo(({
  searchUi, setPager,pager,seatchFilter,batchDel,selectedRowKeys,rowSelection,
  loading,pagedList,total,columns, 
  getPageList, addPermission,addClick,deletPermission
}) => {
  const [ sorter, setSorter] = useState(sort)
  const [filter,setFilter] = useState(seatchFilter)
  
  
  const dispatch = useDispatch()
  const searchRef = useRef()
  const handleSearch = (filter) => {
    setFilter(filter)
    setPager(c=>({...c,current:1}))
    const query = {
        pageIndex: 1,
        pageSize: pager.pageSize,
        sortBy: sorter.field,
        descending: sorter.order === 'descend',
        filter,
    };
    dispatch(getPageList(query))
   }
   
   const onTableChange = ({current,pageSize}, filters, sorter) => {
    setPager({
      current,
      pageSize
    })
    setSorter(sorter)
    const query = {
      pageIndex: current,
      pageSize,
      sortBy: sorter.field,
      descending: sorter.order === 'descend',
      filter: filter
    }; 
    dispatch(getPageList(query))
  }
  useEffect(()=>{
    dispatch(getPageList({pageIndex:page.current,pageSize:page.pageSize,filter:seatchFilter}))
  },[dispatch,getPageList,seatchFilter])

  const pagination = useMemo(()=>({
    current:pager.current,
    pageSize: pager.pageSize,
    total,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: total => `Total ${total} items`
  }),[pager,total])
  
  
  return (
    <>
      <SearchForm 
        data = {searchUi} 
        ref = {searchRef}
        onFinish = {handleSearch}
      />
      <Divider />
      {addClick ? <div style={{ marginBottom: 16 }}>
        <Permission permission={addPermission}>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={addClick}
          >
            新增
        </Button>
        </Permission>
        <Divider type="vertical" />
        <Permission permission={deletPermission}>
          <Popconfirm title="确定删除?" onConfirm={batchDel} disabled={selectedRowKeys.length === 0} >
            <Button
              type="danger"
              disabled={selectedRowKeys.length === 0}
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Permission>
      </div> : null }
      <Table
        rowSelection={rowSelection}
        columns={columns}
        rowKey={record => record.id}
        dataSource={pagedList}
        pagination={pagination}
        loading={loading}
        onChange={onTableChange}
        scroll={{ x: 768 }}
        bordered
      />
    </>
  )
})

