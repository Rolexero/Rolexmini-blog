import React, {useState} from 'react'
import useInput from '../hooks/useInput';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/Firebase-config";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Createblog = () => {
    const postsCollectionRef = collection(db, "Blogpost");
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    const {
      value: enteredBlogTitle,
      isValid: enteredBlogTitleIsValid,
      hasError: blogTitleInputHasError,
      valueChangeHandler: blogTitleChangedHandler,
      inputBlurHandler: blogTitleBlurHandler,
      reset: resetBlogTitle,
    } = useInput((value) => value.trim() !== "");

        const {
          value: enteredBlogBody,
          isValid: enteredBlogBodyIsValid,
          hasError: blogBodyInputHasError,
          valueChangeHandler: blogBodyChangedHandler,
          inputBlurHandler: blogBodyBlurHandler,
          reset: resetBlogBody,
        } = useInput((value) => value.trim() !== "");



      let formIsValid = false;

      if (
        enteredBlogTitleIsValid &&
        enteredBlogBodyIsValid
      ) {
        formIsValid = true;
      }

      const createPostHandler = async(e) => {
        e.preventDefault();
        if (!formIsValid) {
          return;
        }
        setLoading(true);
        const post = {
          title: enteredBlogTitle,
          body: enteredBlogBody
        };
        await addDoc(postsCollectionRef, post)
        toast.success('Blog post successfully added')
        resetBlogTitle();
        resetBlogBody();
        setLoading(false)
        setTimeout(() => {
                  navigate("/");
        }, 5000);
      };

      const blogTitleClassName = blogTitleInputHasError
        ? "form-control invalid" : '';

      const blogBodyClassName = blogBodyInputHasError
        ? "form-control invalid" : '';



  return (
    <div>
      <div className="create">
        <h2>Add a New Blog</h2>
        <form onSubmit={createPostHandler}>
          <div className={blogTitleClassName}>
            <label>Blog title:</label>
            <input
              type="text"
              required
              value={enteredBlogTitle}
              onChange={blogTitleChangedHandler}
              onBlur={blogTitleBlurHandler}
            />
            {blogTitleInputHasError && (
              <p className="error-text">Please enter a blog title</p>
            )}
          </div>
          <div className={blogBodyClassName}>
            <label>Blog body:</label>
            <textarea
              required
              value={enteredBlogBody}
              onChange={blogBodyChangedHandler}
              onBlur={blogBodyBlurHandler}
            ></textarea>
            {blogBodyInputHasError && (
              <p className="error-text">Please enter a blog body</p>
            )}
          </div>
          <label>Blog author:</label>
          <input type="text" required disabled />
          <ToastContainer closeButton={false}/>
          {loading ? (
            <button disabled>Adding Blog...</button>
          ) : (
            <button disabled={!formIsValid}>Add Blog</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Createblog