import {combineReducers} from 'redux'
import user from './module/user/reducer'
import app from './module/app/reducer'
import functional from './module/function/reducer'
import menu from './module/menu/reducer'
import role from './module/role/reducer'
import rolePermission from './module/rolePermission/reducer'



export default combineReducers({
  user,
  app,
  functional,
  menu,
  role,
  rolePermission
})