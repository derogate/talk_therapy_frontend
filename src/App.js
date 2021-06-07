import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatroomPg from "./Pages/ChatroomPg";
import DashboardPg from "./Pages/DashboardPg";
import IndexPg from "./Pages/IndexPg";
import LoginPg from "./Pages/LoginPg";
import RegisterPg from "./Pages/RegisterPg";
import io from "socket.io-client";
import makeToast from "./Toaster";

function App() {
	const [socket, setSocket] = React.useState(null);

	const setupSocket = () => {
		const token = localStorage.getItem("CHAT_TOKEN");
		//if token exist but not socket, create new socket
		if (token && !socket) {
			//create socket
			const newSocket = io("http://localhost:4040", {
				query: {
					token: localStorage.getItem("CHAT_TOKEN"),
				},
			});

			newSocket.on("disconnect", () => {
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
	});

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
