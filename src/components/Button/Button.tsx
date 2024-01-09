import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  fullWidth?: boolean
}

export const Button = ({ variant = 'primary', fullWidth, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx('gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      {
        'w-full': fullWidth,
        'bg-indigo-600': variant === 'primary',
        'bg-indigo-700': variant === 'secondary',
        'bg-indigo-900': variant === 'tertiary',
        'hover:bg-indigo-600/80': variant === 'primary',
        'hover:bg-indigo-700/80': variant === 'secondary',
        'hover:bg-indigo-900/80': variant === 'tertiary',
        'bg-indigo-400': props.disabled
      },
      className
    )}
      {...props}
    >
      {props.value}
    </button>
  )
}