export const LOGIN = 'login'
export const LOGIN_SUCCESS = 'login-success'
export const LOGOUT = 'logout'
export const LOGOUT_SUCCESS = 'logout-success'



export const userLogin=payload=>({
  type:LOGIN,
  payload
}) 

export const loginSuccess = payload=>({
  type:LOGIN_SUCCESS,
  payload
})

export const logout = ()=>({
  type: LOGOUT
})
export const logoutSuccess = ()=>({
  type: LOGOUT_SUCCESS
})