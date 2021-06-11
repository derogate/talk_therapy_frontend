import React, { useState } from "react";
import axios from "axios";
import makeToast from "../Toaster";
import Header from "../components/Header";
import logo from "../assets/img/meditate.svg";
import Button from "../components/Button";

// ||| this src/Pages/RegisterPg.js purpose are to render the registration page,
// ||| connect with backend routes/user.js, which routes to
// ||| the backend middlewares/auth.js first (MUST PASS IN ORDER next() TO EXECUTE) and then,
// ||| it routes to and are managed by backend controllers/userController.js
const RegisterPg = (props) => {
  const [isLoading, setLoading] = useState(false);
  //declare createRef hooks variables
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  //assign createRef hooks variables to their respective current value of input fields
  const registerUser = () => {
    setLoading(true);
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!nameRef.current.value) {
      makeToast("error", "Name required.");
      setLoading(false);
    }
    if (!emailRef.current.value) {
      makeToast("error", "Email required.");
      setLoading(false);
    }
    if (!passwordRef.current.value) {
      makeToast("error", "Password required.");
      setLoading(false);
    }

    //connect frontend input fields with backend controllers/userController.js via axios
    axios
      .post("http://localhost:4040/user/register", { name, email, password })
      .then((response) => {
        console.log(response.data);
        makeToast(response.data.icon, response.data.message);

        //re-direct to login page via React-router-dom history.push function
        props.history.push("/login");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          makeToast("error", "Registration Failed");
        }
        setLoading(false);
      });
  };

  //re-direct to login page option if user already have account and want to login instead of registering
  const loginUser = () => {
    props.history.push("/login");
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
              <h1>Register</h1>
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Username"
                ref={nameRef}
                required
              />
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
                onClick={registerUser}
              >
                Sign Up!
              </Button>
              <a onClick={loginUser} className="text-center text-secondary">
                I already have an account!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPg;
