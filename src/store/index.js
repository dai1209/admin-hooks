import {createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage/session';
import reducers from './reducers'
import sagas from './sagas'
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}
const sagaMiddleware = createSagaMiddleware()
const myPersistReducer = persistReducer(persistConfig, reducers)
const store = createStore(
  myPersistReducer,
  applyMiddleware(sagaMiddleware)
)
sagas.map(saga=>sagaMiddleware.run(saga))

export const persistor = persistStore(store)
export default store

