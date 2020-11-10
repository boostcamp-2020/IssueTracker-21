import React from "react";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import axios from "axios";
import noprofile from "../../../public/img/noprofile.png";
import "./style.scss";
import CustomBtn from "../../components/CustomBtn";
import Sidebar from "../../components/Sidebar";
import { toggleArray, toggleObject } from "../../utils/toggle";

export const NewIssuePageContext = React.createContext();

function NewIssuePage(props) {
  const [User, setUser] = useState(null);
  const [Title, setTitle] = useState("");
  const [Contents, setContents] = useState("");
  const [BtnColor, setBtnColor] = useState("#ced2d7");

  const [assigneeList, setAssigneeList] = useState([]);
  const [milestone, setmilestone] = useState(null);
  const [labelList, setLabelList] = useState([]);
  const [progress, setProgress] = useState(0);

  const assigneeListHandler = (data) => {
    setAssigneeList(toggleArray(assigneeList, data));
  };

  const labelListHandler = (data) => {
    setLabelList(toggleArray(labelList, data));
  };

  const milestoneListHandler = (data) => {
    setmilestone(toggleObject(milestone, data));
  };

  //취소 버튼
  const cancelHandler = () => {
    props.history.push("/");
  };

  //제목 상태관리
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  //editor 내 text 상태관리 핸들러
  const typingHandler = (text) => {
    if (text.length === 0) {
      setBtnColor("#ced2d7");
    } else {
      setBtnColor("#2ea44f");
    }
    setContents(text);
  };

  //submit btn 핸들러
  const submitHandler = (e) => {
    if (Title.length === 0 || Contents.length === 0) {
      return alert("제목과 내용 모두 입력해주세요");
    }
    const body = {
      title: Title,
      authorId: User.user.userId,
      description: Contents,
      milestoneId: milestone.id,
      assignees: assigneeList.map((e) => e.id),
      labels: labelList.map((e) => e.id),
    };

    axios.post("/api/issue", body).then((response) => {
      if (response.data.success) {
        props.history.push("/");
      } else {
        alert("Failed to req new issue");
      }
    });
  };

  // 페이지 로딩시 유저정보를 불러오기
  useEffect(() => {
    axios.get("/api/user/userinfo").then((response) => {
      if (response.data.success) {
        setUser(response.data);
      } else {
        alert("Failed to get User info");
      }
    });
  }, []);

  useEffect(async () => {
    if (milestone) {
      await axios.get("/api/milestone").then((response) => {
        if (response.data.success) {
          const milestoneData = response.data.milestones;
          let openissueCount = 0;

          const issueCount = milestoneData
            .filter((e) => e.id === milestone.id)
            .reduce((acc, cur) => {
              if (cur.issueIsOpened) openissueCount += cur.count;
              return acc + cur.count;
            }, 0);

          if (openissueCount) {
            setProgress(Math.floor((openissueCount / issueCount) * 100));
          } else setProgress(0);
        } else {
          alert("Failed to get User info");
        }
      });
    }
  }, [milestone]);

  return (
    <NewIssuePageContext.Provider
      value={{
        assigneeList,
        labelList,
        milestone,
        progress,
        assigneeListHandler,
        labelListHandler,
        milestoneListHandler,
      }}
    >
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
              bgColor={BtnColor}
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
        <div id="sideBar">
          <Sidebar />
        </div>
      </div>
    </NewIssuePageContext.Provider>
  );
}

export default NewIssuePage;
