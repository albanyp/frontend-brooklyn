import React from 'react'
import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
  children: React.ReactElement
  isAuthenticated: boolean
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>{children}</>
    ) : (
    <Navigate {...props} to="/auth/login" replace />
  )
}