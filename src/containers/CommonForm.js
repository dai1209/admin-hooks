import React, { forwardRef } from 'react'
import { Form } from 'antd'
import FormList from 'components/BaseForm'

export default forwardRef(({data,onFinish,record},ref)=><Form onFinish = {onFinish} ref = {ref}>
  <FormList data={data} record={record} ref={ref}/>
</Form>)
