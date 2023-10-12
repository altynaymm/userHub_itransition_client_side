import { createSlice,  } from "@reduxjs/toolkit";
import { getUserLogOut } from "./Thunk/user.thunk";
const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        authUser: false,
        error: null,
    },
    reducers: {
        authentication: (state, action) => {
            if (action.payload.error) {
                state.authUser = false;
                state.error = action.payload.error;
              } else {
                state.user = action.payload;
                state.authUser = true;
                state.error = null;
              }
        },
    },
        extraReducers: (builder) => {
            builder
              // TODO logoutUser
              .addCase(getUserLogOut.pending, (state) => {
                state.authUser = false;
                state.error = null;
              })
              .addCase(getUserLogOut.fulfilled, (state, ) => {
                state.authUser = false;
                state.user = [];
              })
              .addCase(getUserLogOut.rejected, (state, ) => {
                state.authUser = true;
              });
          },
    
});

export const {authentication} = authSlice.actions;

export default authSlice.reducer;