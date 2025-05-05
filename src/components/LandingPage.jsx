import { Link } from 'react-router-dom'; 


export default function LandingPage() {
  return (
    <div className="font-sans">
      
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-[#2b372b] text-white">
        <h1 
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Welcome to WildEarth Blog
        </h1>
        <p className="text-xl md:text-2xl mb-6 max-w-xl">
          Dive into stories about climate, wildlife, and Earth's beauty.
        </p>
        <Link to="/blogs">
          <button className="bg-[#D95D39] hover:bg-[#b34b2e] transition px-6 py-3 rounded-lg font-medium cursor-pointer">
            Explore Blogs
          </button>
        </Link>
      </section>

     
      
      <section className="py-16 px-6 bg-[#FDF0D5]">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-xl font-bold mb-2">Why Rainforests Matter</h3>
            <p className="text-sm text-gray-700 mb-3">A closer look at the Earth's lungs and biodiversity.</p>
            <Link to="/blog/6800be5e53acf50889b72eaf">
              <button className="text-[#D95D39] font-semibold cursor-pointer">Read More →</button>
            </Link>
          </div>
          
        </div>
      </section>


      <section className="py-20 px-6 bg-[#2F5233] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">About This Blog</h2>
        <p className="max-w-3xl mx-auto text-lg">
          WildEarth Blog was created to spread awareness, inspire adventure, and promote environmental learning for all.
          Whether you're passionate about nature or just curious — there's something for you here.
        </p>
      </section>

      
      <footer className="py-6 text-center bg-[#1C1C1C] text-white">
        <p>© 2025 WildEarth Blog | Built by Mohit</p>
        <div className="mt-2">
          <a href="https://www.linkedin.com/in/mohit-parashar-4a9a38293/" target='_blank' className="underline text-sm">LinkedIn</a> • 
          <a href="https://github.com/ParasharM007" target='_blank' className="underline text-sm ml-2">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
