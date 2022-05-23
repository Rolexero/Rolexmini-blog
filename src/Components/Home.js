import React, {useState, useEffect} from 'react'
import BlogList from './BlogList';
import {getDocs} from 'firebase/firestore'
import { collection } from "firebase/firestore";
import { db } from "../Firebase/Firebase-config";
import { Audio, BallTriangle } from "react-loader-spinner";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false)

      useEffect(() => {
        const postsCollectionRef = collection(db, "Blogpost")
         ;
        const getPosts = async()=>{
          setLoading(true);
          try {
              const response = await getDocs(postsCollectionRef);
              const data = response.docs.map((doc) => ({...doc.data(), id: doc.id}));
              setBlogs(data);
          } catch (error) {
            console.log(error.message)
          }
          setLoading(false)
        }
        getPosts()
      }, [])
      

    // const handleDelete = (id)=>{
    //     const newBlog = blogs.filter((blog)=>blog.id !== id)
    //     setBlogs(newBlog)
    // }

    if (loading) {
      return (
        <div
          style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "90px",
          }}
        >
          <BallTriangle color="#f1356d" />
        </div>
      );
    }

    if (blogs.length === 0) {
        return <div>
          No blog to display
        </div>
    } 

  return (
    <div className="home">
      <h2>All Blogs</h2>
      <BlogList blogs={blogs}/>
    </div>
  );
}

export default Home