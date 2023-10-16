import { PrivateRoute } from "components/PrivateRoute/PrivateRoute"
import { AuthContext } from "contexts/AuthContext"
import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { CreateMedia } from "./pages/CreateMedia"

export const MediaModule = () => {
  const { auth } = useContext(AuthContext)

  return (
    <Routes>
      <Route
        path="/movies/create" 
        element={
          <PrivateRoute isAuthenticated={auth}>
            <CreateMedia />
          </PrivateRoute>          
        }
      />
    </Routes>
  )
}