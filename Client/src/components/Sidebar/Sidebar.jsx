import React from "react";
import AsigneeSideItem from "../AsigneeSideItem";
import LabelSideItem from "../LabelSideItem";
import MilestoneSideItem from "../MilestoneSideItem";

export const SidebarContext = React.createContext();
function Sidebar({
  issueId,
  assigneeList,
  curAssigneeList,
  labelList,
  curLabelList,
  curlabelListHandler,
  curMilestone,
  curMilestoneListHandler,
  milestone,
  progress,
  assigneeListHandler,
  curAssigneeListHandler,
  labelListHandler,
  milestoneListHandler,
}) {
  return (
    <SidebarContext.Provider
      value={{
        issueId,
        assigneeList,
        labelList,
        milestone,
        progress,
        assigneeListHandler,
        labelListHandler,
        milestoneListHandler,
        curAssigneeList,
        curAssigneeListHandler,
        curLabelList,
        curMilestone,
        curlabelListHandler,
        curMilestoneListHandler,
      }}
    >
      <div>
        <AsigneeSideItem />
        <hr />
        <LabelSideItem />
        <hr />
        <MilestoneSideItem />
      </div>
    </SidebarContext.Provider>
  );
}

export default Sidebar;
