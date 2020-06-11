import produce from 'immer'
import {GET_USER_LIST_SUCCESS} from './action'


const defaultState = {
  pagedList:[],
  total: 0
}



export default produce((state = defaultState, {type, payload}) => {
  switch (type) {
    case GET_USER_LIST_SUCCESS:
      state.pagedList = payload.rows
      state.total = payload.totalCount
      break
    default:
      return state 
  }
})