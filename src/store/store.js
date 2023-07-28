import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/loginReducer'

const store = configureStore({
  reducer: loginReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
