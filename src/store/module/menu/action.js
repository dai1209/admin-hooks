export const GET_MENU_LIST = 'menu/GET_MENULIST'
export const GET_MENU_LIST_SUCCESS = 'menu/GET_MENULIST_SUCCESS'





export const getMenuList = () => ({
  type: GET_MENU_LIST,
}) 

export const getMenuListSuccess = payload => ({
  type: GET_MENU_LIST_SUCCESS,
  payload
})