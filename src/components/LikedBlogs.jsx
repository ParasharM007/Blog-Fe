import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import loadinggif from '../assets/loading-gif.gif'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api_Interceptor';
import { AuthContext } from '../utils/AuthContext';
import { AiFillDislike } from 'react-icons/ai';
import { useLikeBlog } from '../utils/LikeHook';
function LikedBlogs() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userId = localStorage.getItem("userId")
  const [loading, setLoading] = useState(false)
  const { isLoggedIn }= useContext(AuthContext)
  // const [isError, setError] = useState()
  // const [isLoading, setIsLoading] = useState(false)
  // const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   (
  //     async () => {
  //           console.log("just before api call")
  //       try {
  //         setLoading(true)

  //         const res = await api.get(`/v1/users/auth-route`,
  //           //  const res = await axios.get(`http://localhost:5000/api/v1/users/auth-route`, 
  //           {
  //             withCredentials: true,
  //              validateStatus: function (status) {
  //           return status >= 200 && status < 300; 
  //         },
             
  //           }
  //         )
        
  //         console.log("just after api call "+res)
  //         console.log(res.data.data.data)
  //         const isUserLoggedIn = res.data?.data?.data
  //         setIsLoggedIn(!!isUserLoggedIn)
  //         // setLoading(false)



  //       } catch (error) {
  //         console.log("We are in catch block")
  //       if(error.response?.status===401){
  //         toast.error("Please Login to proceed")
  //          console.log("Auth route failed with 401")
  //       }else{
  //          toast.error("Something went wrong")
  //         console.log("Error occurred in auth-route"+error)
  //       }
  //         setIsLoggedIn(false)
  //         // setLoading(false)


  //       }
  //       finally{
  //         console.log("Loading set to false")
  //         setLoading(false)
  //       }

  //     }
  //   )()
  // }, [userId])
  

 const handleNavigate=(id)=>{
  navigate(`/blog/${id}`)
 }

  const fetchLikedBlogs = async () => {
    try {
      
      // const res = await axios.get(`http://localhost:5000/api/v1/users/all-liked-blogs`,
      // const res = await axios.get(`${API_BASE_URL}/v1/users/all-liked-blogs`,
      const res = await api.get(`/v1/users/all-liked-blogs`,
        {
          withCredentials: true,
          validateStatus: function (status) {
            return status >= 200 && status < 300; 
          },
        }
      )

      const blogs = res.data?.data
      if (blogs.length === 0 || blogs.length > 0) {

        console.log(blogs)
        return blogs
      }
    }

    catch (error) {
      
      toast.error("Error while fetching liked blogs")
    }
  }
  
  const { data:blogs , isLoading , isError , refetch }= useQuery({
      queryKey:["likedBlogs"],
      queryFn: fetchLikedBlogs,
      enabled:isLoggedIn

  })
  const { mutate: likeBlogMutate, isPending, isSuccess } = useLikeBlog();



  // const dislikeMutation = useMutation({
  //   mutationFn: async (id) => {
  //     try {
  //       // const res = await axios.post(`${API_BASE_URL}/v1/users/dislike-blog`,{},
  //       const res = await api.post(`/v1/users/dislike-blog`,
  //         {
  //           id
  //         },
  //         {
  //           withCredentials: true
  //         })
  //       if (!res.data?.success) {
  //         throw new Error('Dislike failed');
  //       }
  //       return res.data
  //     } catch (error) {
  //       throw error;

  //     }

  //   }

  // })
  const handleDislikeBlog = (e, blogId) => {

     e.stopPropagation()

   likeBlogMutate({ id: blogId, status: false },{
         onSuccess:()=>{
           toast.success("Blog removed from liked list")
           refetch();
         },
         onError:(error)=>{
           toast.error(
         error?.response?.status === 401
           ? "Please login first to unlike"
           : "Something went wrong"
           )
         }}
     )

  }

  return (
    <>
      {
        loading ? (
           <div className="flex justify-center items-center h-[90vh]">
            <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
          </div>  
          // <h1>Checking if you are logged in or not... </h1>
        ) :
          !isLoggedIn ? (
            <h1 className='font-light flex flex-col items-center text-center m-5 p-5 text-4xl md:text-5xl'>
              Please login first to see liked blogs
            </h1>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
            </div>
          ) : (
            <>
              {isError && (
                <h1 className='font-light flex flex-col items-center text-center m-5 p-5 text-4xl md:text-5xl'>
                  Error while loading liked blogs...
                </h1>
              )}

              {blogs?.length === 0 ? (
                <div className='flex flex-col gap-3 items-center justify-center'>
                  <h1 className='font-light text-center m-3 p-5 text-4xl md:text-5xl'>
                    Please explore blogs and like first...
                  </h1>
                  <Link to="/blogs">
                    <button className="bg-[#D95D39] hover:bg-[#b34b2e] transition px-6 py-3 rounded-lg font-medium cursor-pointer">
                      Explore Blogs
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4  gap-6 p-4">
                  {blogs.map((item) => (
                    <div
                    key={item?._id}
                    onClick={()=>handleNavigate(item?._id)}
                      className="relative group mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-md bg-white transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      >
                      <img
                        src={item.blogImg}
                        alt="Blog Thumbnail"
                        className="w-full object-cover h-auto rounded-t-3xl"
                      />

                     <button
  className="absolute top-2 right-2 z-10 cursor-pointer flex items-center gap-2 bg-white/80 text-red-600 hover:text-white hover:bg-red-600 transition-all px-3 py-1 rounded-full shadow-sm backdrop-blur-sm
  lg:opacity-0 lg:group-hover:opacity-100"
  onClick={(e) => handleDislikeBlog(e, item?._id)}
  title="Unlike"
>
  <AiFillDislike className="w-4 h-4" />
  <span className="text-sm font-medium">Unlike</span>
</button>

                      <div className="p-4 space-y-3">
                        <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                          {item.title.split(' ').slice(0, 6).join(' ')}...
                        </h2>
                        <div
                          className="text-sm text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html: item.content.split(' ').slice(0, 20).join(' '),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                  <div className='flex flex-col m-5 p-5 gap-3 items-center justify-center'>

                    <Link to="/blogs">
                      <button className="bg-[#D95D39] hover:bg-[#b34b2e] transition px-6 py-3 rounded-lg font-medium cursor-pointer">
                        Explore Blogs
                      </button>
                    </Link>
                  </div>
                      </>
              )}
            </>
          )}
    </>
  );

}

export default LikedBlogs