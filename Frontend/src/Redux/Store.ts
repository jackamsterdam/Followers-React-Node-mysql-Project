import {combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { authReducer } from './AuthState'



const reducers = combineReducers({
  authState: authReducer
})

const store = createStore(reducers, composeWithDevTools())

export default store 