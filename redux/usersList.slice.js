import { blockUsers, deleteUser, getUsersList, unblockUsers } from "./Thunk/user.thunk";
import { createSlice } from "@reduxjs/toolkit";

const usersListSlice = createSlice({
    name: 'usersList',
    initialState: { users: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsersList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(getUsersList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const deletedUsersIds = action.payload;
                state.users = state.users.filter(user => !deletedUsersIds.includes(user.id));
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(blockUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(blockUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const blockedUsersIds = action.payload;
                state.users.forEach(user => {
                    if (blockedUsersIds.includes(user.id)) {
                        user.status = 'blocked';
                    }
                });
            })
            .addCase(blockUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(unblockUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(unblockUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const unblockedUsersIds = action.payload;
                state.users.forEach(user => {
                    if (unblockedUsersIds.includes(user.id)) {
                        user.status = 'active';
                    }
                });
            })
            .addCase(unblockUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

    },
});

export default usersListSlice.reducer;
