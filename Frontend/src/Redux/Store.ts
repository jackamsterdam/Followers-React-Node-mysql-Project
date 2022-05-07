import {combineReducers, createStore} from 'redux'
import { authReducer } from './AuthState'
import { userVacationsReducer } from './UserVacationsState'
import { vacationsReducer } from './VacationsState'


const reducers = combineReducers({
  authState: authReducer,
  vacationsState: vacationsReducer,
  userVacationsState: userVacationsReducer
})

const store = createStore(reducers)

export default store 