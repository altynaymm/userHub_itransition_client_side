import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';
import usersListReducer from './usersList.slice';

const store = configureStore({
    reducer: {
     userReducer,
     usersListReducer
    },
  });
  
  export default store;
  