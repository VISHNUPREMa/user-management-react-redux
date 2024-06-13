import { useState } from 'react'
import {BrowserRouter as Router  , Routes,Route} from 'react-router-dom'

import Signup from './COMPONENTS/signup'

import Login from './COMPONENTS/login'
import UserCard from './COMPONENTS/userCard'
import AdminLogin from './COMPONENTS/adminLogin'
import AdminHome from './COMPONENTS/adminHome'
import IsUser from './COMPONENTS/AUTH/isUser'
import HaveToken from './COMPONENTS/AUTH/haveToken'


function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HaveToken><Login/></HaveToken>}/>
        <Route path='/signup' element={<Signup/>} />
       
        <Route path='/userhome' element={<IsUser><UserCard/></IsUser>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
