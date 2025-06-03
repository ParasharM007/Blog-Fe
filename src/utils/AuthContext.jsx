import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function AuthContextProvider({children}) {
    
    const [isLoggedIn, setIsLoggedIn ]= useState(false)
    const [ loading, setLoading ] =useState(true)
    const [AdminLogin , setAdminLogin] =useState(false)
    const [avatar, setAvatar]=useState(null)
    const [searchBlogs, setSearchBlogs]=useState([])
    

    useEffect(()=>{
      (async()=>{

          try {
              const res= await axios.get(`${API_BASE_URL}/v1/users/auth-route`,
              // const res= await axios.get(`http://localhost:5000/api/v1/users/auth-route`,
                {
                    withCredentials:true
                }
            )
            console.log(res.data?.data?.role)
            

            if(res.data?.data?.role==='admin')
              setAdminLogin(true)
            if(res.data?.data?.avatar)
              setAvatar(res.data?.data?.avatar)
            
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
    <AuthContext.Provider value={{ isLoggedIn , setIsLoggedIn , loading , AdminLogin , setAdminLogin ,avatar ,setAvatar ,  searchBlogs, setSearchBlogs }}>
     {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }