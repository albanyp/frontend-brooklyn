import React, { useState, useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Input } from 'components/Input/Input'
import { AuthTemplate } from 'templates/AuthTemplate'
import { post } from 'utils/helpers'
import { AuthContext } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'components/Loader/Loader'
import { Button } from 'components/Button/Button'
import Brooklyn from 'brooklyn'

interface LoginForm {
  email: string
  password: string
  rememberMe?: boolean
}

export const Login = () => {
  const methods = useForm<LoginForm>()
  const { register, handleSubmit, formState: { errors, isValid } } = methods
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loader, setLoader] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const token = JSON.parse(localStorage.getItem('auth'))

  useEffect(() => {
    if(token) navigate('/', { replace: true})
  }, [])

  const handleForgotPassword = () => {}

  const onSubmit = async (form: LoginForm) => {
    setLoader(true)
    form.rememberMe = rememberMe
    try {
      const userAuth = await post('auth/login', form)
      login(userAuth)
      navigate('/', { replace: true})
    } catch (err) {
      // handle error
      console.log(err)
    }
    setLoader(false)
  }

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  return (
    <FormProvider {...methods}>
      <AuthTemplate isValid={isValid} onSubmit={handleSubmit(onSubmit)}>
        {loader && <Loader />}
        <div>
          <div className="mt-2">
            <Input
              label="Email"
              register={register}
              name="email"
              type="email"
              autoComplete="email"
              defaultValue="eight@test.com"
              optional={false}
              validate={{required: true}}
              className="text-white block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors?.email && <span className="text-xs text-red-500">Please enter a valid email address</span>}
          </div>
        </div>

        <div>
          <div className="mt-2">
            <Input
              label="Password"
              register={register}
              name="password"
              type="password"
              autoComplete="current-password"
              defaultValue="onePiece"
              optional={false}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors?.password && <span className="text-xs text-red-500">This field is required</span>}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMe}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
              Remember me
            </label>
          </div>

          {/* TODO */}
          {/* <div className="text-sm leading-6">
            <a href="#" onClick={handleForgotPassword} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div> */}
        </div>

        <Button
          type="submit"
          value="Log in"
          variant='secondary'
          fullWidth
          disabled={!isValid}
          className="px-3 py-3 my-4 font-semibold"
        />
      </AuthTemplate>
    </FormProvider>
  )
}
