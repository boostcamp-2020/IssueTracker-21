import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";

function MilestoneCard(props) {
  const info = props.Milestone;
  const onRemoveMilestone = props.onRemoveMilestone;
  const onModifyMilestone = props.onModifyMilestone;
  const onChangeMilestoneStatus = props.onChangeMilestoneStatus;

  const [Progress, setProgress] = useState(0);

  useEffect(() => {
    const percent = Math.floor(
      (info.closeCount / (info.closeCount + info.openCount)) * 100
    );
    setProgress(percent);
  });

  const editHandler = () => {
    props.history.push("/milestone/edit");
  };

  const statusHandler = (e) => {
    let status = false;
    if (e.target.innerHTML === "Open") status = true;

    const body = { milestoneId: info.id, newStatus: status };
    Axios.put("/api/milestone/status", body).then((response) => {
      if (response.data.success) {
        onModifyMilestone(info.id, status);
        onChangeMilestoneStatus();
      } else {
        alert("Failed to update milestone status");
      }
    });
  };

  const deleteHandler = (e) => {
    Axios.delete("/api/milestone", {
      params: {
        milestoneId: info.id,
      },
    }).then((response) => {
      if (response.data.success) {
        onRemoveMilestone(info.id);
      } else {
        alert("Failed to delete milestone status");
      }
    });
  };

  return (
    <MilestoneCardStyle>
      <ContentsArea>
        <TitleAreaStyle id="title">{info.title}</TitleAreaStyle>
        <SubTitleAreaStyle id="date">🗓 {info.dueDate}</SubTitleAreaStyle>
        <SubTitleAreaStyle id="contents">
          {info.description || "No description"}
        </SubTitleAreaStyle>
      </ContentsArea>
      <OptArea>
        <GraphStyle>
          <ProgressBarStyle progress={Progress} />
        </GraphStyle>
        <GraphInfoAreaStyle>
          <InfoStyle>
            <b>{Progress}%</b> complete
          </InfoStyle>
          <InfoStyle>
            <b>{info.openCount}</b> open
          </InfoStyle>
          <InfoStyle>
            <b>{info.closeCount}</b> closed
          </InfoStyle>
        </GraphInfoAreaStyle>
        <GraphInfoAreaStyle>
          <InfoBlueBtnStyle onClick={editHandler}>Edit</InfoBlueBtnStyle>
          <InfoBlueBtnStyle onClick={statusHandler}>
            {info.isOpened ? "Close" : "Open"}
          </InfoBlueBtnStyle>
          <InfoRedBtnStyle onClick={deleteHandler}>Delete</InfoRedBtnStyle>
        </GraphInfoAreaStyle>
      </OptArea>
    </MilestoneCardStyle>
  );
}

const MilestoneCardStyle = styled.div`
cursor:pointer;
  width: 100%;
  padding: 20px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f6f7f8;
`;
const ContentsArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const TitleAreaStyle = styled.div`
  font-size: 20px;
`;
const SubTitleAreaStyle = styled.div`
  font-size: 13px;
  margin-top: 2px;
  color: #90969c;
`;

const OptArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const GraphStyle = styled.div`
  width: 100%;
  height: 10px;
  margin: 10px 0;
  background-color: #e9ecee;
  border-radius: 10px;
`;

const ProgressBarStyle = styled.div`
  width: ${(props) => props.progress}%;
  height: 10px;
  left: 0;
  background-color: #28a745;
  border-radius: 10px;
`;

const GraphInfoAreaStyle = styled.div`
  width: 100%;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  font-size: 13px;
`;

const InfoStyle = styled.div`
  margin-right: 15px;
  font-size: 13px;
  color: #6e737d;
`;

const InfoBlueBtnStyle = styled.div`
  color: #4788df;
  margin-right: 10px;
  cursor:pointer;
  :hover{
    color: #A8CEFA;
  }
`;
const InfoRedBtnStyle = styled.div`
  color: #d95b66;
  cursor:pointer;
  :hover{
    color: #E7BEB9;
  }
`;

export default MilestoneCard;
