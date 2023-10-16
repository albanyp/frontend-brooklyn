import * as React from 'react';
import { InputHTMLAttributes } from 'react'
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any
  optional?: boolean
  validate?: any
  label: string
  icon?: string
  inputStyle?: string
  inputContainerStyle?: string
  containerStyle?: string
  optionalStyle?: string
  labelStyle?: string
  fullWidth?: boolean
}

export const Input = ({ register, optional = true, validate, label, icon, inputContainerStyle, containerStyle, inputStyle, labelStyle, optionalStyle, fullWidth = true, ...props }: InputProps) => {
  const inputContainerClassNames = clsx('flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md',
    {
      'w-full': fullWidth
    },
    inputContainerStyle
  )

  const inputClassNames = clsx('block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
    {
      'w-full': fullWidth
    },
    inputStyle
  )

  const containerClassNames = clsx('flex flex-col sm:max-w-md',
    {
      'w-full': fullWidth
    },
    containerStyle
  )

  const optionalClassNames = clsx('text-sm leading-6 text-gray-500', optionalStyle)

  const labelClassNames = clsx('text-sm font-medium leading-6 text-gray-900 py-1.5',
    {
      'text-indigo-600': props.type === 'file', 'font-semibold': props.type === 'file'
    },
    labelStyle
  )

  return (
    <div className={containerClassNames}>
      <div className="flex justify-between items-center">
        <label htmlFor={label} className={labelClassNames}>{label}</label>
        {optional &&
          <span className={optionalClassNames}>
            Optional
          </span>}
      </div>
      <div className={inputContainerClassNames}>
        <input
          {...register(props.name, validate)}
          type={props.type ? props.type : "text"}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          className={inputClassNames} />
      </div>
    </div>
  )
}
