import React, { useState, useEffect } from "react";
import axios from "axios";
import calcTime from "../../utils/calcTime";
import styled from "styled-components";
import CommentEditor from "../CommentEditor";

function IssueComment(props) {
  const { id, issueId, authorId, owner, content, createdAt } = props;

  const [contentValue, setContentValue] = useState(content);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const [profile, setProfile] = useState("");
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  const [isMounted, setisMounted] = useState(true);

  useEffect(() => {
    axios.get(`/api/user/profile/${authorId}`).then((profile) => {
      if (isMounted) {
        setProfile(profile.data.profile.profile);
        setIsProfileLoaded(true);
      }
    });
    return () => {
      setisMounted(false);
    };
  }, []);

  const editClickHandler = (e) => {
    e.preventDefault();
    setIsEditClicked(true);
  };

  const cancelClickHandler = (e) => {
    e.preventDefault();
    setIsEditClicked(false);
  };

  const submitClickHandler = (value) => {
    let data = {
      commentId: id,
      issueId: issueId,
      content: value,
      authorId: authorId,
    };
    axios
      .put("../api/comment", data, {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      })
      .then((changedIssue) => {
        setContentValue(value);
        setIsEditClicked(false);
      });
  };

  const TopAreaStyle = authorId == owner ? TopStyle : OtherTopStyle;
  const OwnerBtnStyle = owner == authorId ? OwnerStyle : OwnerDisabledStyle;
  const EditBtnStyle = owner == authorId ? EditStyle : EditDisabledStyle;

  return (
    <ContainerDiv id="containerArea">
      <CommentDiv id="commentArea" className="comment">
        <ProfileStyle className="profile">
          {isProfileLoaded ? (
            <UserProfileStyle
              src={profile}
              alt="이미지"
              className="userProfile"
            />
          ) : (
            <div></div>
          )}
        </ProfileStyle>
        <ContentStyle className="content">
          <TopAreaStyle>
            <CommentorAreaStyle className="commentorArea">
              <CommentorStyle className="commentor">{authorId}</CommentorStyle>
              <div className="commentInfo">commented {calcTime(createdAt)}</div>
            </CommentorAreaStyle>
            <OwnerBtnStyle
              className={owner == authorId ? "Owner" : "Owner disabled"}
            >
              Owner
            </OwnerBtnStyle>
            <div className="imogi">&#128008;</div>
            <EditBtnStyle
              className={owner == authorId ? "edit" : "edit disabled"}
              onClick={(e) => editClickHandler(e)}
            >
              Edit
            </EditBtnStyle>
          </TopAreaStyle>
          <ContentbodyStyle className="contentbody">
            {isEditClicked ? (
              <CommentEditor
                cancelClickHandler={cancelClickHandler}
                submitClickHandler={submitClickHandler}
                defaultValue={contentValue}
              />
            ) : (
              contentValue
            )}
          </ContentbodyStyle>
        </ContentStyle>
      </CommentDiv>
      <VerticalDiv id="verticalArea"></VerticalDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  width: 100%;
  text-align: center;
`;

const CommentDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
`;

const TopStyle = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1.2px solid lightblue;
  padding: 0.5% 1%;
  background-color: #f1f8ff;
`;

const OtherTopStyle = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1.2px solid #777777;
  padding: 0.5% 1%;
  background-color: #d1d3d4;
`;

const ProfileStyle = styled.div`
  width: 5%;
  margin-right: 3%;
`;

const UserProfileStyle = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ContentStyle = styled.div`
  width: 85%;
`;

const ContentbodyStyle = styled.div`
  border: 1.2px solid lightblue;
  background-color: white;
  padding: 2%;
  text-align: left;
`;

const CommentorAreaStyle = styled.div`
  display: flex;
  width: 80%;
`;

const EditStyle = styled.button`
  font-size: 13px;
  background-color: #f1f8ff;
  color: #777777;
  border: none;
`;

const EditDisabledStyle = styled(EditStyle)`
  display: none;
`;

const OwnerStyle = styled.button`
  border: 1px solid lightblue;
  font-size: 13px;
  background-color: #f1f8ff;
  color: #777777;
  border: 1px solid lightblue;
`;

const OwnerDisabledStyle = styled(OwnerStyle)`
  display: none;
`;

const CommentorStyle = styled.div`
  margin-right: 1%;
  font-weight: bold;
`;

const VerticalDiv = styled.div`
  border: none;
  background-color: none;
  width: 90%;
  border-left: 1.5px solid #d1d3d4;
  height: 15px;
  margin: 0 15%;
`;

export default IssueComment;
