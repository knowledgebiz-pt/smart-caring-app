import { createSlice } from '@reduxjs/toolkit'

export const register = createSlice({
    name: 'register',
    initialState: {
        name: "",
        birth_date: null,
        email: "",
        phone: "",
        password: ""
    },
    reducers: {
        insertUser: (state, action) => {
            console.info("PERSISTED REGISTER")
            state.name = action.payload?.name
            state.birth_date = action.payload?.birth_date
            state.email = action.payload?.email
            state.phone = action.payload?.phone
            state.password = action.payload?.password
        },
    },
})

export const modelRegister = () => {
    return(
        {
            name: ""
        }
    )
}

export const { insertUser } = register.actions

export default register.reducer