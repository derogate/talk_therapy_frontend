import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import makeToast from "../Toaster";
import Header from "../components/Header";

import logo from "../assets/img/walking.svg";

// ||| this src/Pages/LoginPg.js is used to to render the login page, connect with
// ||| backend routes/user.js, which routes to backend middlewares/auth.js (MUST PASS for next() to occur),
// ||| and then, it routes to and are managed by backend controllers/userController.js
const LoginPg = (props) => {
  // set React reference hooks
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  // declare React reference hooks to the current value of input fields
  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!emailRef.current.value) {
      makeToast("Error", "Email required.");
    }
    if (!passwordRef.current.value) {
      makeToast("Error", "Password required.");
    }

    // connect frontend input fields with backend
    axios
      .post("http://localhost:4040/user/login", { email, password })
      .then((response) => {
        if (response.data.icon === "success") {
          makeToast(response.data.icon, response.data.message);

          //! save the token in localStorage with .setItem(key,value)
          localStorage.setItem("CHAT_TOKEN", response.data.token);
          console.log(
            `Saved localStorage "CHAT_TOKEN" value is ${localStorage.getItem(
              "CHAT_TOKEN"
            )}`
          );

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
        /*
				??? TESTING: to check the error details and its contents when axios encountered error
				console.log(err); //default error in catch() block is Internal Server Error even though it might not be related to server being down
				console.log(err.response);
				console.log(err.response.data);
				console.log(err.response.data.message);
				console.log(err.response.data.stack); //this is the most useful data compared to previous four err above
				*/
        // console.log(err.response.data.message);
        // console.log("err.response.data.stack is " + err.response.data.stack);
        // makeToast(err.response.data.icon, err.response.data.message);
      });
  };

  // register option if user want to create another account instead of logging in
  const createAccount = () => {
    props.history.push("/register");
  };

  // homepage option is user want to do some sightseeing in homepage
  const goHome = () => {
    props.history.push("/");
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
              <button
                className="btn btn-primary text-white my-2"
                onClick={loginUser}
              >
                Login
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={createAccount}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPg);
