import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { registerAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { schema, SchemaType } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = SchemaType

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const { confirm_password, ...body } = data
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
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
                errorMessage={errors.email?.message}
              />
              <Input
                name='password'
                placeholder='Password'
                type='password'
                register={register}
                autoComplete='on'
                errorMessage={errors.password?.message}
              />
              <Input
                name='confirm_password'
                placeholder='Confirm Password'
                type='password'
                autoComplete='on'
                register={register}
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
