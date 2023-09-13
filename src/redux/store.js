import { configureStore } from '@reduxjs/toolkit'
// import register from '../features/user/register'
import chatFeature from '../features/chat/chat'
import userFeature from '../features/user/user'

export default configureStore({
  reducer: {
    chat: chatFeature,
    user: userFeature,
  },
})
