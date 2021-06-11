import React from "react";
import cx from "classnames";
import { useHistory } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "./Button";

const Header = ({ loggedIn }) => {
  const history = useHistory();

  const logout = () => {
    // remove token from localStorage
    localStorage.clear();
    history.push("/");
  };

  return (
    <nav
      className={cx(
        "navbar navbar-expand-md align-items-center justify-content-around justify-content-md-around py-3 mb-4 border-bottom"
      )}
    >
      <div className="container-fluid">
        <a
          className="fw-bold navbar-brand"
          href="#"
          onClick={() => history.push("/")}
        >
          Talk Therapy
        </a>
        <button
          className="navbar-toggler bg-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarsExample04"
        >
          <ul className="navbar-nav mb-2 mb-md-0">
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
                href="http://localhost:3000/login"
                className={cx("nav-link px-2 link-dark", styles.headerLink)}
              >
                Chat
              </a>
            </li>
            {loggedIn && (
              <li>
                <a
                  onClick={() => logout()}
                  className={cx("nav-link px-2 link-dark", styles.headerLink)}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
