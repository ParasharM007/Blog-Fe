// import { Link } from 'react-router-dom'; 


// export default function LandingPage() {
//   return (
//     <div className="font-sans">
      
//       <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-[#2b372b] text-white">
//         <h1 
//           className="text-5xl md:text-6xl font-bold mb-4"
//         >
//           Welcome to WildEarth Blog
//         </h1>
//         <p className="text-xl md:text-2xl mb-6 max-w-xl">
//           Dive into stories about climate, wildlife, and Earth's beauty.
//         </p>
//         <Link to="/blogs">
//           <button className="bg-[#D95D39] hover:bg-[#b34b2e] transition px-6 py-3 rounded-lg font-medium cursor-pointer">
//             Explore Blogs
//           </button>
//         </Link>
//       </section>

     
      
//       <section className="py-16 px-6 bg-[#FDF0D5]">
//         <h2 className="text-3xl font-bold text-center mb-10">Featured Posts</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
//           <div className="bg-white rounded-lg shadow p-5">
//             <h3 className="text-xl font-bold mb-2">Why River Ecosystems - Lifelines of Biodiversity and Civilization Matter</h3>
//             <p className="text-sm text-gray-700 mb-3">A closer look at the lifelines of biodiversity and civilization.</p>
//             <Link to="/blog/68342ba626aa2086ab82534e">
//               <button className="text-[#D95D39] font-semibold cursor-pointer">Read More →</button>
//             </Link>
//           </div>
          
//         </div>
//       </section>


//       <section className="py-20 px-6 bg-[#2F5233] text-white text-center">
//         <h2 className="text-3xl font-bold mb-4">About This Blog</h2>
//         <p className="max-w-3xl mx-auto text-lg">
//           WildEarth Blog was created to spread awareness, inspire adventure, and promote environmental learning for all.
//           Whether you're passionate about nature or just curious — there's something for you here.
//         </p>
//       </section>

      
//       <footer className="py-6 text-center bg-[#1C1C1C] text-white">
//         <p>© 2025 WildEarth Blog | Built by Mohit</p>
//         <div className="mt-2">
//           <a href="https://www.linkedin.com/in/mohit-parashar-4a9a38293/" target='_blank' className="underline text-sm">LinkedIn</a> • 
//           <a href="https://github.com/ParasharM007" target='_blank' className="underline text-sm ml-2">GitHub</a>
//         </div>
//       </footer>
//     </div>
//   );
// }


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchCoverVideo =async()=>{
    // const res=await axios.get(`http://localhost:5000/api/v1/users/get-cover-video`,
    const res=await axios.get(`${API_BASE_URL}/v1/users/get-cover-video`,
      
    ) 
    console.log(res.data.data)
    return res.data?.data?.coverVideo
  }
  const {data:coverVideo , isError , isLoading}=useQuery({
    queryKey:["coverVideo"],
    queryFn:fetchCoverVideo,
    staleTime:Infinity
  })

  const fetchFeaturedBlogs=async()=>{
    const res= await axios.get(`${API_BASE_URL}/v1/users/get-featured-blogs`)
    return res.data.data
  }
  const {data:blogs ,isError:err, isLoading:loading}=useQuery({
    queryKey:["featuredBlogs"],
    queryFn:fetchFeaturedBlogs,
    staleTime:60000
  })
  return (
    <div className="font-sans bg-white text-gray-800">
      
      {/* Hero Section */}
     <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden">
      {/* 🔥 Background Video */}
     {coverVideo && (
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src={coverVideo} type="video/mp4" />
    .
  </video>
)}
      <div className={`absolute inset-0 z-10 ${!coverVideo?'bg-black':''}`} />

      
      <div className="relative flex flex-col items-center z-20">
        <h1 className="text-5xl md:text-6xl  font-bold mb-4 text-white drop-shadow-lg">
          Welcome to  <span className="text-green-500">WildEarth</span> Blog
        </h1>
        <div>

        <p className="text-xl md:text-2xl mb-6 max-w-xl text-white drop-shadow">
          Dive into stories about wildlife, climate, nature, and Earth's adventures.
        </p>
        <Link to="/blogs">
          <button className="bg-green-700 hover:bg-green-800 transition px-6 py-3 cursor-pointer rounded-full font-medium text-white shadow-md">
            🌿 Explore Blogs
          </button>
        </Link>
        </div>
      </div>
    </section>

     
     <section className="h-auto flex flex-col justify-center items-center py-16 px-4 sm:px-6 text-center bg-gradient-to-br from-green-100 via-white to-green-50">
  <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-10">
    🌍 Featured Posts
  </h2>

  {blogs !== null && typeof blogs === 'object' && !Array.isArray(blogs) && (
    <div className="font-light text-4xl md:text-5xl text-gray-500">
      No Blogs Available...
    </div>
  )}

  {Array.isArray(blogs) && blogs.length > 0 && (
    <div className="flex flex-wrap justify-center gap-8 max-w-6xl w-full px-4">
      {blogs.map((item) => (
        <div
          key={item?._id}
          className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 max-w-sm w-full flex flex-col"
        >
          <img
            src={item.blogImg}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5 flex flex-col flex-grow text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <div
              className="text-sm mb-4 text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            <div className="mt-auto">
              <Link to={`/blog/${item._id}`}>
                <button className="text-green-700 font-semibold hover:underline cursor-pointer">
                  Read More →
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</section>


      {/* About Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-900">🌱 About This Blog</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          WildEarth Blog was created to spread awareness, inspire adventure, and promote environmental education.
          Whether you're a nature lover or simply curious, you'll find something meaningful here.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900 text-white">
        <p>© 2025 WildEarth Blog | Built by Mohit</p>
        <div className="mt-2 text-sm">
          <a href="https://www.linkedin.com/in/mohit-parashar-4a9a38293/" target='_blank' rel="noreferrer" className="underline">LinkedIn</a> •
          <a href="https://github.com/ParasharM007" target='_blank' rel="noreferrer" className="underline ml-2">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
