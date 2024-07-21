import { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser } from "@/src/lib/appwrite"

const GlobalContext = createContext()

export const useGlobalContext = () => {
   return useContext(GlobalContext)
}

const GlobalProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [user, setUser] = useState(null)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      getCurrentUser()
         .then((currentUser) => {
            if (currentUser) {
               setIsLoggedIn(true)
               setUser(currentUser)
            } else {
               setIsLoggedIn(false)
               setUser(null)
            }
         })
         .catch((error) => {
            console.error(error)
         })
         .finally(() => {
            setIsLoading(false)
         })
   }, [])

   return (
      <GlobalContext.Provider
         value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
         }}
      >
         {children}
      </GlobalContext.Provider>
   )
}

export default GlobalProvider
