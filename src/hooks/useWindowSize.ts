import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function useWindowSize() {
  const { isShowSearch, setIsShowSearch } = useContext(AppContext)
  const [size, setSize] = useState<number>(window.innerWidth)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 767) {
        setIsShowSearch(false)
      }
      setSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])
  return size
}
