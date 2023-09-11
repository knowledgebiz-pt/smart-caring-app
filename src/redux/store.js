import { configureStore } from '@reduxjs/toolkit'
// import register from '../features/user/register'
import chatFeature from '../features/chat/chat'

export default configureStore({
  reducer: {
    chat: chatFeature
  },
})
