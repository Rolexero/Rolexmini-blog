import React from 'react'
import { Link } from 'react-router-dom';

const BlogList = ({blogs}) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => {
        return (
          <div className="blog-preview" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <h2 >{blog.title}</h2>
              <p className='text-gray-500'>Written by {blog.author}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default BlogList