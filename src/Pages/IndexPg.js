import React from "react";

// ||| This IndexPg.js is NOT related to frontend src/index.js (purpose: simply code to render App.js).
// ||| This IndexPg.js is related to frontend src/App.js url path.
// ||| This IndexPg.js purpose: redirecting to login or dashboard (based on Boolean of localStorage token)
const IndexPg = (props) => {
	React.useEffect(() => {
		// ||| token originate from .setItem() in src/Pages/LoginPg.js
		// get token
		const token = localStorage.getItem("CHAT_TOKEN");

		//if no token present (from  login),
		if (!token) {
			props.history.push("/login");
		} else {
			props.history.push("/dashboard");
		}
	});
	return <div></div>;
};

export default IndexPg;
