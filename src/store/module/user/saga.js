import { all, put, takeEvery, call } from 'redux-saga/effects'

import {
  GET_USER_PERMISSION, updateUserInfo
} from './action'
import { updateAccessMenu } from '../app/action'

import * as util from 'utils/util'
import constantMenu from 'utils/constantMenu'
import {
  getUserInfo,
  getAccessMemu
} from 'api'


function * fetchUserPermission () {
  try {
    const [infoRes, menuRes] = yield all([
      call(getUserInfo),
      call(getAccessMemu)
    ])
    const {username, avatarUrl, isAdmin, userRole, userPermission} = infoRes.data;
    const permission = [...userRole,...userPermission]
    const userInfo = {
      name: username,
      avatar: avatarUrl,
      isAdmin,
      permission
    }
    const accessMenu = [...menuRes.data,...constantMenu];
    const openAccessMenu = util.openAccesseMenu(accessMenu)
    const moduleList = accessMenu.filter(item => item.leftMemu)
    const currentModule = moduleList[0].name;
    const moduleMenu = moduleList[0].children;
    yield all([
      put(updateUserInfo(userInfo)),
      put(updateAccessMenu({
        currentModule,
        accessMenu,
        openAccessMenu,
        moduleMenu,
        moduleList
      }))
    ])

  } catch (e) {
    console.log(e);
    
  }finally {
    
  }
}




export default function *saga () {
  yield takeEvery(GET_USER_PERMISSION,fetchUserPermission)
}