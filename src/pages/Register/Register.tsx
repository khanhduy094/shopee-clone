import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from 'src/utils/rules'
import Input from 'src/components/Input'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12  lg:grid-cols-5 lg:py-32'>
          <div className='col-span-2 lg:col-start-4'>
            <form noValidate className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                name='email'
                placeholder='Email'
                type='email'
                register={register}
                rules={rules.email}
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                placeholder='Password'
                type='password'
                register={register}
                rules={rules.password}
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirm_password'
                placeholder='Confirm Password'
                type='password'
                register={register}
                rules={rules.confirm_password}
                errorMessage={errors.confirm_password?.message}
              />

              <div className='mt-2'>
                <button
                  type='submit'
                  className='text-upper-case w-full bg-red-500 py-4 px-2 text-center text-white hover:text-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-300'>Bạn đã có tài khoản?</span>
                <Link to='/login' className='ml-1 text-red-400'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
