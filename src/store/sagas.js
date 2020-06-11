import user from './module/user/saga'
import app from './module/app/saga'
import functional from './module/function/saga'
import menu from './module/menu/saga'
import role from './module/role/saga'
import rolePermission from './module/rolePermission/saga'
import users from './module/users/saga'



export default [
  user,
  app,
  functional,
  menu,
  role,
  rolePermission,
  users
]