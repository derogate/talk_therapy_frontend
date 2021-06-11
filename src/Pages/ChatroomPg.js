import React from "react";
import { withRouter } from "react-router";
import axios from "axios";

const ChatroomPg = ({ match, socket }) => {
  // ||| socket props passed above is imported and managed via backend server.js
  /*
	??? TESTING: to check what is given by the props passed to the function which is match (react-router's object)
	console.log(match);
	console.log(match.params);
	console.log(match.params.id);
	*/
  //declare the id for the routes url path in app.js (using react-router's match object which contains params)
  //chatroomId is a unique identifier for that specific chatroom & are saved to mongoDB for socket.io query
  //chatroomId is NOT bound to userId! chatroomId is NOT userId!
  const chatroomId = match.params.id;

  //set useState and useRef
  const [messages, setMessages] = React.useState([]);
  const [userId, setUserId] = React.useState("");
  const [chatroomHeader, setChatroomHeader] = React.useState([]);
  const messageRef = React.useRef();

  //sending msg to chatroom =============================================================================================
  const sendMessage = () => {
    if (socket) {
      if (messageRef.current.value.trim() === "") {
        messageRef.current.value = "";
        return;
      } else {
        // ||| "chatroomMessage" event is managed by backend server.js (purpose: send message to that particular chatroom & save message to mongoDB)
        socket.emit("chatroomMessage", {
          chatroomId,
          message: messageRef.current.value,
        });
        console.log(userId + " texted: " + messageRef.current.value);
        //empty input value after emitting chatroomMessage
        messageRef.current.value = "";
      }
    }
  };

  // handling userId via JWT token and appending old messages and new message
  React.useEffect(() => {
    // ||| token originate from .setItem() in src/Pages/LoginPg.js
    // get token
    const token = localStorage.getItem("CHAT_TOKEN");

    if (token) {
      // .split()[1] method to get the encoded payload at index [1], atob function to decode its base64 algorithm, finally, JSON.parse method to convert JSON object to JSON string
      const payload = JSON.parse(atob(token.split(".")[1]));

      //set userId by the id from the decoded token's payload
      setUserId(payload.id);
      /*
			??? TESTING: to check the stored localStorage token, the decoded payload and the user id information within the decoded payload
			console.log(token);
			console.log(payload);
			console.log(payload.id);
			*/
    }

    //receiving new message and combining it into an array=============================================================
    if (socket) {
      // ||| "newMessage" event originates from backend server.js
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  //joinRoom and leaveRoom ===============================================================================================
  React.useEffect(() => {
    if (socket) {
      // ||| related to "joinRoom" event in backend server.js
      socket.emit("joinRoom", { chatroomId });
    }
    return () => {
      //UNMOUNTING COMPONENT!
      if (socket) {
        // ||| related to "leaveRoom" event in backend server.js
        socket.emit("leaveRoom", { chatroomId });
      }
    };
    //eslint-disable-next-line
  }, []);

  // ||| getChatroomHeader() is executed here but re-directed
  // ||| to backend app.js --> routes/chatroom.js --> middlewares/auth.js --> controllers/chatroomController.js -->
  // ||| response.data received changes the state of [setChatroomHeader] to [chatroomHeader] --> finally, used in rendering below!
  const getChatroomHeader = async () => {
    await axios
      .get("http://localhost:4040/chatroomHeader", {
        chatroomId,
        headers: {
          authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        var chatroomHeaderName = "";
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]._id === chatroomId) {
            //chatroomHeaderName.push(response.data.[i].name);
            chatroomHeaderName = response.data[i].name;
            console.log(response.data[i].name);
          }
        }
        setChatroomHeader(chatroomHeaderName);
        //console.log(chatroomHeaderName); //see chatroomHeader value
      })
      .catch((err) => {
        setTimeout(getChatroomHeader, 20000);
        console.log(err);
      });
  };

  React.useEffect(() => {
    getChatroomHeader();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="Page">
      <div className="chatroomHeader">{chatroomHeader}</div>
      <div className="Chat_History ">
        {messages.map((message, index) => {
          return (
            <div
              className={userId === message.userId ? "MyRow" : "PartnerRow"}
              key={index}
            >
              <div
                className={
                  userId === message.userId ? "MyMessage" : "PartnerMessage"
                }
                key={index}
              >
                <span
                  className={
                    userId === message.userId ? "MyNameTag" : "PartnerNameTag"
                  }
                >
                  {userId === message.userId ? "you" : message.name}
                </span>
                {message.message}
              </div>
            </div>
          );
        })}
      </div>
      <div className="Form">
        <input
          className="ChatBox"
          type="text"
          name="message"
          placeholder="Type your message"
          ref={messageRef}
        />
        <button className="Button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPg);
