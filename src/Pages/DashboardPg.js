import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import makeToast from "../Toaster";

const DashboardPg = (props) => {
  const history = useHistory();
  const nameRef = React.createRef();
  const [chatrooms, setChatrooms] = React.useState([]);

  // ||| getChatrooms() is executed here but re-directed
  // ||| to backend app.js --> routes/chatroom.js --> middlewares/auth.js --> controllers/chatroomController.js -->
  // ||| response.data received changes the state of [setChatrooms] to [chatrooms] --> finally, used in rendering below!
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

  React.useEffect(() => {
    getChatrooms();
    //eslint-disable-next-line
  }, []);

  const createRoom = () => {
    const name = nameRef.current.value;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("CHAT_TOKEN")}`,
      },
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
        makeToast(err.response.data.icon, err.response.data.message);
      });
  };

  const logout = () => {
    // remove token from localStorage
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Create new chatroom</label>
          <input
            className="nonChat"
            type="text"
            name="name"
            id="name"
            placeholder="Chatroom name"
            ref={nameRef}
          />
        </div>
      </div>

      <button className="nonChat" onClick={createRoom}>
        Create room
      </button>
      <div className="chatroomList_container">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroomName_Join">
            <Link to={"/chatroom/" + chatroom._id} className="joinLink">
              <div className="join">Join</div>
            </Link>
            <div className="chatroom_name">{chatroom.name}</div>
          </div>
        ))}
      </div>
      <button className="nonChat logOut mb-3" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default DashboardPg;
