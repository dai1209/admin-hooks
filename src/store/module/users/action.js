export const GET_USER_LIST = 'users/GET_USER_LIST'
export const GET_USER_LIST_SUCCESS = 'users/GET_USER_LIST_SUCCESS'



export const getUserList = payload => ({
  type:GET_USER_LIST,
  payload
})

export const getUserListSuccess = payload => ({
  type:GET_USER_LIST_SUCCESS,
  payload
})
