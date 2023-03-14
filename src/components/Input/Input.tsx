import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  className = 'mt-2',
  type,
  placeholder,
  register,
  autoComplete,
  rules,
  name,
  errorMessage,
  classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        {...registerResult}
        autoComplete={autoComplete}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
