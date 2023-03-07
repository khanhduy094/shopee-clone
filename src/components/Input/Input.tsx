import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  register: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  errorMessage?: string
  autoComplete?: string
}

export default function Input({
  className = 'mt-2',
  type,
  placeholder,
  register,
  autoComplete,
  name,
  rules,
  errorMessage
}: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
        autoComplete={autoComplete}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
