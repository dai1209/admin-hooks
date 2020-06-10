import produce from 'immer'

import {
  UPDATE_ACCESSMENU,
  UPDATE_MODULE,
  UPDATE_TOPATH,
  SPIN_LOADING
} from './action'
const defaultState = {
  spinLoading: false,
  toPath: '/',
  currentModule: '',//当前模块
  accessMenu: [],//可访问的菜单,
  openAccessMenu: [],//展开的可访问的菜单(子级包含父级name)
  moduleList: [],//模块列表
  moduleMenu: [],//模块菜单
 }


//reducer
export default produce((state = defaultState, {type, payload}) => {
  
  switch (type) {
      case SPIN_LOADING:
          //全局loading
        state.spinLoading = payload
        break
      case UPDATE_TOPATH:
        //登陆后跳转地址
        state.toPath = payload
        break
      case UPDATE_ACCESSMENU:
        Object.assign(state, payload)
        break
      case UPDATE_MODULE:
        Object.assign(state, payload)
        break
      default:
        return state
  }
})