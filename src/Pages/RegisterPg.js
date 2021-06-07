import React from "react";
import axios from "axios";
import makeToast from "../Toaster";

const RegisterPg = (props) => {
	//React reference hooks
	const nameRef = React.createRef();
	const emailRef = React.createRef();
	const passwordRef = React.createRef();

	//declare React reference hooks to the current value of input fields
	const registerUser = () => {
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		//connect frontend input fields with backend
		axios
			.post("http://localhost:4040/user/register", { name, email, password })
			.then((response) => {
				console.log(response.data);
				console.log(response.data.message);
				makeToast(response.data.icon, response.data.message);

				//re-direct to login page via React-router-dom history.push function
				props.history.push("/login");
			})
			.catch((err) => {
				console.log("Name: " + name + "\n" + "Email: " + email);
				makeToast(err.response.data.icon, err.response.data.message);
			});
	};

	const loginUser = () => {
		props.history.push("/login");
	};

	return (
		<div className="card">
			<div className="cardHeader">Register</div>
			<div className="cardBody">
				<div className="inputGroup">
					<label htmlFor="name">Name</label>
					<input className="nonChat" type="text" name="name" id="name" placeholder="Your display name" ref={nameRef} required />
				</div>
				<div className="inputGroup">
					<label htmlFor="email">Email</label>
					<input className="nonChat" type="email" name="email" id="email" placeholder="example@gmail.com" ref={emailRef} required />
				</div>
				<div className="inputGroup">
					<label htmlFor="password">Password</label>
					<input className="nonChat" type="password" name="password" id="password" placeholder="Your password" ref={passwordRef} required />
				</div>
			</div>

			<button className="nonChat" onClick={registerUser}>
				Submit
			</button>
			<div className="login_forgot_container">
				<div className="createLoginForgotAccount" onClick={loginUser}>
					I already have an account
				</div>
			</div>
		</div>
	);
};

export default RegisterPg;
