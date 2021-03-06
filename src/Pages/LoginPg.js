import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import makeToast from "../Toaster";
import Header from "../components/Header";
import Button from "../components/Button";

import logo from "../assets/img/walking.svg";

// ||| this src/Pages/LoginPg.js is used to to render the login page, connect with
// ||| backend routes/user.js, which routes to backend middlewares/auth.js (MUST PASS for next() to occur),
// ||| and then, it routes to and are managed by backend controllers/userController.js
const LoginPg = (props) => {
  // set React reference hooks
  const [isLoading, setLoading] = useState(false);
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem("CHAT_TOKEN");
    if (!token) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
    //eslint-disable-next-line
  }, []);

  // declare React reference hooks to the current value of input fields
  const loginUser = () => {
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!emailRef.current.value) {
      makeToast("error", "Email required.");
      setLoading(false);
    }
    if (!passwordRef.current.value) {
      makeToast("error", "Password required.");
      setLoading(false);
    }

    // connect frontend input fields with backend
    axios
      .post("http://localhost:4040/user/login", { email, password })
      .then((response) => {
        if (response.data.icon === "success") {
          makeToast(response.data.icon, response.data.message);

          //! save the token in localStorage with .setItem(key,value)
          localStorage.setItem("CHAT_TOKEN", response.data.token);
          console.log(`${localStorage.getItem("CHAT_TOKEN")}`);

          // ||| setting up socket using setupSocket function declared in frontend src/App.js
          props.setupSocket();

          // re-direct to dashboard page via React-router-dom history.push function
          props.history.push("/dashboard");
        } else {
          makeToast(response.data.icon, response.data.message);
          return;
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response.status === 400) {
          makeToast("warning", err.response.data.message);
        }
        setLoading(false);
      });
  };

  // register option if user want to create another account instead of logging in
  const createAccount = () => {
    props.history.push("/register");
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="container d-flex align-items-center justify-content-around">
        <div className="row">
          <div className="col-sm d-flex align-items-center justify-content-center p-3">
            <img
              className="img-fluid"
              src={logo}
              width={300}
              alt="cartoon lady walking"
            />
          </div>
          <div className="col-sm d-flex align-items-center justify-content-center p-3">
            <div className="d-flex flex-column">
              <h1>Login</h1>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                ref={emailRef}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                ref={passwordRef}
                required
              />
              <Button
                isLoading={isLoading}
                className="text-white my-2"
                onClick={loginUser}
              >
                Login
              </Button>
              <Button btnStyle="outline-secondary" onClick={createAccount}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPg);
