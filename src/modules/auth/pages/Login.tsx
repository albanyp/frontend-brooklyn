import React, { useState, useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Input } from 'components/Input/Input'
import { AuthTemplate } from 'templates/AuthTemplate'
import { post } from 'utils/helpers'
import { AuthContext } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Loader } from 'components/Loader/Loader'
import { Button } from 'components/Button/Button'

interface LoginForm {
  email: string
  password: string
}

export const Login = () => {
  const methods = useForm<LoginForm>()
  const { register, handleSubmit, formState: { errors, isValid } } = methods
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  const onSubmit = async (data: LoginForm) => {
    setLoader(true)
    try {
      const userAuth = await post('auth/login', data)
      login(userAuth)
      navigate('/')
    } catch (err) {
      //handle error
      console.log(err)
    }
    setLoader(false)
  }

  console.log('valid', isValid)

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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors?.email?.message && <span>This field is required</span>}
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
            {errors?.password?.message && <span>This field is required</span>}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm leading-6">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
        </div>

        <Button
          type="button"
          value={"Log in"}
          fullWidth
          primary
          disabled={isValid}
          classNames="px-3 py-3 my-4 font-semibold"
          onClick={onSubmit} />
        {errors.password && <span>This field is required</span>}
      </AuthTemplate>
    </FormProvider>
  )
}
