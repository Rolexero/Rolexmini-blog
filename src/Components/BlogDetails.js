import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/Firebase-config";
import { BallTriangle } from "react-loader-spinner";
import Swal from "sweetalert";
import Notfound from "./Notfound";

const BlogDetails = () => {
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



  const deleteBlog = (id) => {
    Swal({
      title: "Are you sure you want to delete this blog?",
      text: "Once deleted, you will not be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Swal("Poof! Your blog post has been deleted!", {
          icon: "success",
        });
      } else {
        Swal("Your blog post is safe!");
      }
    });
  };

  return (
    <div className="blog-details content">
      <article>
        <h2>{blog.title}</h2>
        <p className="text-gray-500">Written by {blog.author}</p>
        <div>{blog.body}</div>
        <button onClick={deleteBlog}>Delete blog</button>
      </article>
    </div>
  );
};

export default BlogDetails;
