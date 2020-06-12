import { put, call, takeEvery } from 'redux-saga/effects'

import { GET_USER_LIST, getUserListSuccess } from "./action";

import { getUserPagedList } from "api";

function *fetchUserList({payload}) {
  try {
    const { data } = yield call(getUserPagedList,payload)
    yield put(getUserListSuccess(data))
  }catch (e){

  }
}








export default function *saga() {
  yield takeEvery(GET_USER_LIST,fetchUserList)
}