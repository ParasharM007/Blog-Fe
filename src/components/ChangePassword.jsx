import React, { useContext, useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useMutation } from '@tanstack/react-query'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../utils/AuthContext'



function ChangePassword() {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [showNewPassword ,setShowNewPassword] = useState(false)
  const [showOldPassword ,setShowOldPassword] = useState(false)
  const { AdminLogin } = useContext(AuthContext)

  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  


  const mutation = useMutation({
    mutationFn: async ({ oldPass, newPass }) => {
        // return await axios.post(`http://localhost:5000/api/v1/users/change-password`,
          return await axios.post(`${API_BASE_URL}/v1/users/change-password`,
      
        {
          oldPassword:oldPass,
          newPassword:newPass
        },
        {
          withCredentials: true,
        },
        
      );
    }
  })


  const handleChangePassword = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    mutation.mutate({ oldPass, newPass },
      {
        onSuccess: (res) => {
          toast.success("Password changed Successful")
          
          setOldPass('')
          setNewPass('')


        },
        onError: (error) => {

          toast.error("Something went wrong!")
          
          console.log('Error while changing passw. : ', error);

        },
        
        
      }


    )


  };





return (
  <>
    <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">
         {AdminLogin?"Change Admin Password":"Change Password"} 
        </h1>
        <form onSubmit={handleChangePassword} className="space-y-5">
          <div className="relative">
            <div className='text-md font-semibold text-gray-800 my-2 p-1 rounded-xl '>Old Password:-</div>
            <input
              type={showOldPassword?'text':'password'}
              required
              placeholder="Enter old password"
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              onChange={(e) => setOldPass(e.target.value)}
            />
             <div
              className="absolute right-3 top-15 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setShowOldPassword((prev) => !prev)}
            >
              {showOldPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          <div className="relative">
            <div className='text-md font-semibold text-gray-800 my-2 p-1 rounded-xl '>New Password:-</div>
            <input
              type={showNewPassword ? 'text' : 'password'}
              required
              placeholder="Enter new password"
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-10"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <div
              className="absolute right-3 top-15 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          <button  
            type="submit"
            className="w-full bg-black hover:bg-purple-800 text-white text-sm font-medium py-3 rounded-xl transition-all duration-300"
          >
            {!mutation.isPending ? "Submit" : "Changing password..."}
          </button>
        </form>
      </div>
    </div>
  </>
);

}
// }
export default ChangePassword