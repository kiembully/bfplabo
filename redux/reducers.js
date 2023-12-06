import { combineReducers } from 'redux'
import loginReducer from './login/login.reducer'
import feedReducer from './Feed/feed.reducer'
import orderReducer from './Order/order.reducer'
import MyOrderReducer from './MyOrders/myOrder.reducer'
import emailReducer from './Email/email.reducer'
import AllOrdersReducer from './AllOrders/allOrders.reducer'
import usersReducer from './Users/users.reducer'
import officerReducer from './officer/officer.reducer'

const reducers = combineReducers({
  login: loginReducer,
  feed: feedReducer,
  newOrder: orderReducer,
  myOrders: MyOrderReducer,
  email: emailReducer,
  allOrders: AllOrdersReducer,
  users: usersReducer,
  officers: officerReducer
})

export default reducers
