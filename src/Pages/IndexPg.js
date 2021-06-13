import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";

// ||| This IndexPg.js is NOT related to frontend src/index.js (purpose: simply code to render App.js).
// ||| This IndexPg.js is related to frontend src/App.js url path.
// ||| This IndexPg.js purpose: redirecting to login or dashboard (based on Boolean of localStorage token)
const IndexPg = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Body />
    </div>
  );
};

export default IndexPg;
