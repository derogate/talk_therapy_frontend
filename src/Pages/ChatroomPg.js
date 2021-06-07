import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router";

//! React App  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ChatroomPg = ({ match, socket }) => {
	//declare the id for the routes url path in app.js
	const chatroomId = match.params.id;

	//set useState and useRef
	const [messages, setMessages] = React.useState([]);
	const [userId, setUserId] = React.useState("");
	const messageRef = React.useRef();

	//sending msg to chatroom
	const sendmessage = () => {
		console.log(messageRef.current.value);
		if (socket) {
			if (messageRef.current.value.trim() === "") {
				return;
			} else {
				socket.emit("chatroomMessage", {
					chatroomId,
					message: messageRef.current.value,
				});
				//empty input value after emitting chatroomMessage
				messageRef.current.value = "";
			}
		}
	};

	//handling userId via JWT token and organizing old messages and new message
	React.useEffect(() => {
		//get token
		const token = localStorage.getItem("CHAT_TOKEN");
		if (token) {
			//use JSON.parse method and atob function to decode base64 of token to normal string
			const payload = JSON.parse(atob(token.split(".")[1]));

			//set userId by the id from the token's payload
			setUserId(payload.id);
		}

		//receiving new message and combining it into an array
		if (socket) {
			socket.on("newMessage", (message) => {
				const newMessages = [...messages, message];
				setMessages(newMessages);
			});
		}
		//eslint-disable-next-line
	}, [messages]);

	//joinRoom and leaveRoom
	React.useEffect(() => {
		if (socket) {
			socket.emit("joinRoom", { chatroomId });
		}
		return () => {
			//UNMOUNTING COMPONENT!
			if (socket) {
				socket.emit("leaveRoom", { chatroomId });
			}
		};
		//eslint-disable-next-line
	}, []);

	return (
		<div className="Page">
			<div className="Chat_History ">
				{messages.map((message, index) => {
					<div key={index} className="message">
						<span className={userId === message.userId ? "yourMessage" : "othersMessage"}>{message.name}: </span> {message.message}
					</div>;
					if (userId === message.userId) {
						return (
							<div className="MyRow" key={index}>
								<span className="MyMessage">
									{message.name}: {message.message}
								</span>
							</div>
						);
					}
					return (
						<div className="PartnerRow" key={index}>
							<span className="PartnerMessage">
								{message.name}: {message.message}
							</span>
						</div>
					);
				})}
			</div>
			<div className="Form" onSubmit={sendmessage}>
				<input className="ChatBox" type="text" name="message" placeholder="Type your message" ref={messageRef} />
				<button className="Button" onClick={sendmessage}>
					Send
				</button>
			</div>
		</div>
	);
};

export default withRouter(ChatroomPg);
