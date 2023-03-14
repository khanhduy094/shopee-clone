import React from 'react'
import { useQuery } from 'react-query'
import productApi from 'src/apis/product.api'
import { useQueryParams } from 'src/hooks/useQueryParams'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProduct(queryParams)
    }
  })
  // console.log(data?.data.data.products)
  // console.log(queryParams)

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data?.data.data.products.map((product, index) => {
                console.log(product)

                return (
                  <div key={product._id} className='col-span-1'>
                    <Product product={product} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
