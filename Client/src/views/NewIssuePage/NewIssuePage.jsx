import React from "react";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import axios from "axios";
import noprofile from "../../../public/img/noprofile.png";
import "./style.scss";
import CustomBtn from "../../components/CustomBtn";

function NewIssuePage(props) {
  const [User, setUser] = useState(null);
  const [Title, setTitle] = useState("");
  const [Contents, setContents] = useState("");

  const cancelHandler = () => {
    props.history.push("/");
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const typingHandler = (text) => {
    setContents(text);
  };

  const submitHandler = (e) => {
    const body = {
      title: Title,
      authorId: User.user.userId,
      description: Contents,
      milestoneId: 1,
      assignees: ["test1", "test2"],
      labels: [1, 2],
    };
    axios.post("/api/issue", body).then((response) => {
      if (response.data.success) {
        props.history.push("/");
      } else {
        alert("Failed to req new issue");
      }
    });
  };

  useEffect(() => {
    axios.get("/api/user/userinfo").then((response) => {
      if (response.data.success) {
        setUser(response.data);
      } else {
        alert("Failed to get User info");
      }
    });
  }, []);
  return (
    <div id="newIssueArea">
      <div id="profileArea">
        <img
          src={User ? User.user.profile : noprofile}
          alt="profile"
          id="issueProfile"
        />
      </div>
      <div id="editorArea">
        <input
          id="newIssueTitle"
          type="text"
          placeholder="Title"
          onChange={titleHandler}
          value={Title}
        />
        <div id="newIssueOpt">
          <div id="writeBtn">Write</div>
        </div>
        <Editor typingHandler={typingHandler} />
        <div id="btnArea">
          <div id="cancelBtn" onClick={cancelHandler}>
            cancel
          </div>
          <CustomBtn
            color="white"
            bgColor="#2ea44f"
            width="150px"
            borderRad="6px"
            height="35px"
            border="0"
            id="submitBtn"
            onClick={submitHandler}
          >
            Submit new issue
          </CustomBtn>
        </div>
      </div>
      <div id="sideBar">sidebar section</div>
    </div>
  );
}

export default NewIssuePage;
