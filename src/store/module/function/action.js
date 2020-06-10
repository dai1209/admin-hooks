export const GET_FUNCTION_DATA = 'function/GET_FUNCTION_DATA' 

export const GET_FUNCTION_DATA_SUCCESS = 'function/GET_FUNCTION_DATA_SUCCESS'

export const CHANGE_LOADING = 'function/CHANGE_LOADING'


export const getFunctionData = payload => ({
  type: GET_FUNCTION_DATA,
  payload,
})


export const getFunctionDataSuccess = payload => ({
  type: GET_FUNCTION_DATA_SUCCESS,
  payload
})

export const changeLoading = payload => ({
  type: CHANGE_LOADING,
  payload
})