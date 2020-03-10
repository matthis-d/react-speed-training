import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <h1>Counter App</h1>
      <p>
        An awesome app made by <Link to="/details/Yue">Yue</Link>,{" "}
        <Link to="/details/Claudine">Claudine</Link> and
        <Link to="/details/Denis">Denis</Link>!
      </p>
    </>
  );
}

export default About;
