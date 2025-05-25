import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function AuthContextProvider({children}) {
    
    const [isLoggedIn, setIsLoggedIn ]= useState(false)
    const [ loading, setLoading ] =useState(true)
    

    useEffect(()=>{
      (async()=>{

          try {
              const res= await axios.get(`${API_BASE_URL}/v1/users/auth-route`,
                {
                    withCredentials:true
                }
            )
            console.log(res.data?.data?.data)
            setIsLoggedIn(res.data?.data?.data)
            
        } catch (error) {
            console.log("User not logged in")
        }
        finally{
          setLoading(false)
        }
        })()
    },[])
    
    
  return (
    <AuthContext.Provider value={{ isLoggedIn , setIsLoggedIn , loading }}>
     {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }