import produce from 'immer'
import {LOGIN_SUCCESS, LOGOUT_SUCCESS} from './actions'


const initialState = {
  userInfo:null,
}

export default produce((state=initialState,{type,payload})=>{
  switch (type){
    case LOGIN_SUCCESS:
      console.log('reducer login');
      
      state.userInfo = payload
      break
    case LOGOUT_SUCCESS:
      console.log('reducer logout');
      
      state.userInfo = null
      break
    default:
      return state
  }
})