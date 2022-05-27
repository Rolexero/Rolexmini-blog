import logo from './logo.svg';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { Routes, Route, Link } from "react-router-dom";
import Createblog from './Components/Createblog';
import BlogDetails from './Components/BlogDetails';
import Notfound from './Components/Notfound';
import { ToastContainer, toast } from "react-toastify";
import Login from './Components/Login';



function App() {
      const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="app text-gray-900">
      <Navbar isAuth={isAuth}/>
      <div className="">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<Createblog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <ToastContainer closeButton={false} />
    </div>
  );
}

export default App;
