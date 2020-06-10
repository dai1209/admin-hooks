import produce from 'immer'
import {GET_FUNCTION_DATA_SUCCESS, CHANGE_LOADING} from './action'


const defaultState = {
  pagedList: [],
  total: 0,
  loading: false,

}

export default produce((state = defaultState , { type, payload }) => {
  switch (type) {
    case GET_FUNCTION_DATA_SUCCESS:
      state.pagedList = payload.rows
      state.total = payload.totalCount
    break
    case CHANGE_LOADING:
      state.loading = payload
    break
    default:
      return state
  }
})