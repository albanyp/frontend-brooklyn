import { Routes, Route } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"

const AuthModule = () => {
  return (
    <Routes>
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  )
}


export default AuthModule