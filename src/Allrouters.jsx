import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Signup from './pages/Signup'
import Loginhome from './pages/Loginhome'
import SetReminderPage from './pages/SetReminder'
import Modify from './pages/Modify'

const Allrouters = () => {
  return (
    <>
<Routes>
    <Route path='/' element={<Homepage/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/loginhome' element={<Loginhome/>}></Route>
    <Route path = '/setreminder' element={<SetReminderPage/>}> </Route>
    <Route path='/logout' element={<Logout/>}></Route>
    <Route path='/modify' element={<Modify/>}></Route>
</Routes>
    </>
  )
}

export default Allrouters