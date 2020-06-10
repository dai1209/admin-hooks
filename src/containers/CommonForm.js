import React, { forwardRef } from 'react'
import { Form } from 'antd'

import FormList from 'components/BaseForm'
// data onfinish record ref
export default forwardRef(({data,onFinish,record},ref)=><Form onFinish = {onFinish} ref = {ref}>

  <FormList data={data} record={record} ref={ref}/>
</Form>)



//     data.map(([key,value]) => {
//       switch (value['ui:widget']){
//         case 'input':
//           return (
//           <Form.Item 
//             key={key} 
//             label={value['ui:title']} 
//             name={key} 
//             hasFeedback = {value['ui:formItemConfig'] && value['ui:formItemConfig'].hasFeedback} 
//             layout =''
//             initialValue={record[key]}
//             rules = {value['ui:rules']}
//           >
//             <Input style={{ width:value.width }} type={value['ui:options'].type} placeholder={value['ui:options'].placeholder} />
//           </Form.Item>)

//         case 'input.textarea':
//           return (
//             <Form.Item initialValue={record[key]}  key={key} label={value['ui:title']} name={key} rules = {value['ui:rules']} hasFeedback = {value['ui:formItemConfig'].hasFeedback}>
//               <Input.TextArea  style={ value['ui:options'].style } />
//             </Form.Item>
//           )
//         case 'cascader':
//           return (
//               <MyCascader ref={ref} key = {key} moduleId={record[key]} value={value} myKey={key} />
//           )
//         case 'select':
//           return (
//             <Form.Item label={value.label} name='' >
//               <Select style={{ width:value.width }} >
//               </Select>
//             </Form.Item>
//           )
//         case 'chooseTime':
//           return (
//             <Form.Item label={value.label} name=''>
//               <DatePicker.RangePicker style={{ width:value.width }} format="YYYY-MM-DD" />
//             </Form.Item>
//           )
//         default:
//           return null
//       }
//     })
//   } */}
//  */