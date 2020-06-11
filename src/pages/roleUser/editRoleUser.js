import React, { memo, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { notification,Badge } from 'antd';
import { editRoleUser } from 'api';
import { getUserList } from 'store/module/users/action'
import schema from 'schema/user';
import CommonPage from 'containers/CommonPage'

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
  const [pager,setPager] = useState(page)
  const dispatch = useDispatch()
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
        record.isAdd == 1 ? <Badge status="success" /> : <Badge status="error" />
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

  const modifyRoleUser = async (record,action) => {
    await editRoleUser({
      roleId: props.record.id,
      userId: record.id,
      action,
  });
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
  dispatch(getUserList({pageIndex:page.current,pageSize:pager.pageSize,filter:seatchFilter}))
  }
 
  return  (<>
    <CommonPage
      pager = {pager} 
      setPager = {setPager}
      seatchFilter = {seatchFilter}
      searchUi = {searchUi}
      getPageList = {getUserList}
      // loading = {loading}
      pagedList = {pagedList}
      total = {total}
      columns = {columns}
    />
  </>)
})
