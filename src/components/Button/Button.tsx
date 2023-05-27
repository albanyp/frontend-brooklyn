import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset'
  value: string
  onClick?: any
  classNames?: string
  disabled?: boolean
  fullWidth?: boolean
}

export const Button = (props: ButtonProps) => {
  const buttonClasses = clsx('bg-gradient-to-r', 'from-yellow-300', 'to-yellow-600', 'rounded-md',
    {
      'w-full': props.fullWidth
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