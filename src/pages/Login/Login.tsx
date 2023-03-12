import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { SchemaType, schema } from 'src/utils/rules'

type FormData = Omit<SchemaType, 'confirm_password'>
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    // const { confirm_password, ...body } = data
    // registerMutation.mutate(body, {
    //   onSuccess: (data) => {
    //     console.log(data)
    //   },
    //   onError: (error) => {
    //     if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
    //       const formError = error.response?.data.data
    //       if (formError) {
    //         Object.keys(formError).forEach((key) => {
    //           setError(key as keyof Omit<FormData, 'confirm_password'>, {
    //             message: formError[key as keyof Omit<FormData, 'confirm_password'>],
    //             type: 'Server'
    //           })
    //         })
    //       }
    //     }
    //   }
    // })
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
                <button
                  type='submit'
                  className='text-upper-case w-full bg-red-500 py-4 px-2 text-center text-white hover:text-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-300'>Bạn chưa có tài khoản?</span>
                <Link to='/register' className='ml-1 text-red-400'>
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
