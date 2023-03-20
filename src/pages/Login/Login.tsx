import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { schema, SchemaType } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<SchemaType, 'email' | 'password'>
const loginSchema = schema.omit(['confirm_password', 'name'])
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setProfile(data.data.data.user)
        setIsAuthenticated(true)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
            <form className='rounded bg-white p-10 shadow-sm' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                className='mt-3'
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-3'
                name='password'
                placeholder='Password'
                type='password'
                autoComplete='on'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='text-upper-case flex w-full items-center justify-center bg-red-500 py-4 px-2 text-center text-white hover:text-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-300'>Bạn chưa có tài khoản?</span>
                <Link to={path.register} className='ml-1 text-red-400'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
