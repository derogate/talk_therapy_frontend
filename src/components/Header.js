import React from "react";
import cx from "classnames";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <nav
      className={cx(
        "navbar navbar-expand-md align-items-center justify-content-around justify-content-md-around py-3 mb-4 border-bottom"
      )}
    >
      <div className="container-fluid">
        <a className="fw-bold navbar-brand" href="#">
          Talk Therapy
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li>
              <a
                href="#"
                className={cx("nav-link px-2 link-dark", styles.headerLink)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={cx("nav-link px-2 link-dark", styles.headerLink)}
              >
                Chat
              </a>
            </li>
            <li>
              <a
                href="#"
                className={cx("nav-link px-2 link-dark", styles.headerLink)}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
