import {put,call,takeEvery} from 'redux-saga/effects'
import {message} from 'antd'

import {login} from 'api'
import {LOGIN,loginSuccess,logoutSuccess, LOGOUT} from './actions'


function *fetchUserLogin({payload}){
  try{
    const {userInfo} = yield call(login,payload)
    console.log(userInfo);
    
    yield put(loginSuccess(userInfo))
  }catch(e){
    message.error('登录失败') 
  }finally{
    message.success('登录成功')
  }
  
}

function *logout(){
  try{
    yield put(logoutSuccess())

  }catch(e){
    console.log(e);
    
  }
}








export default function* saga(){
  yield takeEvery(LOGIN,fetchUserLogin)
  yield takeEvery(LOGOUT,logout)

}