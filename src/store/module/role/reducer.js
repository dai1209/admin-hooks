import produce from 'immer'
import { GET_ROLE_DATA_SUCCESS, CHANGE_ROLE_LOADING} from './action'


const defaultState = {
  pagedList: [],
  loading: false,
  total: 0
}
export default produce((state = defaultState, {type, payload}) => {
  switch (type) {
    case GET_ROLE_DATA_SUCCESS:
      state.pagedList = payload.rows
      state.total = payload.totalCount
      break
    case CHANGE_ROLE_LOADING:
      state.loading = payload
      break
    default:
      return state
  }
})