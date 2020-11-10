import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";

function MilestoneCard(props) {
  const info = props.Milestone;
  const onRemoveMilestone = props.onRemoveMilestone;
  const [Open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(info.isOpened);
  }, []);

  const editHandler = () => {
    props.history.push("/milestone/edit");
  };

  const statusHandler = (e) => {
    let status = false;
    if (e.target.innerHTML === "Open") status = true;

    const body = { milestoneId: info.id, newStatus: status };
    Axios.put("/api/milestone/status", body).then((response) => {
      if (response.data.success) {
        setOpen(status);
      } else {
        alert("Failed to update milestone status");
      }
    });
  };

  const deleteHandler = (e) => {
    const body = { milestoneId: info.id, hello: "Asd" };
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
        <GraphStyle>=======================</GraphStyle>
        <GraphInfoAreaStyle>
          <InfoStyle>
            <b>33%</b> complete
          </InfoStyle>
          <InfoStyle>
            <b>2</b> open
          </InfoStyle>
          <InfoStyle>
            <b>1</b> closed
          </InfoStyle>
        </GraphInfoAreaStyle>
        <GraphInfoAreaStyle>
          <InfoBlueBtnStyle onClick={editHandler}>Edit</InfoBlueBtnStyle>
          <InfoBlueBtnStyle onClick={statusHandler}>
            {Open ? "Close" : "Open"}
          </InfoBlueBtnStyle>
          <InfoRedBtnStyle onClick={deleteHandler}>Delete</InfoRedBtnStyle>
        </GraphInfoAreaStyle>
      </OptArea>
    </MilestoneCardStyle>
  );
}

const MilestoneCardStyle = styled.div`
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
  font-size: 22px;
`;
const SubTitleAreaStyle = styled.div`
  font-size: 15px;
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
  height: 33px;

  background-color: #e9ecee;
  border-radius: 10px;
`;

const GraphInfoAreaStyle = styled.div`
  width: 100%;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
`;

const InfoStyle = styled.div`
  margin-right: 15px;
  font-size: 15px;
  color: #6e737d;
`;

const InfoBlueBtnStyle = styled.div`
  color: #4788df;
  margin-right: 10px;
`;
const InfoRedBtnStyle = styled.div`
  color: #d95b66;
`;

InfoRedBtnStyle;

export default MilestoneCard;
