import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import makeToast from "../Toaster";

const DashboardPg = (props) => {
	const history = useHistory();
	const nameRef = React.createRef();
	const [chatrooms, setChatrooms] = React.useState([]);

	const getChatrooms = () => {
		axios
			.get("http://localhost:4040/chatroom", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("CHAT_TOKEN"),
				},
			})
			.then((response) => {
				setChatrooms(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const createRoom = () => {
		const name = nameRef.current.value;

		const config = {
			headers: { Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}` }
		};

		axios
			.post("http://localhost:4040/chatroom/", {
				name,
			}, config)
			.then((response) => {
				makeToast(response.data.icon, response.data.message);
			})
			.catch((err) => {
				console.log(err);
				// console.log(localStorage.getItem("CHAT_TOKEN"));
				makeToast(err.response.data.icon, err.response.data.message);
			});
	};

	const logout = () => {
		// remove token from localStorage
		localStorage.clear();
		history.push("/login");
	}

	React.useEffect(() => {
		getChatrooms();
	});

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
				Create & join
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
			<button className="nonChat" onClick={logout}>
				logout
			</button>
		</div>
	);
}

export default DashboardPg;
