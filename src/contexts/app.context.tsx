import { createContext, useState } from 'react'
import { ExtendedPurchases } from 'src/types/purchases.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
  reset: () => void
  isShowSearch: boolean
  setIsShowSearch: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  reset: () => null,
  isShowSearch: false,
  setIsShowSearch: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [isShowSearch, setIsShowSearch] = useState<boolean>(initialAppContext.isShowSearch)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>(initialAppContext.extendedPurchases)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const reset = () => {
    setIsAuthenticated(false)
    setExtendedPurchases([])
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset,
        isShowSearch,
        setIsShowSearch
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
