import './App.css'
import Login from './components/Login';
import Navbar from './components/Navbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Register from './components/Register';
import Cards from './components/Cards';
import Blog from './components/Blog';
import Profile from './components/Profile';
import Edit from './components/Edit';
import CreateBlog from './components/CreateBlog';
import { ToastContainer } from 'react-toastify';
import Plus from './components/Plus';
import LandingPage from './components/LandingPage.jsx';
// import { axios_Interceptor } from './utils/axios_Interceptor.js';
import UserProfile from './components/UserProfile.jsx';
import LikedBlogs from './components/LikedBlogs.jsx';
import { AuthContextProvider } from './utils/AuthContext.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Search from './components/Search.jsx';
import CoverVideo from './components/CoverVideo.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import { Analytics } from "@vercel/analytics/react"





function App() {
 
  
  // axios_Interceptor();
 
  return (
    
    
     <div className=' relative pt-18 bg-white overflow-x-hidden'>
        
      <Router>
        <AuthContextProvider>
          <Analytics />

      <Navbar />
      

      <ToastContainer position='top-center' theme="dark" />
        <Routes>

          <Route path='/' element={<LandingPage/>}/>
          <Route path='/blogs' element={<Cards/>}/>
          <Route path='/blog/:id' element={<Blog />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin-login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/admin/:id' element={<AdminDashboard />}/>
          <Route path='/author/:id' element={<UserProfile />}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/create-blog' element={<CreateBlog />}/>
          <Route path='/liked-blogs' element={<LikedBlogs />} />
          <Route path='/search-blogs' element={<Search />} />
          <Route path='/cover-video' element={<CoverVideo />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
       <Plus />
        </AuthContextProvider>
      </Router>
     </div>
    
        
  )
}

export default App
