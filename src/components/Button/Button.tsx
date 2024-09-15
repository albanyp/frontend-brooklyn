import React, { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Loader } from 'components/Loader/Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  fullWidth?: boolean
  loading?: boolean
}

export const Button = ({ variant = 'primary', fullWidth, className, loading = false, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx('gap-x-2 border rounded-md px-3.5 py-2.5 text-sm flex justify-center items-center font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 focus-visible:text-white',
      {
        'w-full': fullWidth,
        'bg-violet-600': variant === 'primary',
        'bg-white': variant === 'secondary',
        'bg-violet-900': variant === 'tertiary',
        'hover:bg-violet-600/80': variant === 'primary',
        'hover:bg-violet-700/80': variant === 'secondary',
        'hover:bg-violet-900/80': variant === 'tertiary',
        'text-white': variant === 'primary' || variant === 'tertiary',
        'text-violet-600': variant === 'secondary',
        'border-violet-700': variant === 'secondary',
        'hover:text-white': variant === 'secondary',
        'bg-violet-400': props.disabled
      },
      className
    )}
      {...props}
    >
      {props.value}
      {loading ? <Loader width="w-5" height="h-5" /> : undefined}
    </button>
  )
}