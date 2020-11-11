import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import milestone24 from "@iconify/icons-octicon/milestone-24";
import styled from "styled-components";
import MilestoneCard from "../../components/MilestoneCard";

function MilestoneList(props) {
  const [Milestones, setMilestones] = useState([]);
  const [OpenedMilestoneCount, setOpenedMilestoneCount] = useState(0);
  const [ClosedMilestoneCount, setClosedMilestoneCount] = useState(0)

  useEffect(() => {
    Axios.get("/api/milestone").then((response) => {
      if (response.data.success) {
        const milestones = response.data.milestones;
        const result = milestones.reduce((acc, cur) => {
          cur.closeCount = 0;
          cur.openCount = 0;

          if (acc.length == 0) {
            if (cur.issueIsOpened == 0) {
              cur.closeCount = cur.count;
            } else {
              cur.openCount = cur.count;
            }
            return [cur];
          }

          if (acc[acc.length - 1] && acc[acc.length - 1].id === cur.id) {
            if (cur.issueIsOpened == 0) {
              acc[acc.length - 1].closeCount = cur.count;
            } else {
              acc[acc.length - 1].openCount = cur.count;
            }
            return acc;
          } else {
            if (cur.issueIsOpened == 0) {
              cur.closeCount = cur.count;
            } else {
              cur.openCount = cur.count;
            }

            return acc.concat([cur]);
          }
        }, []);

        setMilestones(result);
        setOpenedMilestoneCount(response.data.milestoneCount[0].openedMilestoneCount);
        setClosedMilestoneCount(response.data.milestoneCount[0].closedMilestoneCount);
      } else {
        alert("Failed to get milestones");
      }
    });
  }, []);

  //delete milestone
  const onRemoveMilestone = (id) => {
    setMilestones(Milestones.filter((Milestone) => Milestone.id !== id));
  };

  //modify milestone
  const onModifyMilestone = (id, newStatus) => {
    setMilestones(
      Milestones.map((Milestone) => {
        if (Milestone.id === id) {
          Milestone.isOpened = newStatus;
        }
        return Milestone;
      })
    );
  };

  const onChangeMilestoneStatus = () => {
    Axios.get("/api/milestone").then((response) => {
      if (response.data.success) {
        setOpenedMilestoneCount(response.data.milestoneCount[0].openedMilestoneCount);
        setClosedMilestoneCount(response.data.milestoneCount[0].closedMilestoneCount);
      } else {
        alert("Failed to get milestones");
      }
    });
  };

  const renderMilestoneCard = Milestones.map((Milestone, idx) => {
    return (
      <MilestoneCard
        key={idx}
        Milestone={Milestone}
        onRemoveMilestone={onRemoveMilestone}
        onModifyMilestone={onModifyMilestone}
        onChangeMilestoneStatus={onChangeMilestoneStatus}
        {...props}
      />
    );
  });

  return (
    <ListStyle>
      <ListTopStyle id="listTop">
        <BtnStyle id="open">
          <Open><Icon width="18" height="18" icon={milestone24} /> &nbsp;{OpenedMilestoneCount} Open</Open>
        </BtnStyle>
        <BtnStyle id="close">
          <CheckIcon>✔️&nbsp;&nbsp;</CheckIcon>
          <Close> {ClosedMilestoneCount} Closed</Close></BtnStyle>
      </ListTopStyle>
      <div id="contentsArea">{renderMilestoneCard}</div>
    </ListStyle>
  );
}

const Close = styled.div`
  color: #808080;
`;

const Open = styled.div`
`;

const CheckIcon = styled.div`
opacity:0.3;
`;

const ListStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #e9ecee;
  border-radius: 7px;
  margin-top: 20px;
  margin-bottom: 50px;
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
  cursor: default;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 20px;
  font-size: 14px;
`;

export default MilestoneList;
