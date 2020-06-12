import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux'
import { Badge } from 'antd';
import { editRoleUser } from 'api';
import { getUserList } from 'store/module/users/action'
import schema from 'schema/user';
import CommonPage from 'containers/CommonPage'
import { usePage } from 'hooks'

const searchUi = Object.entries(schema.searchUiSchema)

const page = {
  current: 1,
  pageSize: 10,
  total: 0
}
export default memo((props) => {
  const seatchFilter = useMemo(() =>({
    name:'',
    email: "",
    roleId: props.record.id
  }),[props.record])
  const pagedList = useSelector(({users}) => users.pagedList)
  const total = useSelector(({users}) => users.total)

  const columns =[
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
      title: '添加状态',
      dataIndex: 'isAdd',
      align: 'center',
      render: (text, record) => (
        record.isAdd === 1 ? <Badge status="success" /> : <Badge status="error" />
      )
    },
    {
        title: '操作',
        dataIndex: 'id',
        align: 'center',
        fixed: 'right',
        width: 120,
        render: (text, record) => (
          record.isAdd === 1 ?
            <span onClick={() => modifyRoleUser(record, 0)} style={{color:'#f5222d'}} >
              移除
            </span>
            :
            <span onClick={() => modifyRoleUser(record, 1)} style={{color:'cyan'}} >
              添加
            </span>
        )
    }]
  const {
    handleSearch,
    onTableChange,
    pagination,
    handleToggle
  } = usePage({page,getAction:getUserList,seatchFilter,total,toggleApi:editRoleUser})
  const modifyRoleUser = async (record,action) => {
    const options = {
      roleId: props.record.id,
      userId: record.id,
      action,
    }
    handleToggle(options)
}
  return  (<>
    <CommonPage
      handleSearch = {handleSearch}
      onTableChange = {onTableChange}
      pagination = {pagination}
      seatchFilter = {seatchFilter}
      searchUi = {searchUi}
      // loading = {loading}
      pagedList = {pagedList}
      columns = {columns}
    />
  </>)
})
