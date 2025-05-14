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
import { UserContextProvider } from './UserContext.jsx';
import LandingPage from './components/LandingPage.jsx';
import { axios_Interceptor } from './utils/axios_Interceptor.js';
import UserProfile from './components/UserProfile.jsx';
import LikedBlogs from './components/LikedBlogs.jsx';




function App() {
 
  
  axios_Interceptor();
  return (
    
    <UserContextProvider>
     <div className=' relative bg-white overflow-x-hidden'>
        
      <Router>
      <Navbar />

      <ToastContainer position='top-center' theme="dark" />
        <Routes>

          <Route path='/' element={<LandingPage/>}/>
          <Route path='/blogs' element={<Cards/>}/>
          <Route path='/blog/:id' element={<Blog />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/author/:id' element={<UserProfile />}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/create-blog' element={<CreateBlog />}/>
          <Route path='/liked-blogs' element={<LikedBlogs />} />
        </Routes>
       <Plus />
      </Router>
     </div>
    </UserContextProvider>
        
  )
}

export default App
