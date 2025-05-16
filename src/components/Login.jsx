import React, { useContext, useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useMutation } from '@tanstack/react-query'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { UserContext } from '../UserContext.jsx'


function Login() {
  const [Email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword ,setShowPassword] = useState(false)
  // const {isLoggedIn , setLoggedIn} = useContext(UserContext)
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      // return await axios.post(`http://localhost:5000/api/v1/users/login`,
      return await axios.post(`${API_BASE_URL}/v1/users/login`,
      
        {
          email,
          password
        },
        {
          withCredentials: true,
        },
        
      );
    }
  })


  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    mutation.mutate({ email: Email, password: password },
      {
        onSuccess: (res) => {

          console.log("Calling toast success");
          toast.success("Login Successful")
          // setLoggedIn(true)   //CONTEXT API
          const id = res.data.data.user._id
          console.log(
            id
          )

          if (id) localStorage.setItem('userId', id);
          console.log('User Logged in successfully!!');
          setTimeout(() => {
            navigate(`/profile/${id}`);
          }, 2000);


        },
        onError: (error) => {

          toast.error("Invalid credentials or user does not exist!")
          
          console.log('Error while logging in: ', error);

        },
        
        
      }


    )


  };



  return (<>

    <div className='login-cont'>
      <div className='m-3 mt-7 p-5  md:h-120 md:w-120 bg-gray-300 flex flex-col items-center justify-center'>

        <h1 className='text-black  p-2 m-2 text-[23px] md:text-4xl '>Login to WildEarth</h1>
        <form onSubmit={handleLogin}
              className='flex flex-col items-center'
        >

          <input type="text"
            required={true}
            placeholder='Enter your email'
            className='m-2 p-2 text-lg bg-white rounded-md outline-none'
            onChange={(e) => setEmail(e.target.value)}
          />
<div>

          <input type={showPassword?('text'):('password')}
            required={true}
            placeholder='Enter password '
            className='m-2 p-2 text-lg bg-white rounded-md outline-none relative'
            onChange={(e) => setPassword(e.target.value)}
            />
           <div 
      className="relative z-20 left-50 bottom-7 transform -translate-y-1/2 cursor-pointer text-gray-600"
      onClick={() => setShowPassword(prev => !prev)}
      >
      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
    </div>
      </div>
          <button type="submit" className='m-2 p-2 w-40 cursor-pointer bg-black text-white text-lg hover:bg-purple-800   rounded-md outline-none'>{!mutation.isPending?"Login":"Logging in..."}</button>
        </form>
      </div>
    </div>
  </>
  )
}
// }
export default Login