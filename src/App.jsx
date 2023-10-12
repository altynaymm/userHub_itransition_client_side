import './App.css'
import { Route, Routes } from 'react-router-dom'

import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import UsersList from './components/UsersList/UsersList'
import { checkSession } from '../redux/Thunk/user.thunk'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


function App() {

  return (

    <>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}></Route>
        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path='/users' element={<UsersList/>}> </Route>
      </Routes>
    </>
  )
}

export default App
