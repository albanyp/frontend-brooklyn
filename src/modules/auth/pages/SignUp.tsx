import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AuthTemplate } from 'templates/AuthTemplate'
import { Input } from 'components/Input/Input'
import { post } from 'utils/helpers'
import { Loader } from 'components/Loader/Loader'

interface FormData {
  firstName: string
  lastName: string
  birthdate: Date
  nickname: string
  email: string
  password: string
}

export const SignUp = () => {
  const methods = useForm<FormData>()
  const { register, handleSubmit, formState: { errors } } = methods
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)

  const onSubmit = async (data: FormData) => {
    setLoader(true)
    try {
      await post('auth/sign-up', data)
      navigate('/')
    } catch (err) {
      //handle error
      console.log(err)
    }
    setLoader(false)
  }

  return (
    <FormProvider {...methods}>
      <AuthTemplate isSignUp onSubmit={handleSubmit(onSubmit)}>
        {loader && <Loader />}
        <Input
          name="firstName"
          register={register}
          validate={{ required: true, pattern: /^[A-Za-z]+$/i }}
          label="First Name"
          placeholder="Roger"
          fullWidth
          optional={false}
          containerStyle="my-4" />
        {errors.firstName && <span className="self-start m-2 text-red-950">This field is required</span>}

        <Input
          name="lastName"
          register={register}
          validate={{ required: true, pattern: /^[A-Za-z]+$/i }}
          label="Last Name"
          placeholder="Boyle"
          fullWidth
          optional={false}
          containerStyle="my-4" />
        {errors.lastName && <span>{errors.lastName?.message}</span>}


        <Input
          name="email"
          register={register}
          validate={{ required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
          label="Email"
          type="email"
          optional={false}
          fullWidth
          placeholder="roger.boyle@gmail.com"
          containerStyle="my-4" />
        {errors.email && <span>This field is required</span>}

        <Input
          name="birthdate"
          register={register}
          validate={{ required: true }}
          label="Birthdate"
          type="Date"
          fullWidth
          containerStyle="my-4" />
        {errors.birthdate && <span>This field is required</span>}

        <Input
          name="nickname"
          register={register}
          validate={{ required: false, pattern: /^[A-Za-z]+$/i }}
          label="Username"
          fullWidth
          containerStyle="my-4" />

        <Input
          name="password"
          register={register}
          validate={{ required: true }}
          label="Password"
          type="password"
          optional={false}
          fullWidth
          containerStyle="my-4" />
        {errors.password && <span>This field is required</span>}
      </AuthTemplate>
    </FormProvider>
  )
}
