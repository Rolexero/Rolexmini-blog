import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { Routes, Route, Link } from "react-router-dom";
import Createblog from './Components/Createblog';
import BlogDetails from './Components/BlogDetails';
import Notfound from './Components/Notfound';


function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<Createblog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
