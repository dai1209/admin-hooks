import produce from 'immer'
import { 
  LOGIN_SUCCESS, 
  GET_USERINFO_SUCCESS, 
  LOGOUT_SUCCESS 
} from './action'


const defaultState = {
      token: '',
      userInfo: {
        name: 'admin',
        avatar: '',
        isAdmin: 0,
        permission: []
      }
  }






export default produce((state = defaultState, {type, payload}) => {
  
  switch (type) {
    case LOGIN_SUCCESS:
      //登录
      state.token = payload
      break
    case GET_USERINFO_SUCCESS:
      //获取用户信息
      state.userInfo = payload
      break
    case LOGOUT_SUCCESS:
        // 登出
      state.userInfo = defaultState.userInfo
      break
    default:
      return state
  }
})