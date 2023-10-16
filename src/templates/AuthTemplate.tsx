import React, { ReactNode } from 'react'
import { Button } from 'components/Button/Button'

interface AuthTemplateProps {
  isSignUp?: boolean
  children: ReactNode
  onSubmit: any
}

export const AuthTemplate: React.FC<AuthTemplateProps> = (props: AuthTemplateProps) => {

  return (
    <div className="flex">
      <div className="bg-gradient-to-r from-neutral-900 to-yellow-500 md:w-1/4 lg:w-1/2 h-screen sm:hidden md:block"></div>
      <div className="bg-white flex flex-col justify-center items-center py-6 px-12 w-full md:w-3/4 lg:w-1/2">
        <h3>Welcome!</h3>
        <p>Whatever you want, whenever you want</p>
        <form className="flex flex-col items-center justify-center w-full sm:w-full lg:w-4/5">
          <div className="w-full max-w-lg">
          {props.children}
          <Button
            type="button"
            value={props.isSignUp ? "Sign Up!" : "Log in"}
            fullWidth
            classNames="px-3 py-3 my-4 font-semibold"
            onClick={props.onSubmit} />
          </div>
        </form>
      </div>
    </div>
  )
}