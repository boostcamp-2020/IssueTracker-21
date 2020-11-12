import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import IssueHeader from "../../components/IssueHeader";
import axios from "axios";
import loadingImg from "../../../public/loading.gif";

import Sidebar from "../../components/Sidebar";
import { toggleArray, toggleObject } from "../../utils/toggle";
import {
  checkExistElement,
  checkNonExistElement,
} from "../../utils/compareTwoArray";

import "./DetailPageStyle.scss";
import IssueComment from "../../components/IssueComment";

import DetailPageEditor from "../../components/DetailPageEditor";

import styled from "styled-components";

const IssueComponentsDiv = styled.div`
  display: 70%;
`;

let assigneeList = [];
let milestone = null;
let labelList = [];

function DetailPage(props) {
  const { params } = props.match;
  const [issueData, setIssueData] = useState({
    issueDetail: {},
    comments: { rows: [] },
  });
  const [headerLoading, setHeaderLoading] = useState(true);
  const [commentsLoading, setCommentLoading] = useState(true);
  const [issueOpened, setIssueOpened] = useState(true);

  const [isMounted, setisMounted] = useState(true);
  const [User, setUser] = useState(null);

  const [curAssigneeList, setCurAssigneeList] = useState([]);
  const [curMilestone, setCurMilestoneList] = useState(null);
  const [curLabelList, setCurLabelList] = useState([]);

  const [progress, setProgress] = useState(0);

  const assigneeListHandler = (data) => {
    assigneeList = toggleArray(assigneeList, data).slice();
  };

  /* TODO:  두 객체를 비교해서 DB에 추가하거나 삭제하도록 해야한다.*/
  const curAssigneeListHandler = () => {
    const addassigneetList = checkNonExistElement(
      assigneeList,
      curAssigneeList
    );

    const deleteassigneeList = checkNonExistElement(
      curAssigneeList,
      assigneeList
    );

    if (addassigneetList.length) {
      addassigneetList.map((e) => {
        const body = {
          issueId: issueData.issueDetail.id,
          assigneeId: e.id,
        };

        axios.post("/api/issue/assignee", body).then((response) => {
          if (response.data.success) {
            console.log("insert work");
          }
        });
      });
    }

    if (deleteassigneeList.length) {
      deleteassigneeList.map((e) => {
        const body = {
          issueId: issueData.issueDetail.id,
          assigneeId: e.id,
        };

        axios.delete("/api/issue/assignee", { data: body }).then((response) => {
          if (response.data.success) {
            console.log("delete work");
          }
        });
      });
    }

    setCurAssigneeList(assigneeList);
  };

  const labelListHandler = (data) => {
    labelList = toggleArray(labelList, data).slice();
  };

  const curlabelListHandler = () => {
    const addlabelList = checkNonExistElement(labelList, curLabelList);
    const deletelabelList = checkNonExistElement(curLabelList, labelList);

    if (addlabelList.length) {
      addlabelList.map((e) => {
        const body = {
          issueId: issueData.issueDetail.id,
          labelId: e.id,
        };

        axios.post("/api/issue/label", body).then((response) => {
          if (response.data.success) {
            console.log("insert work");
          }
        });
      });
    }

    if (deletelabelList.length) {
      deletelabelList.map((e) => {
        const body = {
          issueId: issueData.issueDetail.id,
          labelId: e.id,
        };

        axios.delete("/api/issue/label", { data: body }).then((response) => {
          if (response.data.success) {
            console.log("delete work");
          }
        });
      });
    }
    setCurLabelList(labelList);
  };

  const milestoneListHandler = (data) => {
    milestone = toggleObject(milestone, data);
  };

  const curMilestoneListHandler = () => {
    const body = {
      issueId: issueData.issueDetail.id,
      milestoneId: milestone ? milestone.id : null,
    };

    axios.put("/api/issue/milestone", body).then((response) => {
      if (response.data.success) console.log("asdfasdf");
    });

    setCurMilestoneList(milestone);
  };

  const addingInfoHandler = (data) => {
    setIssueData({
      issueDetail: issueData.issueDetail,
      comments: { rows: [...issueData.comments.rows, data] },
    });
  };

  const issueOpenHandler = (value) => {
    axios.get("/api/user/userinfo").then((response) => {
      let authorId = "";
      if (response.data.success) {
        authorId = response.data.userId;
      }
      let data = {
        issueId: issueData.issueDetail.id,
        newStatus: value,
        userId: authorId,
      };
      axios
        .put("/api/issue/status", data, {
          "Content-Type": "application/json",
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          setIssueOpened(value);
        });
    });
  };

  const assignMeHandler = () => {
    setCurAssigneeList([{ id: User.user.userId, profile: User.user.profile }]);
    const body = {
      issueId: issueData.issueDetail.id,
      assigneeId: User.user.userId,
    };
    axios.post("/api/issue/assignee", body).then((response) => {
      if (response.data.success) {
        console.log("insert work");
      }
    });
  };

  useEffect(() => {
    axios.get("/api/user/userinfo").then((response) => {
      if (response.data.success && isMounted) {
        setUser(response.data);
      } else {
        alert("Failed to get User info");
      }
    });

    axios.get(`/api/issue/${params.issueId}`).then(async (response) => {
      if (response.data.success && isMounted) {
        const {
          data: { issueDetail: issueDbData },
        } = response;
        const { issueDetail } = issueDbData;
        setIssueData(issueDbData);
        setIssueOpened(issueDetail.isOpened);
        setCurAssigneeList(
          issueDetail.users.length
            ? issueDetail.users.map((e) => {
                return { id: e.id, profile: e.profile };
              })
            : []
        );
        setCurLabelList(
          issueDetail.labels.length
            ? issueDetail.labels.map((e) => {
                return {
                  id: e.id,
                  name: e.name,
                  description: e.description,
                  color: e.color,
                };
              })
            : []
        );
        setCurMilestoneList(
          issueDetail.milestone
            ? {
                id: issueDetail.milestoneId,
                title: issueDetail.milestone.title,
              }
            : null
        );

        setHeaderLoading(false);
        setCommentLoading(false);
      } else {
        alert("Failed to get issues");
      }
    });
    return () => {
      setisMounted(false);
    };
  }, []);

  useEffect(() => {
    labelList = curLabelList.slice();
  }, [curLabelList]);

  useEffect(() => {
    assigneeList = curAssigneeList.slice();
  }, [curAssigneeList]);

  useEffect(async () => {
    if (curMilestone) {
      milestone = { ...curMilestone };
      await axios.get("/api/milestone").then((response) => {
        if (response.data.success) {
          const milestoneData = response.data.milestones;
          let openissueCount = 0;

          const issueCount = milestoneData
            .filter((e) => e.id === curMilestone.id)
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
    } else milestone = null;
  }, [curMilestone]);

  const renderLoading = (
    <div className="emptyList" id="loading">
      <img id="loadingImg" src={loadingImg} alt="loading..." />
    </div>
  );

  const renderIssueHeader = (
    <IssueHeader
      issueId={issueData.issueDetail.id}
      title={issueData.issueDetail.title}
      isOpen={issueOpened}
      createdAt={issueData.issueDetail.createdAt}
      authorId={issueData.issueDetail.authorId}
      commentCount={issueData.comments.count}
    />
  );

  const renderIssueCommentEditor = (
    <DetailPageEditor
      issueId={issueData.issueDetail.id}
      issueOpenHandler={issueOpenHandler}
      isOpened={issueOpened}
      addingInfoHandler={addingInfoHandler}
    />
  );

  const renderIssueComment = issueData.comments.rows.map((comment, key) => {
    return (
      <IssueComment
        key={comment.id}
        id={comment.id}
        issueId={issueData.issueDetail.id}
        authorId={comment.authorId}
        owner={issueData.issueDetail.authorId}
        content={comment.content}
        createdAt={comment.createdAt}
      />
    );
  });

  return (
    <div className="editIssueArea">
      <div className="issueHeaderArea">
        {headerLoading ? renderLoading : renderIssueHeader}
        <IssueComponentsDiv id="issueComponentsArea">
          {commentsLoading ? (
            renderLoading
          ) : (
            <IssueComment
              id={issueData.issueDetail.authorId}
              issueId={issueData.issueDetail.id}
              authorId={issueData.issueDetail.authorId}
              owner={issueData.issueDetail.authorId}
              content={issueData.issueDetail.description}
              createdAt={issueData.issueDetail.createdAt}
            />
          )}

          {commentsLoading ? renderLoading : renderIssueComment}
          {commentsLoading ? renderLoading : renderIssueCommentEditor}
        </IssueComponentsDiv>
      </div>
      <div className="sideBar">
        <Sidebar
          assigneeList={assigneeList}
          labelList={labelList}
          milestone={milestone}
          progress={progress}
          curAssigneeList={curAssigneeList}
          curMilestone={curMilestone}
          curLabelList={curLabelList}
          curAssigneeListHandler={curAssigneeListHandler}
          assigneeListHandler={assigneeListHandler}
          labelListHandler={labelListHandler}
          milestoneListHandler={milestoneListHandler}
          curlabelListHandler={curlabelListHandler}
          curMilestoneListHandler={curMilestoneListHandler}
          assignMeHandler={assignMeHandler}
        />
      </div>
    </div>
  );
}

export default DetailPage;
