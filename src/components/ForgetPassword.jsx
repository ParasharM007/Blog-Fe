import React, { useContext, useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useMutation } from '@tanstack/react-query'




function ForgetPassword() {
  const [Email, setEmail] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const mutation = useMutation({
    mutationFn: async ({ Email }) => {
       try {
        //  const res= await axios.post(`http://localhost:5000/api/v1/users/forget-password`,
           return await axios.post(`${API_BASE_URL}/v1/users/forget-password`,
       
         {
           email:Email
         },
         
       );
       
       } catch (error) {
        console.log(error)
        throw Error
        
       }
    }
  })


  const handleForgetPassword = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    mutation.mutate({ Email },
      {
        onSuccess: () => {
          toast.success("Please check your email to reset password!")
          setEmail('')


        },
        onError: (error) => {

          toast.error("Something went wrong!")
          
          console.log('Error : ', error);

        },
        
        
      }


    )


  };





return (
  <>
    <div className="min-h-[90vh] bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">
         Forget Password 
        </h1>
        <form onSubmit={handleForgetPassword} className="space-y-5">

          <div className="relative">
            <div className='text-md font-semibold text-gray-800 my-2 p-1 rounded-xl '>Email:-</div>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
            />
          </div>

          <button  
            type="submit"
            className="w-full bg-black hover:bg-purple-800 text-white text-sm font-medium py-3 rounded-xl transition-all duration-300"
          >
            {!mutation.isPending ? "Submit" : "Submitting..."}
          </button>
        </form>
      </div>
    </div>
  </>
);

}
// }
export default ForgetPassword