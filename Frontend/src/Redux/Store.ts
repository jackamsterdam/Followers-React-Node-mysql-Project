import {combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { authReducer } from './AuthState'
import { vacationsReducer } from './VacationsState'



const reducers = combineReducers({
  authState: authReducer,
  vacationsState: vacationsReducer
})

const store = createStore(reducers, composeWithDevTools())

export default store 