import React, {useState, useEffect} from 'react'
import BlogList from './BlogList';
import { Audio, BallTriangle } from "react-loader-spinner";
import { getDocs, doc, deleteDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../Firebase/Firebase-config";



const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const postsCollectionRef = collection(db, "Blogpost");
      const getPosts = async () => {
        setLoading(true);
        try {
          const response = await getDocs(postsCollectionRef);
          const data = response.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setBlogs(data);
        } catch (error) {
          console.log(error.message);
        }
        setLoading(false);
      };
      getPosts();
    }, []);


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
          <BallTriangle color="#696969" />
        </div>
      );
    }

    if (blogs.length === 0) {
        return <div className="content">
          No blog to display
        </div>
    } 

  return (
    <div className="home content">
      <h2>All Blogs</h2>
      <BlogList blogs={blogs}/>
    </div>
  );
}

export default Home