import { PrivateRoute } from "components/PrivateRoute/PrivateRoute"
import { AuthContext } from "contexts/AuthContext"
import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { CreateMedia } from "./pages/CreateMedia"
import { DeleteMedia } from "./pages/DeleteMedia"

export const MediaModule = () => {
  const { auth } = useContext(AuthContext)
  
  return (
    <Routes>
      <Route
        path="/media/create"
        element={
          <PrivateRoute isAuthenticated={auth}>
            <CreateMedia />
          </PrivateRoute>
        }
      />
      <Route
        path="/media/:id"
        element={
          <PrivateRoute isAuthenticated={auth}>
            <CreateMedia />
          </PrivateRoute>
        }
      />
      <Route
        path="media/:id" 
        element={
          <PrivateRoute isAuthenticated={auth}>
            <DeleteMedia />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}