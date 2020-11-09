import React from "react";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import axios from "axios";
import noprofile from "../../../public/img/noprofile.png";
import "./style.scss";

function NewIssuePage() {
  const [User, setUser] = useState(null);
  const [Title, setTitle] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    axios.get("/api/user/userinfo").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setUser(response.data);
      } else {
        alert("Failed to get assignees");
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
        <Editor />
      </div>
      <div id="sideBar">sidebar section</div>
    </div>
  );
}

export default NewIssuePage;
