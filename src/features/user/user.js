import { createSlice } from '@reduxjs/toolkit'

export const userFeature = createSlice({
    name: 'user',
    initialState: {
        _id: "",
        name: "",
        email: "",
        password: "",
        gmail_access_token: "",
        exponent_push_token: "",
        user_type: "",
        picture: "",
        cpf: "",
        phone: "",
        birthDate: "",
        is_active: undefined,
        is_admin: undefined,
        is_verified: undefined
    },
    reducers: {
        insertUser: (state, action) => {
            console.log("PERSISTED", userFeature.name, insertUser.type, ":", state)
            console.log("REDUX", userFeature.name, insertUser.type, ":", action.payload)
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.password = action.payload?.password
            state.gmailAccessToken = action.payload?.gmail_access_token
            state.exponentPushToken = action.payload?.exponent_push_token
            state.user_type = action.payload?.user_type
            state.picture = action.payload?.picture
            state.cpf = action.payload?.cpf
            state.phone = action.payload?.phone
            state.birth_date = action.payload?.birth_date
            state.is_active = action.payload?.is_active
            state.is_admin = action.payload?.is_admin
            state.is_verified = action.payload?.is_verified
        },

        updateEmailAndPhone: (state, action) => {
            console.log("PERSISTED", userFeature.name, updateEmailAndPhone.type, ":", state)
            console.log("REDUX", userFeature.name, updateEmailAndPhone.type, ":", action.payload)
            state.email = action.payload?.email
            state.phone = action.payload?.phone
        },

        updatePassword: (state, action) => {
            console.log("PERSISTED", userFeature.name, updatePassword.type, ":", state)
            console.log("REDUX", userFeature.name, updatePassword.type, ":", action.payload)
            state.password = action.payload?.password
        }
    },
})

export const { insertUser, updateEmailAndPhone, updatePassword } = userFeature.actions

export default userFeature.reducer