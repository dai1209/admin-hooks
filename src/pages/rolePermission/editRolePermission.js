import React from 'react';
import {  Tree } from 'antd';


import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { getMenuFunctionsData } from 'store/module/rolePermission/action'

export default (({record,checkedKeys,setCheckedKeys}) => {

  const roleFunctions = useSelector(({rolePermission}) => rolePermission.roleFunctions)
  const menuFunctions = useSelector(({rolePermission}) => rolePermission.menuFunctions)

  useEffect(() => {
    setCheckedKeys(roleFunctions.map(s=>s.functionId))
  },[roleFunctions,setCheckedKeys])
  const dispatch = useDispatch()

  const buildMenuListAndFunctions = (data) => {
    const top = data.filter(item => item.parentId == 0)
    function def (list){
      list.forEach(item => {
        const children = data.filter(val => val.parentId == item.id)
        if(children && children.length >0){
          def(children) 
       }
       item.children = [...children,...item.functions]
      })
    }
    def(top)
    return top
  }
  const menuFunctionList = useMemo(() => buildMenuListAndFunctions(menuFunctions),[menuFunctions])

  useEffect(() => {
    dispatch(getMenuFunctionsData({menuId:0,roleId:record.id}))
  },[record,dispatch])

  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys.filter(s=>s.split('-')[0]!=='0'))
    console.log(checkedKeys);
    
  }
  
  const tree = (list)=>list.map(item => ({
      title: item.name,
      key: item.children && item.children.length > 0? `0-${item.id}` : `${item.id}`,
      children: item.children? tree(item.children): null
    }))
  
  const treeData = tree(menuFunctionList)
  return <Tree 
      checkable
      multiple
      defaultExpandAll={true}
      checkedKeys = {checkedKeys}
      selectable
      autoExpandParent
      onCheck = {onCheck}
      treeData={treeData}
    />
})