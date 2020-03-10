import React from "react";
import { NavLink } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}

export default Layout;
