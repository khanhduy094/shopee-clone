import { UseFormGetValues, type RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email không được để trống'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Email có độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Email có độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Password có độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Password có độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu phải từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu phải từ 6 - 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => getValues('password') === value || 'Nhập lại password không khớp'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email không được để trống')
    .min(5, 'Độ dài email từ 5 - 160 ký tự ')
    .max(160, 'Độ dài email từ 5 - 160 ký tự')
    .email('Email không đúng định dạng'),
  password: yup
    .string()
    .required('Password không được để trống')
    .min(6, 'Độ dài password từ 6 - 160 ký tự ')
    .max(160, 'Độ dài Password từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password không được để trống')
    .min(6, 'Độ dài confirm password từ 6 - 160 ký tự ')
    .max(160, 'Độ dài confirm password từ 6 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const priceSchema = yup.object({
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

export type SchemaType = yup.InferType<typeof schema>
export type PriceSchemaType = yup.InferType<typeof priceSchema>
