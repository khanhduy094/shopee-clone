import classNames from 'classnames'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import categoriesApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useWindowSize from 'src/hooks/useWindowSize'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'

export default function ProductList() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const queryConfig = useQueryConfig()
  const size = useWindowSize()
  const { data: productsData } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })
  const { data: categoriessData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoriesApi.getCategories()
    },
    keepPreviousData: true
  })

  const toggleActiveFilter = () => {
    setIsActive(!isActive)
  }

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Trang chủ | Shopee Clone</title>
        <meta name='description' content='Trang chủ trang ShopeeClone' />
      </Helmet>
      {size < 768 && (
        <div
          aria-hidden='true'
          onClick={toggleActiveFilter}
          className={classNames(
            'fixed top-[35%] left-0 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded border-none bg-orange/[0.85] text-white transition-all duration-[450ms]',
            {
              'translate-x-[280px]': isActive
            }
          )}
        >
          {!isActive ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          )}
        </div>
      )}
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter
                isActive={isActive}
                setIsActive={setIsActive}
                queryConfig={queryConfig}
                categories={categoriessData?.data.data || []}
              />
            </div>
            <div className='col-span-12 md:col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData?.data.data.products.map((product, index) => {
                  return (
                    <div key={product._id} className='col-span-1'>
                      <Product product={product} />
                    </div>
                  )
                })}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
