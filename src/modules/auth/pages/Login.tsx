import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from 'components/Input/Input'
import { AuthTemplate } from 'templates/AuthTemplate'
import { post } from 'utils/helpers'
import { AuthContext } from 'contexts/AuthContext'  
import { useNavigate } from 'react-router-dom'
import { Loader } from 'components/Loader/Loader'

interface LoginForm {
  email: string
  password: string
}

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()
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

  return (
      <AuthTemplate onSubmit={handleSubmit(onSubmit)}>
        {loader && <Loader /> }
        <Input
          name="email"
          register={register}
          validate={{ required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
          label="Email"
          type="email"
          defaultValue="eight@test.com"
          fullWidth
          placeholder="roger.boyle@gmail.com"
          optional={true}
          containerStyle="my-4" />
        {errors.email && <span>This field is required</span>}

        <Input
          name="password"
          register={register}
          validate={{ required: true }}
          label="Password"
          type="password"
          defaultValue="onePiece"
          fullWidth
          optional={true}
          containerStyle="my-4" />
        {errors.password && <span>This field is required</span>}
      </AuthTemplate>
  )
}
