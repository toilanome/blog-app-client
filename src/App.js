import './App.css';

import {Route, Routes} from 'react-router-dom'
import Layout from './Pages/Layout';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './Pages/CreatePost';
import SinglePage from './Pages/SinglePage';
import EditPost from './Pages/EditPost';
import Blog from './Pages/Blog';



function App() {
  return (
      <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/post/:id' element={<SinglePage />} />
          <Route path='/editPost/:id' element={<EditPost />} />
        </Route>
        

        <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      </>
  
  );
}

export default App;
