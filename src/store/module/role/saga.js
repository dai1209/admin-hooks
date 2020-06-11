import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_ROLE_DATA, getRoleDataSuccess, changeRoleLoad } from './action'
import { getRolePagedList } from 'api'

function *fetchRoleData ({payload}) {
  try {
    yield put(changeRoleLoad(true))
    const { data } = yield call(getRolePagedList,payload)
    console.log(data);
    
    yield put(getRoleDataSuccess(data)) 
  } catch (e) {
    
  }finally{
    yield put(changeRoleLoad(false))
  }
}


export default function * saga () {
  yield takeEvery(GET_ROLE_DATA,fetchRoleData)
}