import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import makeToast from "../Toaster";

function DashboardPg(props) {
	const nameRef = React.createRef();
	const [chatrooms, setChatrooms] = React.useState([]);

	// ||| getChatrooms() is executed from backend controllers/chatroomController.js
	const getChatrooms = () => {
		axios
			.get("http://localhost:4040/chatroom", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("CHAT_TOKEN"),
				}, // ||| token originate from .setItem() in src/Pages/LoginPg.js
			})
			.then((response) => {
				setChatrooms(response.data); //use res.json results from backend controllers/chatroomController.js
			})
			.catch((err) => {
				setTimeout(getChatrooms, 3000);
				console.log(err);
			});
	};

	const createRoom = () => {
		const name = nameRef.current.value;

		const config = {
			headers: { Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}` },
		};

		axios
			.post(
				"http://localhost:4040/chatroom/",
				{
					name,
				},
				config
			)
			.then((response) => {
				getChatrooms();
				nameRef.current.value = "";

				makeToast(response.data.icon, response.data.message);
			})
			.catch((err) => {
				console.log(err);

				makeToast(err.response.data.icon, err.response.data.message);
			});
	};

	// ||| getChatrooms() is executed from backend controllers/chatroomController.js
	React.useEffect(() => {
		getChatrooms();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="card">
			<div className="cardHeader">Chatrooms</div>
			<div className="cardBody">
				<div className="inputGroup">
					<label htmlFor="name">Create new chatroom</label>
					<input className="nonChat" type="text" name="name" id="name" placeholder="Chatroom name" ref={nameRef} />
				</div>
			</div>

			<button className="nonChat" onClick={createRoom}>
				Create room
			</button>
			<div className="chatrooms">
				{chatrooms.map((chatroom) => (
					<div key={chatroom._id} className="chatroom">
						<div className="chatroom_name">{chatroom.name}</div>
						<Link to={"/chatroom/" + chatroom._id}>
							<div className="join">Join</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default DashboardPg;
