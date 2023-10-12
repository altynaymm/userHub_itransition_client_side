import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getUserLogOut } from '../../../redux/Thunk/user.thunk';


function Header() {
  const user = useSelector(state => state.userReducer.user);
  console.log(user);
  
  const dispatch = useDispatch();

  return (
    <>
      {user ? (
          <AppBar position="static" >
            <Toolbar >
              <Typography  style={{ flexGrow: 1, }}>
                Hello, {user?.firstName}!
              </Typography>
              <button style={{backgroundColor:'transparent', border: 'none'}} onClick={() => dispatch(getUserLogOut())}>Logout</button>
            </Toolbar>
          </AppBar>
      ) : null}
    </>
  );
      }  

export default Header;
