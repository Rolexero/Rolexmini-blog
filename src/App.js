import logo from './logo.svg';
import { useState,useEffect } from 'react';
import { auth } from './Firebase/Firebase-config';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Createblog from './Components/Createblog';
import BlogDetails from './Components/BlogDetails';
import Notfound from './Components/Notfound';
import { ToastContainer, toast } from "react-toastify";
import Login from './Components/Login';
import {signOut} from 'firebase/auth'
import { getDocs, doc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import {db} from './Firebase/Firebase-config'
import Swal from "sweetalert";


function App() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState();


  const deleteBlog = async(id) => {
    Swal({
      title: "Are you sure you want to delete this blog?",
      text: "Once deleted, you will not be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const postDoc = doc(db, "Blogpost", id);
        deleteDoc(postDoc);
        Swal("Poof! Your blog post has been deleted!", {
          icon: "success",
        });
        navigate('/');
      } else {
        Swal("Your blog post is safe!");
      }
    });
  };

  return (
    <div className="app text-gray-900">
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <div className="">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route path="/create" element={<Createblog isAuth={isAuth} />} />
          <Route path="/blogs/:id" element={<BlogDetails deleteBlog={deleteBlog} isAuth={isAuth}/>} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <ToastContainer closeButton={false} />
    </div>
  );
}

export default App;
