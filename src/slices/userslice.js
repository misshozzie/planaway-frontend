// for user data, email for verification
// and handler user login/logout functions
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        // will store user data
        user: null,
        // store error messages
        error: null,
        //to store email during process like  verification
        email_for_verification: null,
    },
    reducers: {
        // sets the user state
        setUser: (state, action) => {
            state.user = action.payload;
        },
        //updates email with payload
        setEmail: (state, action) => {
            state.email_for_verification = action.payload;
        },
        //resets users to pull when logout
        logout: (state, action) => {
            state.user = null;
        },
    },
})

export const { logout, setUser, setUserType, setEmail } = userSlice.actions;

export default userSlice.reducer;