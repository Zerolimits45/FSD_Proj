import { useState, useEffect } from 'react'
import './App.css'
import Home from './Pages/Home'
import MenuIndicator from './Components/Navbar'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Booking from './Pages/Booking'
import { Route, Routes } from 'react-router-dom'
import UserContext from './contexts/UserContext.js';
import http from './http';
import Booking_confirm from './Pages/Booking_confirm'
import RegisterCar from './Pages/RegisterCar'
import Registered_Cars from './Pages/Profile/Registered_Cars'
import Registered_Cars_Edit from './Pages/Profile/Registered_Cars_Edit'
import Bookings from './Pages/Profile/Bookings'
import Rating_Booking from './Pages/Profile/Rating_Booking'
import Account from './Pages/Profile/Account'
import Account_Edit from './Pages/Profile/Account_Edit'
import Password_Edit from './Pages/Profile/Password_Edit'
import ProfileRoutes from './Pages/Profile/ProfileRoutes'
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get('/user/auth').then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking_confirm" element={<Booking_confirm />} />
        <Route path="/register" element={<RegisterCar />} />
        <Route path="/profile/*" element={<ProfileRoutes />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
