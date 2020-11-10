import Axios from "axios";
import React from "react";
import { Icon, InlineIcon } from "@iconify/react";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import styled from "styled-components";
import { useEffect, useState } from "react";

function MilestoneList() {
  const [Milestones, setMilestones] = useState(null);

  useEffect(() => {
    Axios.get("/api/milestone").then((response) => {
      if (response.data.success) {
        console.log(response.data.milestones);
        setMilestones(response.data.milestones);
      } else {
        alert("Failed to get assignees");
      }
    });
  }, []);

  return (
    <ListStyle>
      <ListTopStyle id="listTop">
        <BtnStyle id="open">
          <Icon width="18" height="18" icon={milestone24} />
          &nbsp; Open
        </BtnStyle>
        <BtnStyle id="close">✔️&nbsp; Closed</BtnStyle>
      </ListTopStyle>
      <div id="contentsArea">22</div>
    </ListStyle>
  );
}

const ListStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 4px;
`;

const ListTopStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #f5f8fa;
  padding: 10px 20px;
`;

const BtnStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  font-size: 15px;
`;

export default MilestoneList;
