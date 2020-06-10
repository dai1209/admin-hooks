//action types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const GET_USERINFO_SUCCESS = "GET_USERINFO_SUCCESS"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const GET_USER_PERMISSION = "user/GET_USER_PERMISSION"

// action creators
export const login = payload => ({ type: LOGIN_SUCCESS, payload })


export const updateUserInfo = payload => ({ type: GET_USERINFO_SUCCESS, payload })


export const logout = () => ({ type: LOGOUT_SUCCESS })

export const getUserPermission = () => ({ type: GET_USER_PERMISSION })