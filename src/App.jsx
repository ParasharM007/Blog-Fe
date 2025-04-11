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


// import SmoothScroll from './SmoothScroll';

function App() {
  
  
  return (
      
    <>
     <div className=' relative bg-white overflow-x-hidden'>
      <Router>
      <Navbar />
      <ToastContainer position='top-center' theme="dark" />
        <Routes>
          <Route path='/' element={<Cards/>}/>
          <Route path='/blog/:id' element={<Blog />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/create-blog' element={<CreateBlog />}/>
        </Routes>
        <Plus />
      </Router>
     </div>
    </>
        
  )
}

export default App
