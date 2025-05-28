import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function AuthContextProvider({children}) {
    
    const [isLoggedIn, setIsLoggedIn ]= useState(false)
    const [ loading, setLoading ] =useState(true)
    const [AdminLogin , setAdminLogin] =useState(false)
    

    useEffect(()=>{
      (async()=>{

          try {
              const res= await axios.get(`${API_BASE_URL}/v1/users/auth-route`,
                {
                    withCredentials:true
                }
            )
            console.log(res.data?.data)
            if(res.data?.data==='admin')
              setAdminLogin(true)
            
            setIsLoggedIn(true)

            
        } catch (error) {
            console.log("User not logged in")
        }
        finally{
          setLoading(false)
        }
        })()
    },[])
    
    
  return (
    <AuthContext.Provider value={{ isLoggedIn , setIsLoggedIn , loading , AdminLogin , setAdminLogin }}>
     {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }