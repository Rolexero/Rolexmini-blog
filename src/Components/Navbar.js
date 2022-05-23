import React from 'react'
import { Link } from "react-router-dom";

const links = [
  {
    id: 1,
    name: "Home",
    navLink: "/",
  },
  {
    id: 2,
    name: "New Blog",
    navLink: "/create",
  },
];

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <h1>The Rolex Blog</h1>
      </div>
      <div className="links">
        {links.map((link) => {
          return (
            <Link to={link.navLink} key={link.id}>
              {link.name}
            </Link>
          );
        })}
      </div>
      <div>
      </div>
    </nav>
  );
}

export default Navbar