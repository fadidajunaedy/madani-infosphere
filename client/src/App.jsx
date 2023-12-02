import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
// import { checkAuthentication } from './services/AuthServices'
import { themeChange } from "theme-change"
import "./App.css"
import AOS from 'aos'
import 'aos/dist/aos.css'

import DefaultLayout from "./containers/DefaultLayout"
import Register from "./pages/Authentication/Register"
import Login from "./pages/Authentication/Login"
import Verification from "./pages/Authentication/Verification"
import ForgotPassword from "./pages/Authentication/ForgotPassword"
import ResetPassword from "./pages/Authentication/ResetPassword"

function App() {
  useEffect(() => {
    themeChange(false)
    AOS.init({
      duration: 1000
    });
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:id/:verificationToken" element={<Verification />} />
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
