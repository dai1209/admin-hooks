import { put, takeEvery, call } from 'redux-saga/effects'

import { GET_MENU_FUNCTIONS_DATA,changeMenuFunctions } from './action'

import { getMenuFunctions } from 'api'


function *fetchMenuFuncionsData ({payload}) {
  try{
    const {data} = yield call(getMenuFunctions,payload)
    console.log(data);
    
    yield put(changeMenuFunctions(data))
  }catch (e) {

  }
}




export default function *saga() {
  yield takeEvery(GET_MENU_FUNCTIONS_DATA, fetchMenuFuncionsData)
}