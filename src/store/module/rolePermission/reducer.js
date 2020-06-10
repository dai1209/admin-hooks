import produce from 'immer'

import {CHANGE_MENU_FUNCTIONS} from './action'


const defaultState = {
  menuFunctions: [],
  roleFunctions:[],
  loading: false
}


export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case CHANGE_MENU_FUNCTIONS:
      return {...state, ...payload}
    default:
      return state
  }
}