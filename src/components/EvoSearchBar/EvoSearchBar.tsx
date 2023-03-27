import classNames from 'classnames'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import useSearchProducts from 'src/hooks/useSearchProducts'
import SearchIcon from '../SearchIcon'

export default function EvoSearchBar() {
  const { isShowSearch, setIsShowSearch } = useContext(AppContext)
  const { onSubmitSearch, register } = useSearchProducts()
  const handleSearch = () => {
    onSubmitSearch()
    setIsShowSearch(false)
  }
  return (
    <div
      className={classNames(
        'relative z-[999] flex items-center justify-center overflow-hidden bg-white transition-all duration-200',
        {
          'h-[70px] overflow-visible': isShowSearch,
          'h-0': !isShowSearch
        }
      )}
    >
      <div className='flex'>
        <form onSubmit={handleSearch}>
          <input {...register('name')} type='text' className='outline-0' placeholder='Bạn cần tìm gì hôm nay?' />
          <button>
            <SearchIcon />
          </button>
          <svg
            onClick={() => setIsShowSearch(false)}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='absolute right-5 top-[50%]  h-6 w-6 translate-y-[-50%] cursor-pointer'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </form>
      </div>
    </div>
  )
}
