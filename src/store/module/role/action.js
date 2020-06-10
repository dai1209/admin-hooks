export const GET_ROLE_DATA = 'role/GET_ROLE_DATA'
export const GET_ROLE_DATA_SUCCESS = 'role/GET_ROLE_DATA_SUCCESS'
export const CHANGE_ROLE_LOADING = 'role/CHANGE_ROLE_LOADING'


export const getRoleData = payload => ({
  type: GET_ROLE_DATA,
  payload
})

export const getRoleDataSuccess = payload =>({
  type:GET_ROLE_DATA_SUCCESS,
  payload
})

export const changeRoleLoad = payload => ({
  type: CHANGE_ROLE_LOADING,
  payload
})