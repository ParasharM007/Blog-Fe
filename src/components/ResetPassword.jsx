import React, { useContext, useState } from 'react'
import "./Login.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useMutation } from '@tanstack/react-query'
import { FaEye, FaEyeSlash } from 'react-icons/fa';




function ResetPassword() {
  const [newPass, setNewPass] = useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [showNewPassword ,setShowNewPassword] = useState(false)
  const [showConfirmPassword ,setShowConfirmPassword] = useState(false)
  const { token }=useParams();

  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const mutation = useMutation({
    mutationFn: async ({  newPass }) => {
        // return await axios.post(`http://localhost:5000/api/v1/users/reset-password/${token}`,
          return await axios.post(`${API_BASE_URL}/v1/users/reset-password/${token}`,
      
        {
          newPassword:newPass
        },
        
      );
    }
  })


  const handleResetPassword = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if(confirmPassword!==newPass){
        toast.error("Password mismatch")
    }
  else{

      mutation.mutate({ newPass },
        {
            onSuccess: () => {
                toast.success("Password reset successfully")
                setNewPass('')
                setConfirmPassword('')
                setTimeout(()=>{
                    navigate('/login')
                },1000)
                
            },
            onError: (error) => {
                
                toast.error("Something went wrong or session expired!")
                
                console.log('Error while reseting in: ', error);
                
            },
            
            
        }
        
        
    )
}


  };





return (
  <>
    <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">
         Reset Password
        </h1>
        <form onSubmit={handleResetPassword} className="space-y-5">

           <div className="relative">
                     <div className='text-md font-semibold text-gray-800 my-2 p-1 rounded-xl '>New Password:-</div>
                     <input
                       type={showNewPassword?'text':'password'}
                       required
                       placeholder="Enter password"
                       className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                       onChange={(e) => setNewPass(e.target.value)}
                       />
                      <div
                       className="absolute right-3 top-15 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                       onClick={() => setShowNewPassword((prev) => !prev)}
                       >
                         {showNewPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                     </div>
                   </div>
         
                   <div className="relative">
                     <div className='text-md font-semibold text-gray-800 my-2 p-1 rounded-xl '>Confirm Password:-</div>
                     <input
                       type={showConfirmPassword ? 'text' : 'password'}
                       required
                       placeholder="Enter password"
                       className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-10"
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       />
                     <div
                       className="absolute right-3 top-15 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                       onClick={() => setShowConfirmPassword((prev) => !prev)}
                       >
                         {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                     </div>
                   </div>

          <button  
            type="submit"
            className="w-full bg-black hover:bg-purple-800 text-white text-sm font-medium py-3 rounded-xl transition-all duration-300"
          >
            {!mutation.isPending ? "Reset" : "Reseting password..."}
          </button>
        </form>
      </div>
    </div>
  </>
);

}
// }
export default ResetPassword