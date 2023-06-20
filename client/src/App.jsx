import { useState } from 'react'

import './App.css'
import Home from './Pages/Home'
import MenuIndicator from './Components/Navbar'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Login />
    </>
  )
}

export default App
