import { put, call, takeEvery} from 'redux-saga/effects'
import { GET_MENU_LIST, getMenuListSuccess } from './action'
import { getAllMenu } from 'api'

function *fetchMenuList () {
  try{
    const {data} = yield call(getAllMenu)
    yield put(getMenuListSuccess(data))
  }catch (e) {

  }
}








export default function* saga() {
  yield takeEvery(GET_MENU_LIST,fetchMenuList)
}