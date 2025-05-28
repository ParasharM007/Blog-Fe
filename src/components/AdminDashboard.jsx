import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../utils/AuthContext'
import loadinggif from '../assets/loading-gif.gif'
import { toast } from 'react-toastify'
import api from '../utils/api_Interceptor'
import { Link, useNavigate } from 'react-router-dom'
function AdminDashboard() {
    const navigate = useNavigate();
    const { AdminLogin } = useContext(AuthContext)
    const [reason,setReason]= useState("")
    const [showModal, setShowModal] = useState(false);
const [modalData, setModalData] = useState({
  action: '', // 'approve' or 'reject'
  blogId: '',
});
    const handleNavigate = (id) => {
        navigate(`/blog/${id}`)
    }

    const fetchPendingBlogs = async () => {
        try {

            // const res = await axios.get(`http://localhost:5000/api/v1/users/all-liked-blogs`,
            // const res = await axios.get(`${API_BASE_URL}/v1/users/all-liked-blogs`,
            const res = await api.post(`/v1/users/pending-blogs`,
                {
                    withCredentials: true,
                    validateStatus: function (status) {
                        return status >= 200 && status < 300;
                    },
                }
            )

            const blogs = res.data?.data
            if (blogs.length === 0 || blogs.length > 0) {

                // console.log(blogs)
                return blogs
            }
            toast.success("Blogs fetched for approval")
        }

        catch (error) {

            toast.error("Error while fetching blogs for approval")
        }
    }

    const { data: blogs, isLoading, isError, refetch } = useQuery({
        queryKey: ["pendingBlogs"],
        queryFn: fetchPendingBlogs,
        enabled: AdminLogin

    })

    const approve= useMutation({
        mutationFn:async(id)=>{
            try {
              return await api.post(`/v1/users/approve-blog`,
                    {
                        blogId:id,
                        reason:reason
                    },
                {
                 withCredentials:true   
                })
            } catch (error) {
                throw error
            }

        }
    })
    const handleApproveBlog=async(id)=>{
         approve.mutate(id,
            {
         onSuccess:()=>{
            toast.success("Blog approved!")
            window.location.reload()
        },
        onError:(error)=>{
            console.log(error)
            toast.error("Couldn't approved blog")
        }
            }
         )
    }
    const reject= useMutation({
        mutationFn:async(id)=>{
            try {
              return await api.post(`/v1/users/reject-blog`,
                    {
                        blogId:id,
                        reason:reason
                    },
                {
                 withCredentials:true   
                })
            } catch (error) {
                throw error
            }

        }
    })
    const handleRejectBlog=async(id)=>{
         reject.mutate(id,
            {
         onSuccess:()=>{
            toast.success("Blog rejected!")
            window.location.reload()
        },
        onError:(error)=>{
            console.log(error)
            toast.error("Couldn't reject blog")
        }
            }
         )
    }

    return (
        <>
{showModal && (
  <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 flex items-center justify-center">
    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl text-center">
      <h2 className="text-2xl font-semibold mb-4">Confirm Action</h2>
      <p className="mb-6">
        Are you sure you want to{" "}
        <span className={`font-bold ${modalData.action === 'approve' ? 'text-green-600' : 'text-red-600'}`}>
          {modalData.action === 'approve' ? 'approve' : 'reject'}
        </span>{" "}
        this blog?
      </p>
     <p className='m-6'>
  Please provide a{" "}
  <span
    className={`font-bold ${
      modalData.action === 'approve' ? 'text-green-600' : 'text-red-600'
    }`}
  >
    reason
  </span>{" "}
  for this action:
</p>
<input
  type="text"
  value={reason}
  onChange={(e) => setReason(e.target.value)}
  placeholder="Enter your reason here..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
/>
      <div className="flex justify-center gap-4">
        <button
          className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          className={`px-5 py-2 rounded text-white transition ${
            modalData.action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          }`}
          onClick={() => {
            if (modalData.action === 'approve') {
              handleApproveBlog(modalData.blogId);
            } else {
              handleRejectBlog(modalData.blogId);
            }
            setShowModal(false);
          }}
        >
          Yes, {modalData.action}
        </button>
      </div>
    </div>
  </div>
)}

            {
                !AdminLogin ? (
                    <h1 className='font-light flex flex-col items-center text-center m-5 p-5 text-4xl md:text-5xl'>
                        Please login as Admin first to see Pendign Blogs
                    </h1>
                ) : isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
                    </div>
                ) : (
                    <>
                        {isError && (
                            <h1 className='font-light flex flex-col items-center text-center m-5 p-5 text-4xl md:text-5xl'>
                                Error while loading pending blogs...
                            </h1>
                        )}

                        {blogs?.length === 0 ? (
                            <div className='flex flex-col gap-3 items-center justify-center'>
                                <h1 className='font-light text-center m-3 p-5 text-4xl md:text-5xl'>
                                    No blogs are in pending list for approval...
                                </h1>
                                <Link to="/blogs">
                                    <button className="bg-[#D95D39] hover:bg-[#b34b2e] transition px-6 py-3 rounded-lg font-medium cursor-pointer">
                                        Explore Approved Blogs
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <h1 className='font-light text-center m-3 p-5 text-4xl md:text-5xl'>{`{ Pending Blogs for Admin approval }`}</h1>
                                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4  gap-6 p-4">
                                    {blogs.map((item) => (
                                        <div
                                            key={item?._id}
                                            onClick={() => handleNavigate(item?._id)}
                                            className="relative group mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-md bg-white transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                                        >
                                            <img
                                                src={item.blogImg}
                                                alt="Blog Thumbnail"
                                                className="w-full object-cover h-auto rounded-t-3xl"
                                            />

                                            <button
                                                className="absolute top-3 left-3 z-10 cursor-pointer flex items-center gap-1 px-3 py-1 rounded-full bg-green-700 text-white text-sm shadow-md 
                transition-all duration-300 transform hover:scale-105
                lg:opacity-0 lg:group-hover:opacity-100"
                                                onClick={(e) => {
    e.stopPropagation();
    setModalData({ action: 'approve', blogId: item?._id });
    setShowModal(true);
  }}
  title="Approve"
                                            >
                                                ✅ Approve
                                            </button>
                                            <button
                                                className="absolute top-3 right-3 z-10 cursor-pointer flex items-center gap-1 px-3 py-1 rounded-full bg-red-700 text-white text-sm shadow-md 
                transition-all duration-300 transform hover:scale-105
                lg:opacity-0 lg:group-hover:opacity-100"
                                             onClick={(e) => {
    e.stopPropagation();
    setModalData({ action: 'reject', blogId: item?._id });
    setShowModal(true);
  }}
                                                title="Reject"
                                            >
                                                ❌ Reject
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
                                            Explore Approved Blogs
                                        </button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </>
                )
            }   
            
             </>
    );
}

export default AdminDashboard