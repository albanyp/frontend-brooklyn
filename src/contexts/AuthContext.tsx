import { createContext, Dispatch, SetStateAction } from 'react'

interface AuthContextProps {
  auth: any
  setAuth: Dispatch<SetStateAction<null>>
  login: (auth: any) => void
}

export const AuthContext = createContext<AuthContextProps>({
  auth: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  setAuth: () => {},
  login: () => {}
})
