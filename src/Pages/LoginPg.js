import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import makeToast from "../Toaster";

const LoginPg = (props) => {
	//React reference hooks
	const emailRef = React.createRef();
	const passwordRef = React.createRef();

	//declare React reference hooks to the current value of input fields
	const loginUser = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		//connect frontend input fields with backend
		axios
			.post("http://localhost:4040/user/login", { email, password })
			.then((response) => {
				console.log(response.data.message);

				if (response.data.icon === "success") {
					makeToast(response.data.icon, response.data.message);

					//save the token in localStorage
					localStorage.setItem("CHAT_TOKEN", response.data.token);

					//re-direct to dashboard page via React-router-dom history.push function
					props.history.push("/dashboard");

					props.setupSocket();
				} else {
					makeToast(response.data.icon, response.data.message);
					return;
				}
			})
			.catch((err) => {
				console.log("Email: " + email + "\n" + "Password:" + password);
				makeToast("error", err.response.data.message);
			});
	};

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
