import {put,call,takeEvery} from 'redux-saga/effects'

import { getFunctionPagedList } from 'api'

import { GET_FUNCTION_DATA,getFunctionDataSuccess, changeLoading} from './action'

function *fetchFunctionList ({payload}) {
  try{
    yield put(changeLoading(true))
   const { data } = yield call(getFunctionPagedList,payload)
   yield put(getFunctionDataSuccess(data)) 
  }catch (e) {
    console.log(e);
    
  }finally{
    yield put(changeLoading(false))
  }
}


export default function *saga() {
  yield takeEvery(GET_FUNCTION_DATA,fetchFunctionList)
}