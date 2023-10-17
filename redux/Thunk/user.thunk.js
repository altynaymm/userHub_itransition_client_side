
import { createAsyncThunk } from "@reduxjs/toolkit";
import {authentication} from '../user.slice';


export const checkSession = createAsyncThunk('/auth/checkSession', async(_, {dispatch}) => {
  try {
    
      const token = localStorage.getItem('jwt');
       
      const response = await fetch(`${import.meta.env.VITE_API_URL}/check-user`, {
          headers: {
              'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
      }); 

      const data = await response.json();

      if (data) {
          dispatch(authentication(data));
      } 
      // else {
      //     dispatch(getUserLogOut());
      // }
  } catch (error) {
      console.error("Error while checking session:", error);
  }
});


export const registerUser = createAsyncThunk('auth/registerUser', async (userData, {dispatch}) => {
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sign-up`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'

      });
      const data = await response.json();
      console.log(data);
      
  
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        dispatch(authentication(data));
      } else  {
        throw new Error('Registration failed');
      }
   
  });

  export const signInUser = createAsyncThunk('auth/signInUser', async (userData, {dispatch}) => {
  
    const response = await fetch(`${import.meta.env.VITE_API_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include'

    });
    const data = await response.json();
    console.log(data);
    

    if (data) {
      localStorage.setItem('jwt', data.token);
      dispatch(authentication(data));
    } else {
      throw new Error('Authentication failed');
    }
 
});

export const getUsersList = createAsyncThunk('auth/usersList', async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      credentials: 'include'
    });
    console.log(response);
    
    if (!response.ok) {
        throw new Error('Failed to get users');
    }
    return response.json();
});

export const getUserLogOut = createAsyncThunk('auth/logOut', async () => {
  localStorage.removeItem('jwt');

  window.location = '/';
});


export const deleteUser = createAsyncThunk('/auth/deleteUser', async(usersId) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/delete-user`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersId }),
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    return response.json();
})

export const blockUsers = createAsyncThunk('/auth/blockUser', async(usersId) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/block-user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersId }),
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Failed to block user');
    }
    return response.json();
})

export const unblockUsers = createAsyncThunk('/auth/unblockUser', async(usersId) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/unblock-user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usersId }),
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Failed to unblock user');
    }
    return response.json();
})