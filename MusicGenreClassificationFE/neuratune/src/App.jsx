import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homef from './components/Homef'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import MusicClass from './components/MusicClass'
import Theme from './components/Theme'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Homef/>} path='/home'/>
        <Route element={<MusicClass/>} path='/classify'/>
        <Route element={<Theme/>} path="/topthemes"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<Register/>} path="/register"/>
      </Routes>
      </BrowserRouter>
    
  )
}

export default App
