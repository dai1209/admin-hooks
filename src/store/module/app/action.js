//action types
export const SPIN_LOADING = "SPIN_LOADING"
export const UPDATE_TOPATH = "UPDATE_TOPATH"
export const UPDATE_ACCESSMENU = "UPDATE_ACCESSMENU"
export const UPDATE_MODULE = "UPDATE_MODULE"



// action creators
export const spinLoading = payload => ({ type: SPIN_LOADING, payload })


export const updateToPath = payload => ({ type: UPDATE_TOPATH, payload })

export const updateAccessMenu = payload => ({ type: UPDATE_ACCESSMENU, payload })

export const updateModule = payload => ({ type: UPDATE_MODULE,payload })

