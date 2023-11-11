import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset'
  value: string
  primary?: boolean
  secondary?: boolean
  terciary?: boolean
  onClick?: any
  classNames?: string
  disabled?: boolean
  fullWidth?: boolean
}

export const Button = (props: ButtonProps) => {
  const buttonClasses = clsx('gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    {
      'w-full': props.fullWidth,
      'bg-indigo-600': props.primary,
      'bg-indigo-900': props.secondary,
      'bg-slate-300': props.terciary
    },
    props.classNames
  )

  return (
    <button
      type={props.type}
      value={props.value}
      disabled={props.disabled}
      className={buttonClasses}
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}