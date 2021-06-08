import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatroomPg from "./Pages/ChatroomPg";
import DashboardPg from "./Pages/DashboardPg";
import IndexPg from "./Pages/IndexPg";
import LoginPg from "./Pages/LoginPg";
import RegisterPg from "./Pages/RegisterPg";
import io from "socket.io-client";
import makeToast from "./Toaster";

// ||| This src/App.js purpose is to manage url path (using src/Pages/"<url path>".js contents) & rendering or passing relevant component
//  !  This src/App.js purpose also to set up socket IF TOKEN EXISTS! via src/Pages/LoginPg.js!

function App() {
	// set useState.
	// ||| socket props below is used in src/App.js & src/Pages/ChatroomPg.js
	// ||| setSocket props below is used here in src/App.js only
	const [socket, setSocket] = React.useState(null);

	// ||| setting up new socket. setupSocket is used here and in src/LoginPg.js
	const setupSocket = () => {
		const token = localStorage.getItem("CHAT_TOKEN");
		// if localStorage token exist but NO SOCKET EXISTS, create new socket & combine it with that token

		if (token && !socket) {
			console.log(token && !socket);
			const newSocket = io("http://localhost:4040", {
				// ||| this is query.token used in backend server.js as query.handshake.query.token
				query: {
					token: localStorage.getItem("CHAT_TOKEN"),
				},
			});
			console.log(newSocket);

			newSocket.on("disconnect", (reason) => {
				console.log(reason);
				setSocket(null);
				setTimeout(setupSocket, 3000);
				makeToast("error", "Socket Disconnected!");
			});

			newSocket.on("connect", () => {
				makeToast("success", "Socket Connected!");
			});

			setSocket(newSocket);
		}
	};

	React.useEffect(() => {
		setupSocket();
		//eslint-disable-next-line
	}, []);

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={IndexPg} exact />
				<Route path="/login" render={() => <LoginPg setupSocket={setupSocket} />} exact />
				<Route path="/register" component={RegisterPg} exact />
				<Route path="/dashboard" render={() => <DashboardPg socket={socket} />} exact />
				<Route path="/chatroom/:id" render={() => <ChatroomPg socket={socket} />} exact />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
