import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import makeToast from "../Toaster";

// ||| this src/Pages/LoginPg.js is used to to render the login page, connect with
// ||| backend routes/user.js, which routes to backend middlewares/auth.js (MUST PASS for next() to occur),
// ||| and then, it routes to and are managed by backend controllers/userController.js
const LoginPg = (props) => {
	// set React reference hooks
	const emailRef = React.createRef();
	const passwordRef = React.createRef();

	// declare React reference hooks to the current value of input fields
	const loginUser = async () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		// connect frontend input fields with backend
		await axios
			.post("http://localhost:4040/user/login", { email, password })
			.then((response) => {
				if (response.data.icon === "success") {
					makeToast(response.data.icon, response.data.message);

					//! save the token in localStorage with .setItem(key,value)
					localStorage.setItem("CHAT_TOKEN", response.data.token);
					console.log(`Saved localStorage "CHAT_TOKEN" value is ${localStorage.getItem("CHAT_TOKEN")}`);

					// re-direct to dashboard page via React-router-dom history.push function
					props.history.push("/dashboard");

					// ||| setting up socket using setupSocket function declared in frontend src/App.js
					props.setupSocket();
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
				console.log(err.response.data.message);
				console.log("err.response.data.stack is " + err.response.data.stack);
				makeToast(err.response.data.icon, err.response.data.message);
			});
	};

	// register option if user want to create another account instead of logging in
	const createAccount = () => {
		props.history.push("/register");
	};

	return (
		<div className="card">
			<div className="cardHeader">Login</div>
			<div className="cardBody">
				<div className="inputGroup">
					<label htmlFor="email">Email </label>
					<input className="nonChat" type="email" name="email" id="email" placeholder="abc@gmail.com" ref={emailRef} required />
				</div>
				<div className="inputGroup">
					<label htmlFor="password">Password </label>
					<input className="nonChat" type="password" name="password" id="password" placeholder="Your password" ref={passwordRef} required />
				</div>
			</div>
			<button className="nonChat" onClick={loginUser}>
				Sign In
			</button>
			<div className="create_forgot_container">
				<div className="createLoginForgotAccount" onClick={createAccount}>
					Create Account
				</div>
			</div>
		</div>
	);
};

export default withRouter(LoginPg);
