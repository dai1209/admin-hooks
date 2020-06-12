import React, { memo} from 'react';
import { Table, Popconfirm, Divider, Button } from 'antd';
import { PlusSquareOutlined,DeleteOutlined } from '@ant-design/icons'
import SearchForm from 'containers/SearchForm';
import Permission from 'containers/Permission';


export default memo(({
  searchUi, pagination,onTableChange,batchDel,selectedRowKeys,rowSelection,
  loading,pagedList,columns, 
  handleSearch, addPermission,handleAdd,deletPermission
}) => {

  return (
    <>
      <SearchForm 
        data = {searchUi} 
        onFinish = {handleSearch}
      />
      <Divider />
      {handleAdd ? <div style={{ marginBottom: 16 }}>
        <Permission permission={addPermission}>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={handleAdd}
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

