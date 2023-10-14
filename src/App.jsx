import './App.css'
import { Route, Routes } from 'react-router-dom'

import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import UsersList from './components/UsersList/UsersList'
import Home from './components/Home/Home'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />}> </Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/users' element={<UsersList />}> </Route>
      </Routes>
    </>
  )
}

export default App
