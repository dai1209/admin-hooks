import React, { memo, useMemo } from 'react';
import { useSelector} from 'react-redux'
import { Badge } from 'antd';
import { editRoleUser } from 'api';
import { getRoleData } from 'store/module/role/action'
import schema from 'schema/roleUser';
import CommonPage from 'containers/CommonPage'
import { usePage } from 'hooks';

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
    userId: props.record.id
  }),[props.record])
  const pagedList = useSelector(({role}) => role.pagedList)
  const total = useSelector(({role}) => role.total)

  const columns =[
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
        title: '添加状态',
        dataIndex: 'isAdd',
        align: 'center',
        render: (text, record) => {
            return (
                record.isAdd === 1 ? <Badge status="success" /> : <Badge status="error" />
            )
        }
    },
    {
        title: '操作',
        dataIndex: 'id',
        align: 'center',
        fixed: 'right',
        width: 120,
        render: (text, record) => (
          record.isAdd === 1 ?
            <span onClick={() => modifyRoleUser(record, 0)} style={{color:'#f5222d',cursor:'pointer'}} >
              移除
            </span>
            :
            <span onClick={() => modifyRoleUser(record, 1)} style={{color:'cyan', cursor:'pointer'}} >
              添加
            </span>
        )
    }]

  const {
    handleSearch,
    onTableChange,
    pagination,
    handleToggle
  } = usePage({page,getAction:getRoleData,seatchFilter,total,toggleApi:editRoleUser})
  const modifyRoleUser = async (record,action) => {
    const options = {
      userId: props.record.id,
      roleId: record.id,
      action,
    }
    handleToggle(options,action)
  }

  return  (<>
    <CommonPage
      handleSearch = {handleSearch}
      pagination={pagination}
      searchUi = {searchUi}
      onChange={onTableChange}
      // loading = {loading}
      pagedList = {pagedList}
      columns = {columns}
    />
  </>)
})
