import React from "react";

const IndexPg = (props) => {
	React.useEffect(() => {
		const token = localStorage.getItem("CHAT_TOKEN");

		//if no token present (from registration & login),
		if (!token) {
			props.history.push("/login");
		} else {
			props.history.push("/dashboard");
		}
	});
	return <div></div>;
};

export default IndexPg;
