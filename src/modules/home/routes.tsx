import React, { useContext } from 'react'
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { PrivateRoute } from "components/PrivateRoute/PrivateRoute"
import { AuthContext } from 'contexts/AuthContext'

export const HomeModule = () => {
  const { auth } = useContext(AuthContext)
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute isAuthenticated={auth}>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
