import * as React from 'react';
import { InputHTMLAttributes  } from 'react'
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any
  validate?: any
  label: string
  icon?: string
  containerStyle?: string
  inputStyle?: string
  fullWidth?: boolean
}

export const Input = ({ register, validate, label, icon, containerStyle, inputStyle, fullWidth = true, ...props }: InputProps) => {
  const inputClassNames = clsx('rounded-md', 'px-3', 'py-2', 'border-solid', 'border-2', 'border-slate-300', 'mt-1', 'bg-slate-50',
    {
      'w-full': fullWidth
    },
    inputStyle
  )

  const containerClassNames = clsx('flex', 'flex-col', 'font-sans',
    {
      'w-full': fullWidth
    },
    containerStyle
  )

  return (
    <div className={containerClassNames}>
      <label htmlFor={label} className="items-start"> {label} </label>
      <input 
        {...register(props.name, validate)}
        type={props.type ? props.type : "text"} 
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        className={inputClassNames} />
    </div>
  )
}
