import produce from 'immer'
import {GET_MENU_LIST_SUCCESS} from './action'


const defaultState = {
  menuList: [],

}


export default produce((state = defaultState, {type, payload}) => {
  switch (type) {
    case GET_MENU_LIST_SUCCESS:
      state.menuList = payload
      break
    default:
      return state
  }
})