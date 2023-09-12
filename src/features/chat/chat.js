import { createSlice } from '@reduxjs/toolkit'

export const chatFeature = createSlice({
    name: 'chat',
    initialState: [],
    reducers: {
        insertMessage: (state, action) => {
            console.log('INSERT MESSAGE')
            console.log(action.payload)
            state = action.payload
            return state
            // state = state.push(action.payload)
            // state = action.payload  
        },
    },
})

export const { insertMessage } = chatFeature.actions

export default chatFeature.reducer