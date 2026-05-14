import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = Boolean(action.payload)
        },

        clearUserDetails: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const {
    setUserDetails,
    clearUserDetails
} = userSlice.actions

export default userSlice.reducer
