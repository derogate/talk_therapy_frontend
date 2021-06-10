import React from "react";
import cx from "classnames";

import logo from "../assets/img/yoga.svg";

const Body = () => {
  return (
    <div
      className={cx(
        "container-fluid d-flex align-items-center justify-content-center p-5"
      )}
    >
      <div>
        <h1 className="mb-0">
          Welcome to <span className="text-primary">Talk Therapy!</span>
        </h1>
        <p>Here for you. Always.</p>
      </div>
      <img src={logo} className="img-fluid" width={300} />
    </div>
  );
};

export default Body;
