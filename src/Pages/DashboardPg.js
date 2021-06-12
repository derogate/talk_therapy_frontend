import React, { useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import makeToast from "../Toaster";
import Header from "../components/Header";
import moment from "moment";
import ActionCard from "../components/ActionCard";
import talkingImg from "../assets/img/talking.svg";
import trackImg from "../assets/img/track.svg";
import Button from "../components/Button";

const DashboardPg = (props) => {
  const history = useHistory();
  const nameRef = React.createRef();
  const [chatrooms, setChatrooms] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("CHAT_TOKEN");
    if (!token) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
    //eslint-disable-next-line
  }, []);

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
        setTimeout(getChatrooms, 30000); //getchatrooms every 30 sec
      })
      .catch((err) => {
        setTimeout(getChatrooms, 10000);
        console.log(err);
      });
  };

  useEffect(() => {
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

  return (
    <div className="container-fluid">
      <Header loggedIn />
      <div className="container">
        <div className="mb-3">
          <h1>
            Hello! Today is{" "}
            <span className="text-primary">{moment().format("dddd")}! </span>
            The time is{" "}
            <span className="text-primary">{moment().format("h:mma")}!</span>
          </h1>
          <h2 className="border-primary border-bottom pb-3">
            What would you like to do{" "}
            <span className="text-secondary">today?</span>
          </h2>
        </div>

        <div className="d-flex align-items-center justify-content-center flex-grow-0 flex-shrink-0">
          <ActionCard
            img={talkingImg}
            label="Talk"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => console.log("You wanted to create a new chatroom!")}
          />
          <ActionCard
            img={trackImg}
            label="Track Mood"
            onClick={() =>
              alert("This feature is currently under development.")
            }
          />
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  Create new chatroom
                </h3>
              </div>
              <div className="modal-body">
                <input
                  className="nonChat"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Chatroom name"
                  ref={nameRef}
                />
              </div>
              <div className="modal-footer">
                <Button
                  className="text-white fw-bold"
                  btnStyle="secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </Button>
                <Button className="text-white fw-bold" onClick={createRoom}>
                  Create room
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="chatroomList_container">
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroomName_Join">
              <div className="chatroom_name">{chatroom.name}</div>
              <Link to={"/chatroom/" + chatroom._id} className="joinLink">
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPg;
