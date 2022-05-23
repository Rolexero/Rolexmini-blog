import logo from './logo.svg';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { Routes, Route, Link } from "react-router-dom";
import Createblog from './Components/Createblog';


function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/create" element={<Createblog/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
