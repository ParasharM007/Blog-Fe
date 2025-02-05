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
function App() {
  

  return (
    <>
     <div>
      <Router>
      <Navbar />
      <ToastContainer theme="dark" />
        <Routes>
          <Route path='/' element={<Cards/>}/>
          <Route path='/blog/:id' element={<Blog />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/create-blog' element={<CreateBlog />}/>
        </Routes>
      </Router>
     </div>
    </>
  )
}

export default App
