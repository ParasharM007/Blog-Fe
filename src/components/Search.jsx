import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import debounce from 'lodash.debounce'
import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loadinggif from '../assets/loading-gif.gif'
import { AuthContext } from '../utils/AuthContext'
import Card from './Card.jsx'

function Search() {
    const navigate=useNavigate()
    const { setSearchBlogs }=useContext(AuthContext)
     const [debouncedQuery, setDebouncedQuery] = useState('');
     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Debounce the query input
  const debounceQuery = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
    }, 1000), 
    []
  );

  const handleInputChange = (e) => {
    debounceQuery(e.target.value);
  };

    const fetchBlogs=async(query)=>{
      const res = await axios.get(`${API_BASE_URL}/v1/users/search`,
        {
            params:{s:query}
        }
      )
      setSearchBlogs(res.data?.data)
      return res.data.data;
    }
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['searchBlog', debouncedQuery],
    queryFn: ({ queryKey }) => fetchBlogs(queryKey[1]),
    enabled: !!debouncedQuery, // only run if there's a query
  });

  return (
    <>
    <div className="bg-white w-full flex items-center justify-center px-4 py-6 transition-all duration-500">
  <div className="flex w-full max-w-3xl shadow-lg border border-gray-200 rounded-xl overflow-hidden">
    
    <input
      type="text"
      placeholder="Search blogs here..."
      className="flex-1 px-4 py-3 text-base sm:text-lg md:text-3xl text-gray-500 placeholder-gray-400 focus:outline-none"
      onChange={(e)=>handleInputChange(e)}
      />

    <button
      onClick={() => {
        navigate("/blogs")
        setSearchBlogs([])
    }}
      className="px-4 text-3xl sm:text-4xl md:text-5xl cursor-pointer text-gray-600 hover:text-red-600 transition-colors duration-300"
      title="Close"
      >
      &times;
    </button>

  </div>
</div>

{!blogs &&!isLoading && <h1 className='font-light flex flex-col items-center text-center h-20 mt-20 sm:ml-50 md:ml-10 text-4xl md:text-5xl'>Search for blogs here...</h1> }
    
    
    {
    isError && <h1 className='font-light flex flex-col items-center text-center sm:ml-50 md:ml-10 text-4xl md:text-5xl'>Error while Loading blogs...</h1>}
        {
         
     isLoading ? (
      <div className="flex justify-center items-start h-[80vh]">
        <img src={loadinggif} alt="Loading..." className="w-20 h-20" />
      </div>
    ) : (
        blogs && <Card />
    )}
    </>
  )
}

export default Search