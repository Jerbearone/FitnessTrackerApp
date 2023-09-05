import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainNavbar from './components/MainNavbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/Home'
import RoutinesContainer from './components/Routines/RoutinesContainer'
import ActivitiesContainer from './components/ActivitiesComponents/ActivitiesContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainNavbar></MainNavbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/routines' element={<RoutinesContainer></RoutinesContainer>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/activities' element={<ActivitiesContainer></ActivitiesContainer>}></Route>
      </Routes>

    </>
  )
}

export default App
