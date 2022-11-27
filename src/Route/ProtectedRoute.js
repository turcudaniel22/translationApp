import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const userName = localStorage.getItem('user') 
  return userName ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute

