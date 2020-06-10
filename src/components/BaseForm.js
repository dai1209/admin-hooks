import React,{ forwardRef, useState, useEffect} from 'react'
import { Input, Select, Form, DatePicker,  Cascader } from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import {getMenuList} from 'store/module/menu/action'
import {findSelectNode} from 'utils/util'

const FormList = forwardRef(({data,record},ref)=><>
  {
  data.map(([key,value])=>{
  switch (value['ui:widget']){
    case 'input':
      return (
      <Form.Item 
        key={key} 
        label={value['ui:title']} 
        name={key} 
        hasFeedback = {value['ui:formItemConfig'] && value['ui:formItemConfig'].hasFeedback} 
        layout =''
        initialValue={record && record[key]}
        rules = {value['ui:rules']}
      >
        <Input style={{ width:value.width }} type={value['ui:options'].type} placeholder={value['ui:options'].placeholder} />
      </Form.Item>)

    case 'input.textarea':
      return (
        <Form.Item initialValue={record && record[key]} key={key} label={value['ui:title']} name={key} rules = {value['ui:rules']} hasFeedback = {value['ui:formItemConfig'].hasFeedback}>
          <Input.TextArea  style={ value['ui:options'].style } />
        </Form.Item>
      )
    case 'cascader':
      return (
          <MyCascader value={value} myKey={key} moduleId={record && record[key]} ref={ref}  />
      )
    case 'select':
      return (
        <Form.Item label={value.label} name='' >
          <Select style={{ width:value.width }} >
          </Select>
        </Form.Item>
      )
    case 'chooseTime':
      return (
        <Form.Item label={value.label} name=''>
          <DatePicker.RangePicker style={{ width:value.width }} format="YYYY-MM-DD" />
        </Form.Item>
      )
    default:
      return null
  }}
  
  )
}
</>)
const MyCascader = forwardRef(({myKey,value,moduleId},ref) => {
    const [options,setOptions] = useState([])
    const menuList = useSelector(({menu}) => menu.menuList)
    const dispatch = useDispatch()
    useEffect(() => {
      if (menuList.length === 0 && moduleId) {
        dispatch(getMenuList())
      }else {
        const {hand} = value['ui:remoteConfig']
        const formatData = (data) => data.map(item => {
          return {
            value: item.id,
            label: item.title,
            children : item.children? formatData(item.children) : null
          }
        })
        setOptions(formatData(hand(menuList)))
        const res = moduleId ? findSelectNode(menuList,moduleId) : undefined
        res && ref.current.setFieldsValue({moduleId:res})
      }
    },[value,moduleId,ref,dispatch,menuList])
  
    
    return <Form.Item key={myKey} label={value['ui:title']} name={myKey} rules = {value['ui:rules']} hasFeedback = {value['ui:formItemConfig'].hasFeedback} >
        <Cascader changeOnSelect={true} options={options} />
      </Form.Item>
  })

export default FormList
