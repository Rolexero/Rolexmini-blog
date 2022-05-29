import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { collection, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase-config";
import { BallTriangle } from "react-loader-spinner";
import Notfound from "./Notfound";


const BlogDetails = ({deleteBlog, isAuth}) => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const blogCollectionRef = doc(db, "Blogpost", id);
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await getDoc(blogCollectionRef);
        const data = await response.data();
        setBlog(data);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    getPosts();
  }, [id]);

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

      if (!blog) {
        return <Notfound />;
      }


  if (!blog.body) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "90px",
        }}
      >
        No blog text to display
      </div>
    );
  }




  return (
    <div className="blog-details content">
      <article>
        <h2>{blog.title}</h2>
        <p className="text-gray-400 text-sm">Written by {blog.author.name}</p>
        <div>{blog.body}</div>
        {isAuth && blog.author.id === auth.currentUser.uid &&  <button onClick={() => deleteBlog(id)}>Delete blog</button>}
      </article>
    </div>
  );
};

export default BlogDetails;