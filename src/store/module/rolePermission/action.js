export const GET_MENU_FUNCTIONS_DATA = 'rolePermission/GET_MENU_FUNCTIONS_DATA'

export const CHANGE_MENU_FUNCTIONS = 'rolePermission/CHANGE_MENU_FUNCTIONS'

export const CHANGE_ROLE_PERMISSION_LOADING = 'rolePermission/CHANGE_ROLE_PERMISSION_LOADING'


export const getMenuFunctionsData = payload => ({
  type: GET_MENU_FUNCTIONS_DATA,
  payload
})


export const changeMenuFunctions = payload => ({
  type: CHANGE_MENU_FUNCTIONS,
  payload
})

export const changeRolePermissionLoading = payload => ({
  type: CHANGE_ROLE_PERMISSION_LOADING,
  payload
})